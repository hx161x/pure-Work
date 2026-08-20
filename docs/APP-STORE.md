# App-Store-Checkliste

## Vor TestFlight / Google Play

- echte HTTPS-Pure-Work-URL im Setup eintragen
- Login/Registrierung vollständig testen
- Passwort-Reset und E-Mail-Bestätigung testen
- Chat, Uploads, Kamera-/Dateiauswahl testen
- Datenschutz und Support-Link erreichbar halten
- Demo-/Testkonto für Apple Review vorbereiten
- Kontolöschung innerhalb der App erreichbar machen, wenn Konten in der App angelegt werden können
- keine Platzhalter oder leeren Bereiche im Review-Build

## Native Funktionen

Das Paket bereitet vor:

- App-Shell für iOS/Android
- eigenes Pure-Work-App-Icon
- Splash/Branding
- `purework://` Deep-Link-Scheme
- Haptik-Schnittstelle
- Push-Notification-Plugin + Backend-Tokenregistrierung
- Kamera-/Dateisystem-Plugins
- Netzwerkstatus / Share / Preferences

### Push ist vorbereitet, aber noch nicht vollständig live

Für echte Push-Zustellung brauchst du zusätzlich deine eigenen Apple-APNs-/Firebase-Zugangsdaten und eine Push-Sendeintegration auf dem Backend. Diese Zugangsdaten können und sollten nicht fest in einem allgemeinen ZIP liegen.

## Apple-Hinweis

Apple erwartet mehr als nur eine neu verpackte Website. Vor der öffentlichen App-Store-Einreichung sollten daher native Mehrwerte wie Push, Deep Links, Kamera-/Dokumentaufnahme und App-spezifische Navigation tatsächlich aktiviert und auf echten Geräten getestet sein.
