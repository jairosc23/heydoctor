# Solución: Login falla en Vercel

## Problema

El login muestra "Usuario o contraseña incorrectos" aunque las credenciales sean correctas.

## Causas posibles

1. **`VITE_API_URL` no tiene el valor correcto en Vercel**
2. **El build en Vercel no está usando la variable**
3. **Las credenciales no coinciden con las del backend**

## Solución paso a paso

### 1. Verificar `VITE_API_URL` en Vercel

1. Ve a **Vercel** → tu proyecto `heydoctor-frontend` → **Settings** → **Environment Variables**
2. Busca `VITE_API_URL`
3. **Haz clic en el ícono del ojo** para ver el valor actual
4. **Debe ser exactamente:**
   ```
   https://heydoctor-backend-production.up.railway.app
   ```
   (sin barra final `/`, sin espacios, sin comillas)

### 2. Si el valor está mal o vacío

1. Haz clic en `VITE_API_URL` para editarla
2. **Borra el valor actual** completamente
3. **Pega:** `https://heydoctor-backend-production.up.railway.app`
4. Verifica que esté en **Production** (y Preview si quieres)
5. **Guarda**

### 3. Redeploy obligatorio

**IMPORTANTE:** Después de cambiar variables de entorno, **debes hacer redeploy:**

1. Ve a **Deployments**
2. En el último deployment, haz clic en **⋯** (menú)
3. Selecciona **Redeploy**
4. Espera a que termine el build

### 4. Verificar en el navegador

1. Abre tu sitio en Vercel: `https://heydoctor-frontend.vercel.app/login.html`
2. Abre la **consola del navegador** (F12 → Console)
3. Intenta hacer login
4. Deberías ver en la consola:
   ```
   🔍 API_URL configurada: https://heydoctor-backend-production.up.railway.app
   🔍 Intentando login en: https://heydoctor-backend-production.up.railway.app/auth/login
   🔍 Respuesta del servidor: 200 OK
   ```

### 5. Verificar credenciales

Si la URL es correcta pero sigue fallando, verifica las credenciales en Railway:

- **Email:** `admin@heydoctor.health`
- **Password:** La que configuraste en Railway → Variables → `ADMIN_PASSWORD`

Si no recuerdas la contraseña, puedes:
- Verla en Railway → Variables → `ADMIN_PASSWORD` (haz clic en el ojo)
- O cambiarla y hacer redeploy del backend

## Checklist final

- [ ] `VITE_API_URL` en Vercel = `https://heydoctor-backend-production.up.railway.app`
- [ ] Variable está en **Production** (y Preview si aplica)
- [ ] **Redeploy** completado después de cambiar la variable
- [ ] Consola del navegador muestra la URL correcta
- [ ] Credenciales coinciden con Railway

## Si sigue fallando

1. Abre la consola del navegador (F12)
2. Intenta hacer login
3. Ve a la pestaña **Network**
4. Busca la petición a `/auth/login`
5. Haz clic en ella y revisa:
   - **Request URL:** ¿Es la URL correcta del backend?
   - **Status:** ¿Qué código devuelve? (200, 400, 500, etc.)
   - **Response:** ¿Qué mensaje devuelve el backend?

Comparte estos detalles para diagnosticar mejor.
