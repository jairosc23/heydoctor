// Inicialización de OneSignal
if (typeof window !== "undefined") {
  // Esperar a que el script de OneSignal se cargue
  window.OneSignal = window.OneSignal || [];
  
  OneSignal.push(function() {
    const appId = import.meta.env.VITE_ONESIGNAL_APP_ID;
    const safariWebId = import.meta.env.VITE_ONESIGNAL_SAFARI_ID;

    if (!appId) {
      console.warn("⚠️ VITE_ONESIGNAL_APP_ID no está definido en las variables de entorno");
      return;
    }

    OneSignal.init({
      appId: appId,
      safari_web_id: safariWebId || undefined,
      notifyButton: {
        enable: false, // Puedes cambiar a true si quieres mostrar el botón de notificaciones
      },
      allowLocalhostAsSecureOrigin: true, // Útil para desarrollo local
    });

    console.log("✅ OneSignal inicializado correctamente");
  });
}
