import { API_URL } from "../config.js";

/**
 * Petición genérica al backend
 * @param {string} path - Ruta (ej: "/auth/login")
 * @param {object} options - Opciones de fetch (method, body, headers)
 * @param {string} [token] - Token JWT para rutas protegidas
 */
async function request(path, options = {}, token) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    body: options.body && typeof options.body === "object" && !(options.body instanceof FormData)
      ? JSON.stringify(options.body)
      : options.body,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.error || data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// =============== AUTH ===============

/** Login: { email, password } → { token, user } */
export async function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

// =============== PUSH / ONESIGNAL ===============

/** Notificar documento verificado: { tipo, pais } */
export async function pushVerified(tipo, pais) {
  return request("/push/verified", {
    method: "POST",
    body: { tipo, pais },
  });
}

/** Notificar interconsulta: { paciente } */
export async function pushInterconsulta(paciente) {
  return request("/push/interconsulta", {
    method: "POST",
    body: { paciente },
  });
}

/** Notificar receta: { paciente } */
export async function pushReceta(paciente) {
  return request("/push/receta", {
    method: "POST",
    body: { paciente },
  });
}

// =============== AUDITORÍA ===============

/** Listar auditoría con filtros opcionales */
export async function listarAuditoria(filters = {}, token) {
  return request("/auditoria/list", {
    method: "POST",
    body: filters,
    token,
  });
}

/** Actualizar estado en auditoría */
export async function actualizarAuditoria({ id, estado, observacion, auditor }, token) {
  return request("/auditoria/update", {
    method: "POST",
    body: { id, estado, observacion, auditor },
    token,
  });
}

// Exportar para peticiones custom
export { request, API_URL };
