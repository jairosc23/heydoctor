/**
 * Única fuente de la URL del backend.
 * Local: .env.local o fallback http://localhost:8080
 * Producción (Vercel): VITE_API_URL en Environment Variables
 */
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

// Debug: mostrar la URL que se está usando (solo en desarrollo o si hay error)
if (import.meta.env.DEV || !import.meta.env.VITE_API_URL) {
  console.log("🔍 API_URL configurada:", API_URL);
  console.log("🔍 VITE_API_URL desde env:", import.meta.env.VITE_API_URL);
}
