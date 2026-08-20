# Codemagic – 5 Minuten bis zum ersten Android-Testbuild

1. ZIP entpacken.
2. Ordner in ein privates GitHub-Repository hochladen.
3. Bei Codemagic das Repository hinzufügen.
4. Codemagic erkennt `codemagic.yaml`.
5. In den Workflow-Variablen `PURE_WORK_URL` durch deine echte URL ersetzen.
6. Workflow `pure-work-android-test` starten.
7. Nach erfolgreichem Build die erzeugte APK auf dein Android-Gerät laden.

Für iOS ist der Simulator-Build ebenfalls vorbereitet. Für TestFlight/App Store muss danach deine Apple-Signierung verbunden werden.
