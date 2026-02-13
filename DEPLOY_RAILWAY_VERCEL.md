# Despliegue: Backend (Railway) + Frontend (Vercel) – Login en producción

## Problema diagnosticado

Railway estaba sirviendo **HTML** (frontend estático) en vez del **backend Express**, por eso:
- `GET /auth/login` devolvía 404 HTML
- `POST /auth/login` devolvía 404 HTML
- El frontend en Vercel no podía autenticarse

**Causa:** El servicio en Railway tenía el **Root Directory** incorrecto (raíz del repo o frontend) en lugar del directorio **backend**.

---

## Solución aplicada

### 1. Backend (Railway)

#### Archivos creados/modificados

| Archivo | Descripción |
|---------|-------------|
| `backend/Procfile` | `web: node server.js` – Railway ejecuta el servidor Express |
| `backend/railway.json` | Comando de inicio explícito para Railway |
| `backend/railway.toml` | Configuración de build y deploy |
| `backend/nixpacks.toml` | Build con Node.js 20 y `node server.js` |
| `backend/routes/auth.js` | GET `/auth/login` devuelve 405 JSON (no HTML) |

#### package.json (ya correcto)

```json
"scripts": {
  "start": "node server.js",
  "dev": "node server.js"
}
```

#### Pasos en Railway

1. **Nuevo proyecto o servicio** para el backend.
2. **Root Directory:** `backend` (obligatorio).
   - Valor exacto: `backend` (sin `/` delante ni detrás).
   - Si ves *"Could not find root directory: backend"*, ver **[RAILWAY_ROOT.md](./RAILWAY_ROOT.md)**.
3. **Variables de entorno:** ver lista exacta en **[backend/RAILWAY_VARIABLES.md](backend/RAILWAY_VARIABLES.md)**.
   - Obligatorias: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`
   - Recomendada: `NODE_ENV=production`
   - No crear `PORT` (Railway la asigna).
4. **Deploy** – Railway detectará Node.js y ejecutará `node server.js`.

#### Validación del backend

```bash
# GET → debe devolver 405 JSON (no HTML)
curl -s https://TU_BACKEND_URL/auth/login

# POST → debe devolver JSON con token y user
curl -X POST https://TU_BACKEND_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@heydoctor.health","password":"123456"}'
```

---

### 2. Frontend (Vercel)

#### Archivos verificados

- `frontend/src/config.js` – `API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"`
- `frontend/src/login.js` – `fetch(\`${API_URL}/auth/login\`, ...)`
- `frontend/src/services/api.js` – `fetch(\`${API_URL}${path}\`)`

No hay URLs hardcodeadas. Todo pasa por `VITE_API_URL`.

#### Pasos en Vercel

1. **Environment Variables**
   - Nombre: `VITE_API_URL`
   - Valor: `https://TU_BACKEND_URL.up.railway.app` (URL real del backend en Railway)
   - Entorno: Production (y Preview si aplica)

2. **Redeploy** para que el build use la nueva variable.

---

## Estructura del repo y Root Directory

Este repo tiene el backend en la carpeta **`backend/`**. En Railway debe usarse **Root Directory = `backend`**. Detalle y troubleshooting en **[RAILWAY_ROOT.md](./RAILWAY_ROOT.md)**.

## Checklist final

- [ ] Railway: Root Directory = `backend` (ver RAILWAY_ROOT.md si hay error)
- [ ] Railway: Variables de entorno configuradas
- [ ] Railway: Backend responde con JSON en `/auth/login`
- [ ] Vercel: `VITE_API_URL` = URL del backend en Railway
- [ ] Vercel: Redeploy del frontend
- [ ] Prueba: login en https://heydoctor.vercel.app/login (o tu URL en Vercel)
