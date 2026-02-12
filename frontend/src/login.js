import { API_URL } from "./config.js";

window.doLogin = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pass").value.trim();
  const errorEl = document.getElementById("error");
  const btn = document.getElementById("btnLogin");

  errorEl.textContent = "";
  if (!email || !password) {
    errorEl.textContent = "Ingresa email y contraseña";
    return;
  }

  btn.disabled = true;

  try {
    const loginUrl = `${API_URL}/auth/login`;
    console.log("🔍 Intentando login en:", loginUrl);
    
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    console.log("🔍 Respuesta del servidor:", res.status, res.statusText);

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      errorEl.textContent =
        "El servidor no respondió correctamente. Verifica que la URL del backend esté configurada (VITE_API_URL).";
      return;
    }

    if (!res.ok) {
      throw new Error(data.error || "Error al iniciar sesión");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("logged", "yes");
    window.location.href = "/panel.html";
  } catch (err) {
    if (err.message === "Failed to fetch" || err.name === "TypeError") {
      errorEl.textContent =
        "No se pudo conectar con el servidor. Verifica tu conexión y que la URL del backend (VITE_API_URL) esté configurada en Vercel.";
    } else {
      errorEl.textContent = err.message || "Usuario o contraseña incorrectos";
    }
  } finally {
    btn.disabled = false;
  }
};

if (localStorage.getItem("logged") === "yes" && localStorage.getItem("token")) {
  window.location.href = "/panel.html";
}
