# AI-lessen – docentmateriaal (privé houden)

- `werkend/` – alle projecten met de uitwerkingen ingevuld op de plek van de STAP-blokken, in dezelfde opmaak als de leerlingversie.
- `uitwerkingen/` – alleen de ingevulde functies per project. Alles is geschreven met variabelen, for-loops, if en arrays, zodat je het zo kunt voordoen.

## Bekijken

Start een server in de map waar `ai-lessen` en `ai-lessen-docent` allebei in staan:

    python3 -m http.server

Open daarna http://localhost:8000. De startpagina linkt naar de leerlingversie en de werkende versie.

## Aandachtspunten

- Project 2, deel 2 traint in de browser met TensorFlow.js. Op een gewone laptop duurt dat ongeveer 10 tot 60 seconden per epoch.
- De webcam werkt alleen via een server (localhost of https), niet als je index.html dubbelklikt.
- Laat leerlingen voor de webcam een dikke zwarte stift op wit papier gebruiken en het cijfer het groene vak laten vullen.
- Project 3 haalt artikelen rechtstreeks op van Wikipedia. De voorbeeldlijst gaat over wielrennen. Test dat één keer op het schoolnetwerk. Een titel die niet bestaat, wordt overgeslagen en onder "Niet gevonden" getoond.
- Vervang `ai-lessen/2-cnn/foto.jpg` gerust door een eigen vierkante foto. Die wordt gebruikt als er geen webcam is (toets F).

Zet `ai-lessen` op GitHub als template repository. Deze map hoort in een aparte, privé repository.
