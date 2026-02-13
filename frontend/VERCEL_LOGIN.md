# Configuración del login en Vercel

## Problema resuelto

El login fallaba en producción porque Railway estaba sirviendo **HTML** (frontend) en vez del **backend Express**. La causa: **Root Directory** en Railway apuntaba al lugar equivocado.

## Solución

### 1. Backend en Railway (obligatorio: Root Directory = `backend`)

- Crea o configura un **servicio** en Railway.
- **Root Directory:** `backend` (no raíz ni frontend).
- Variables de entorno: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`, etc.
- Railway usará `node server.js` (definido en `backend/package.json` y `Procfile`).

### 2. Configurar Vercel

| Nombre       | Valor                               | Entorno   |
|-------------|--------------------------------------|-----------|
| VITE_API_URL | https://TU_BACKEND.up.railway.app   | Production |

### 3. Redeploy en Vercel

Tras guardar la variable, haz un **Redeploy** para que el build use la nueva URL.

### 4. Verificar

```bash
curl -X POST https://TU_BACKEND_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@heydoctor.health","password":"123456"}'
```

Debe devolver JSON con `token` y `user`. Ver también `DEPLOY_RAILWAY_VERCEL.md` en la raíz del proyecto.
