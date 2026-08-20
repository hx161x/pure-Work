# Pure Work App 1.0.0 – START HIER

Dieses Paket macht aus deinem aktuellen Pure-Work-Websystem eine installierbare iOS-/Android-App-Hülle mit Capacitor.

## Was du brauchst

1. Eine **live erreichbare Pure-Work-Installation über HTTPS**, z. B. `https://app.deinedomain.de`.
2. Node.js 22+ auf dem Rechner **oder** GitHub + Codemagic für Cloud-Builds.
3. Für App Store/Google Play später deine eigenen Entwicklerkonten und Signierdaten.

## Schnellster lokaler Start

```bash
npm install
npm run setup
```

Beim Setup gibst du nur deine echte Pure-Work-URL an.

Dann Android:

```bash
npm run native:add:android
npm run open:android
```

Für iOS auf einem Mac:

```bash
npm run native:add:ios
npm run open:ios
```

## Ohne eigenen Mac / am einfachsten

1. Entpacke dieses ZIP.
2. Lade den Ordner in ein privates GitHub-Repository.
3. Öffne Codemagic und verbinde das Repository.
4. Setze in Codemagic die Variable `PURE_WORK_URL` auf deine echte HTTPS-Adresse.
5. Starte `Pure Work – Android Test APK`.
6. Für iOS zuerst den Simulator-Build testen; für TestFlight/App Store anschließend Apple-Signing hinterlegen.

Die Datei `codemagic.yaml` ist dafür bereits enthalten.

## Wichtig

Der App-Code ersetzt deinen Server nicht. Pure Work 5.4.4 ist technisch weiterhin PHP/WordPress-basiert und muss online laufen. Die App ist der mobile Client.

Im Ordner `backend/` liegt dein aktueller Stand `Pure-Work-v5.4.4.zip` noch einmal bei.

Im Ordner `backend-addon/` liegt außerdem **Pure Work Mobile Bridge**. Dieses kleine Backend-Plugin bereitet Native-Erkennung, Haptik, Deep Links und Push-Token-Registrierung vor.

Siehe `docs/HOSTING.md` und `docs/APP-STORE.md`.
