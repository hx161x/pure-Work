# Hosting – was kommt wohin?

## 1. Pure-Work-Backend

Das PHP/WordPress-System bleibt auf einem Webserver. Für einen ersten produktiven Stand kann dein bestehendes GoDaddy-Hosting weiterverwendet werden, solange HTTPS, PHP, MySQL und Cron sauber eingerichtet sind.

Empfohlene Struktur:

- `app.deinedomain.de` → Pure Work Backend/Web-App
- iOS App → verbindet sich mit `https://app.deinedomain.de`
- Android App → verbindet sich mit `https://app.deinedomain.de`

Für mehr Last durch Live-Chat und viele gleichzeitige Benutzer ist später ein Managed VPS/Cloud-Server sinnvoller als sehr kleines Shared Hosting.

## 2. App bauen

Empfehlung: **GitHub + Codemagic**.
Codemagic baut APK/AAB/IPA in der Cloud und kann später TestFlight und Google Play beliefern.

## 3. App veröffentlichen

- iPhone/iPad: App Store Connect / TestFlight
- Android: Google Play Console

Die native App wird also nicht bei GoDaddy „gehostet“ wie eine Webseite. GoDaddy hostet das Backend; die Stores verteilen die App.
