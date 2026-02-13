# Railway – Root Directory (HeyDoctor)

## Estructura de este repositorio

```
heydoctor/                    ← raíz del repo (jairosc23/heydoctor)
├── backend/                  ← Backend Node/Express (servicio a desplegar)
│   ├── server.js
│   ├── package.json
│   ├── Procfile
│   ├── railway.toml
│   ├── routes/
│   └── ...
├── frontend/
├── apps/
├── DEPLOY_RAILWAY_VERCEL.md
└── RAILWAY_ROOT.md           ← este archivo
```

## Qué poner en Railway

| Dónde | Valor exacto |
|-------|----------------|
| **Root Directory** | `backend` |

- Escribir **solo** `backend` (sin barra inicial, sin barra final).
- No usar `/backend` ni `./backend`.

Railway clonará el repo y usará solo la carpeta `backend/` como raíz del servicio. Ahí están `server.js`, `package.json` y el resto del backend.

---

## Si ves "Could not find root directory: backend"

1. **Comprueba el repositorio conectado**
   - Si conectaste **jairosc23/heydoctor** (este repo), la carpeta `backend/` existe → Root Directory = `backend` es correcto.
   - Si el valor estaba con barra (`/backend`) o con mayúsculas (`Backend`), cámbialo a exactamente: `backend`.

2. **Si tu repo es "heydoctor-backend" (solo backend en la raíz)**
   - Si ese repo tiene `server.js` y `package.json` en la **raíz** (no dentro de una carpeta `backend/`), entonces **deja Root Directory vacío** o pon `/`.
   - No uses `backend` si en ese repo no existe la carpeta `backend`.

3. **Verificar en GitHub**
   - En tu repo en GitHub, entra en la raíz y confirma que existe la carpeta `backend` con `server.js` y `package.json` dentro.

---

## Resumen

| Repositorio | Dónde está el backend | Root Directory en Railway |
|-------------|------------------------|---------------------------|
| **heydoctor** (este repo) | En la carpeta `backend/` | `backend` |
| **heydoctor-backend** (solo backend) | En la raíz del repo | vacío o `/` |
