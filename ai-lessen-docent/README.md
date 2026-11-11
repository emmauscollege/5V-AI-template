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
- Laat leerlingen voor de webcam een dikke zwarte stift op wit papier gebruiken en het cijfer in het groene vak houden. Bij tekenen met de muis werkt een groot cijfer het best.
- Verwachte accuracy in project 2 na 3 epochs: ongeveer 91% bij STAP 4a (alleen uitvoerlaag), 93% bij 4b (verborgen laag) en 95% bij 4c (CNN). Schommelingen van een procent zijn normaal.
- In STAP 6 zien leerlingen per deelstap meer getekende cijfers goed gaan. Met de werkende versie gaan bijna alle duidelijk getekende cijfers goed. Gaat het bij een leerling vaak mis, kijk dan eerst of de volgorde in `voorbewerking` klopt (blur, drempel, centreer, pooling).
- Project 3 haalt artikelen rechtstreeks op van Wikipedia. De voorbeeldlijst gaat over wielrennen. Test dat één keer op het schoolnetwerk. Een titel die niet bestaat, wordt overgeslagen en onder "Niet gevonden" getoond.
- Vervang `ai-lessen/2-cnn/foto.jpg` gerust door een eigen vierkante foto. Die wordt gebruikt als er geen webcam is (toets F).

Zet `ai-lessen` op GitHub als template repository. Deze map hoort in een aparte, privé repository.