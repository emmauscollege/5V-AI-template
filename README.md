Deze repo is onderdeel van het vak informatica op het Emmauscollege Rotterdam.

[Meer info over het vak informatica](https://informatica.emmauscollege.nl/)

# AI & Machine Learning

In deze repo bouw je zelf de algoritmes uit de theorielessen over kunstmatige intelligentie. Je begint met zelfgeschreven regels en eindigt met een netwerk dat jouw handschrift herkent en een bot die jouw zinnen afmaakt. Alles is geschreven in JavaScript met [p5.js](https://p5js.org/).

## Projecten

| Project | Map | Praktijkles | Wat bouw je? |
|---|---|---|---|
| 1. Van regels naar leren | `1-regels-en-buren` | 1 en 2 | Voorspel het profiel van een leerling met regels, k-nearest neighbours, een perceptron en een klein netwerk. |
| 2. Een eigen CNN | `2-cnn` | 3 en 4 | Programmeer filters en pooling en bouw een netwerk dat handgeschreven cijfers herkent via je webcam. |
| 3. Je eigen taalbot | `3-taalmodel` | 5 en 6 | Een taalmodel op Wikipedia-artikelen over jouw onderwerp, met autocomplete. |

## Starten

### In GitHub Codespaces (aanbevolen)
1. Klik op de groene knop `Code`, kies het tabblad `Codespaces` en klik op `Create codespace on main`.
2. Wacht tot de codespace klaar is. Er opent vanzelf een nieuw tabblad met het overzicht van alle projecten.
3. Zie je geen nieuw tabblad? Open dan onderin het tabblad `Ports` en klik op het wereldbolletje bij poort 8080.

Gebruik voor project 2 altijd een gewoon browsertabblad, niet de preview in VS Code. Anders werkt je webcam niet.

### Op je eigen computer
1. Clone de repo en open de map in VS Code.
2. Installeer de extensie `Live Server`.
3. Rechtsklik op `index.html` en kies `Open with Live Server`.

Dubbelklikken op `index.html` werkt niet: de browser mag dan geen bestanden en geen webcam gebruiken.

## Zo werk je
- Open `sketch.js` van je project. Bovenaan staan blokken `STAP 1`, `STAP 2`, enzovoort, met uitleg in het commentaar.
- Werk de stappen op volgorde af. Grote stappen zijn opgeknipt in deelstappen, zoals `STAP 2a` en `STAP 2b`.
- Test na elke stap in de browser. Bij elke stap staat wat je dan moet zien.
- Onder de streep `Hieronder hoef je niets te veranderen` staat code die al klaar is. Daar hoef je niet aan te komen.
- Commit en sync na elke stap, met een duidelijke boodschap zoals `stap 2a: dichtstbijzijnde buur werkt`.
- Beantwoord de vragen in `LOGBOEK.md`.

## Hulp bij fouten
- Zie je niets of doet je sketch raar? Open de console in de browser (rechtsklik, `Inspecteren`, tabblad `Console`). Daar staat de foutmelding met het regelnummer.
- Werkt het na een wijziging nog niet? Sla het bestand op en herlaad de pagina.
- Project 3 haalt teksten op van Wikipedia. Staat een titel onder "Niet gevonden"? Controleer dan of je de titel precies zo hebt geschreven als op nl.wikipedia.org.

## Documentatie
- p5.js reference (alle functies zoals `dist`, `random`, `floor`)
https://p5js.org/reference/
- JavaScript basis: variabelen, if, for-loops en arrays
https://www.w3schools.com/js/default.asp
- TensorFlow Playground: speel met een neuraal netwerk (project 1, stap 5)
https://playground.tensorflow.org/
- Uitleg convolutie en filters met plaatjes (project 2)
https://setosa.io/ev/image-kernels/
- TensorFlow.js lagen, zoals `conv2d` en `maxPooling2d` (project 2)
https://js.tensorflow.org/api/latest/#Layers
- Transformer Explainer: hoe een echt taalmodel werkt (project 3)
https://poloclub.github.io/transformer-explainer/

## Credits
- [p5.js](https://p5js.org/) en [TensorFlow.js](https://www.tensorflow.org/js)
- Project 2 gebruikt 15.000 cijfers uit de MNIST-dataset van Yann LeCun en Corinna Cortes (licentie CC BY-SA 3.0)
- Project 3 gebruikt teksten van [Wikipedia](https://nl.wikipedia.org/) (licentie)