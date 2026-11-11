// =============================================================
// Project 2 – Een eigen CNN
//
// Lees eerst de uitleg op de webpagina: hoe een computer een beeld ziet,
// wat filters en pooling zijn en hoe een neuraal netwerk leert.
//
// HOE ZIET EEN BEELD ERUIT IN DE CODE?
// Een beeld is een lijst van rijen. Elke rij is een lijst met getallen.
//   beeld[rij][kolom] geeft de helderheid van één pixel: een getal van
//   0 tot en met 255. Daarvoor zijn twee constanten:
//   ZWART = 0 en WIT = 255. Alles daartussen is grijs.
// beeld.length is het aantal rijen (de hoogte).
// beeld[0].length is het aantal kolommen (de breedte).
//
// Bovenaan de pagina wissel je tussen deel 1 en deel 2.
// =============================================================

// =============================================================
// DEEL 1 – Filters en pooling (praktijkles 3)
// =============================================================
// Je ziet drie beelden: links het origineel (webcam of foto), in het
// midden het beeld na jouw bewerking, rechts het beeld na pooling.
// Met toets D, 1, 2, 3 en 4 kies je de bewerking.

// -------------------------------------------------------------
// STAP 1 – Drempel
// Een drempel maakt van een grijs beeld een zwart-wit beeld. Op papier
// is inkt donker en het papier licht. Wij willen het andersom: inkt
// wordt WIT en papier wordt ZWART. Zo zien de cijfers eruit waarvan
// het netwerk in deel 2 leert.
//
// Het kader in de functie staat al klaar: er wordt een nieuw, leeg
// beeld gemaakt en er is een loop langs alle pixels. Nu wordt elke
// pixel WIT: druk op D en het middelste beeld is helemaal wit.
// Vervang die regel door een if: is de pixel donkerder dan grens
// (dus een kleiner getal), dan wordt de nieuwe pixel WIT, anders ZWART.
//
// Test: druk op D. Houd een stuk papier met een pen-streep voor de
// webcam. Verander INKT_GRENS (onderaan) als het beeld te vol of te
// leeg is.
//
// UITLEG – Je bekijkt elke pixel apart en kiest met een if een nieuwe
// waarde. Alle bewerkingen in dit project werken zo: een loop langs
// alle pixels die een nieuw beeld vult.
// -------------------------------------------------------------
function drempel(beeld, grens) {
  let nieuw = maakLeegBeeld(beeld[0].length, beeld.length);
  for (let rij = 0; rij < beeld.length; rij++) {
    for (let kolom = 0; kolom < beeld[0].length; kolom++) {
      nieuw[rij][kolom] = WIT; // vervang deze regel door een if
    }
  }
  return nieuw;
}

// -------------------------------------------------------------
// STAP 2 – Convolutie (een filter toepassen)
// Bekijk eerst het plaatje over convolutie op de pagina.
// Een kernel is een raster van 3 bij 3 getallen. Voor elke pixel leg
// je het midden van de kernel op die pixel. Je vermenigvuldigt de 9
// pixels onder de kernel elk met het getal dat erop ligt, en telt alles
// op. Die som is de nieuwe pixel.
//
// De kernels staan al klaar (onderaan). Zo zien er twee uit:
//   BLUR (toets 1)            RANDEN_VERTICAAL (toets 2)
//   1/9  1/9  1/9             -1   0   1
//   1/9  1/9  1/9             -2   0   2
//   1/9  1/9  1/9             -1   0   1
// BLUR neemt het gemiddelde van 9 pixels. RANDEN_VERTICAAL trekt de
// linkerkant af van de rechterkant: in een egaal vlak is de som 0,
// op een rand is hij groot.
//
// In het kader is som nu gewoon de pixel zelf, dus het beeld blijft
// gelijk. De buitenste rand slaan we over: daar steekt de kernel buiten
// het beeld. abs(som) staat er al: dat maakt een negatieve som positief,
// want een helderheid kan niet negatief zijn.
//
// STAP 2a – Alleen het midden
//   Het midden van de kernel is kernel[1][1]. Dat hoort bij de pixel
//   beeld[rij][kolom] zelf. Vervang de regel met som door:
//     let som = ___ * ___;
//   Test: druk op 1. Het middelste beeld wordt veel donkerder.
//   Kijk naar de getallen in BLUR: snap je waarom?
//
// STAP 2b – Alle negen vakjes
//   Nu tellen alle 9 vakjes mee. Het kernelvakje kernel[kRij][kKolom]
//   hoort bij de pixel beeld[rij + kRij - 1][kolom + kKolom - 1].
//   (kRij en kKolom zijn 0, 1 of 2.) Gebruik dit raamwerk:
//     let som = 0;
//     for (let kRij = 0; kRij < 3; kRij++) {
//       for (let kKolom = ...; ...; ...) {
//         som = som + ___ * ___;
//       }
//     }
//   Test: met toets 1 wordt het beeld wazig, en weer even licht.
//   Met 2 en 3 zie je randen, met 4 wordt het beeld scherper.
//
// UITLEG – Je hebt een convolutie geprogrammeerd: dezelfde kleine
// berekening op elke plek in het beeld. Wat er gebeurt, hangt alleen
// af van de 9 getallen in de kernel.
// -------------------------------------------------------------
function convolutie(beeld, kernel) {
  let nieuw = maakLeegBeeld(beeld[0].length, beeld.length);
  for (let rij = 1; rij < beeld.length - 1; rij++) {
    for (let kolom = 1; kolom < beeld[0].length - 1; kolom++) {
      let som = beeld[rij][kolom]; // vervang deze regel
      nieuw[rij][kolom] = abs(som);
    }
  }
  return nieuw;
}

// -------------------------------------------------------------
// STAP 3 – Pooling
// Pooling maakt een beeld kleiner. Je verdeelt het beeld in vierkante
// blokken van blok bij blok pixels. Elk blok wordt één pixel in het
// kleine beeld.
// Het kader staat klaar: klein is het nieuwe beeld, met een loop langs
// al zijn pixels. Pixel klein[rij][kolom] hoort bij het blok dat
// linksboven begint bij beeld[rij * blok][kolom * blok].
// Haal eerst de regel "return beeld;" bovenaan de functie weg.
//
// STAP 3a – Linksboven
//   Zet in klein[rij][kolom] de pixel linksboven uit het blok.
//   Test: rechts zie je een blokkerige, kleine versie van het midden.
//
// STAP 3b – De grootste uit het blok (max pooling)
//   Zo zoek je de grootste waarde in een blok:
//   - Begin met grootste = ZWART. Kleiner dan 0 kan een pixel niet zijn.
//   - Ga langs alle pixels in het blok.
//   - Is een pixel groter dan grootste? Dan wordt dat de nieuwe grootste.
//   - Na de loops staat in grootste de grootste waarde van het blok.
//   Voorbeeld, een blok met de pixels 30, 200, 90 en 250:
//     begin:  grootste = 0
//     30:     groter dan 0?    ja   ->  grootste = 30
//     200:    groter dan 30?   ja   ->  grootste = 200
//     90:     groter dan 200?  nee  ->  grootste blijft 200
//     250:    groter dan 200?  ja   ->  grootste = 250
//   Gebruik dit raamwerk. bRij en bKolom geven aan hoe ver je in het
//   blok zit, gerekend vanaf de pixel linksboven uit STAP 3a:
//     let grootste = ZWART;
//     for (let bRij = 0; bRij < blok; bRij++) {
//       for (let bKolom = 0; bKolom < blok; bKolom++) {
//         let waarde = beeld[___][___];
//         if (...) {
//           ...
//         }
//       }
//     }
//     klein[rij][kolom] = grootste;
//   Test: druk op 2. Blijven dunne randen nu beter zichtbaar dan bij 3a?
//
// UITLEG – Je beeld is nu 100 keer zo klein, maar je herkent het nog.
// Doordat je de grootste waarde houdt, gaan sterke randen niet verloren.
// -------------------------------------------------------------
function pooling(beeld, blok) {
  return beeld; // STAP 3: haal deze regel weg
  let klein = maakLeegBeeld(floor(beeld[0].length / blok), floor(beeld.length / blok));
  for (let rij = 0; rij < klein.length; rij++) {
    for (let kolom = 0; kolom < klein[0].length; kolom++) {
      // jouw code
    }
  }
  return klein;
}

// =============================================================
// DEEL 2 – Cijfers herkennen (praktijkles 4)
// =============================================================

// -------------------------------------------------------------
// STAP 4 – Je eigen neurale netwerk
// Lees op de pagina wat lagen, neuronen, trainen, epochs en accuracy
// zijn. Je bouwt het netwerk laag voor laag met deze hulpfuncties:
//   voegPlatLaagToe(model)               maakt van het beeld één lange rij getallen
//   voegNeuronenLaagToe(model, aantal)   een laag met aantal neuronen
//   voegConvolutieLaagToe(model, aantal) aantal filters van 3 bij 3, net als jouw convolutie
//   voegPoolingLaagToe(model)            max pooling met blokken van 2 bij 2
//   voegUitvoerLaagToe(model)            10 neuronen: één per cijfer 0 t/m 9
// Schrijf bij elke stap de accuracy en het aantal gewichten op.
//
// STAP 4a – Klik op "Train netwerk" en wacht tot het klaar is.
//           Dit netwerk heeft alleen een uitvoerlaag: elk van de 10
//           neuronen kijkt direct naar alle 784 pixels.
// STAP 4b – Zet tussen de platte laag en de uitvoerlaag een laag met
//           32 neuronen. Zo'n laag tussen invoer en uitvoer heet een
//           verborgen laag. Train opnieuw en vergelijk.
// STAP 4c – Maak er een CNN van: zet VOOR de platte laag een
//           convolutielaag met 8 filters, en daarna een poolinglaag.
//           Train opnieuw en vergelijk. Rechtsonder zie je de filters
//           die het netwerk zelf geleerd heeft.
// STAP 4d – Probeer de accuracy zo hoog mogelijk te krijgen: meer of
//           minder filters, meer epochs, of nog een convolutie- en
//           poolinglaag erbij. Let op: meer gewichten = langer trainen.
//
// UITLEG – Je hebt een CNN gebouwd uit dezelfde bouwstenen als deel 1.
// Het verschil: jij koos de getallen van je kernels zelf, het netwerk
// zoekt ze tijdens het trainen zelf.
// -------------------------------------------------------------
let epochs = 3;

function maakModel() {
  let model = nieuwModel();
  voegPlatLaagToe(model);
  voegUitvoerLaagToe(model);
  return model;
}

// -------------------------------------------------------------
// STAP 5 – Welke cijfers vindt het netwerk moeilijk?
// De accuracy is één getal voor alle cijfers samen. Misschien gaat
// het bij het ene cijfer veel vaker fout dan bij het andere.
// Na het trainen laat het programma het netwerk alle testcijfers
// voorspellen en roept het deze functie aan. Je hebt:
//   testCijfers[i]          het echte cijfer van testvoorbeeld i
//   testVoorspellingen[i]   wat het netwerk voorspelde
//   totaalPerCijfer         lijst van 10 getallen, allemaal 0
//   goedPerCijfer           lijst van 10 getallen, allemaal 0
// Plek 0 in de lijst is voor cijfer 0, plek 1 voor cijfer 1, enzovoort.
//
// STAP 5a – Tel hoeveel testvoorbeelden er van elk cijfer zijn.
//   Het echte cijfer gebruik je als plek in de lijst:
//     let cijfer = testCijfers[i];
//     totaalPerCijfer[___] = ___ + 1;
//   Test: train opnieuw. Onder "goed per cijfer" staat nu bij elk
//   cijfer hoeveel testvoorbeelden er zijn (ongeveer 225).
// STAP 5b – Tel ook hoe vaak het netwerk goed zat: als de voorspelling
//   gelijk is aan het echte cijfer, tel je 1 op bij goedPerCijfer.
//   Test: de balken laten nu per cijfer zien welk deel goed is.
//   Welk cijfer is het moeilijkst? Is dat bij 4a en 4c hetzelfde?
//
// UITLEG – Je hebt de accuracy per cijfer uitgerekend. Zo zie je waar
// een netwerk zwak is, net als met de goed- en foutvoorspellingen in
// project 1. Een hoge totale accuracy zegt niet alles.
// -------------------------------------------------------------
function telPerCijfer() {
  for (let i = 0; i < testCijfers.length; i++) {
    // jouw code
  }
}

// -------------------------------------------------------------
// STAP 6 – Het beeld klaarmaken voor het netwerk
// Bovenaan deel 2 zie je van elk cijfer een voorbeeld uit MNIST, de
// trainingsdata waarvan het netwerk leert. Daaronder zie je twee
// beelden: links jouw beeld (tekening of webcam), rechts "wat het
// netwerk ziet". Het netwerk werkt alleen goed als het rechter beeld
// lijkt op de voorbeelden. Nu is het rechter beeld nog gewoon jouw
// beeld in grijs.
//
// Los de verschillen één voor één op, in deze volgorde. Aan het eind
// ziet voorbewerking er zo uit:
//     let beeld = naarGrijs(img);
//     beeld = ___(beeld, ___);      // STAP 6a
//     beeld = ___(beeld, ___);      // STAP 6b
//     beeld = centreer(beeld);      // STAP 6c
//     beeld = ___(beeld, ___);      // STAP 6d, aangepast in 6e
//     return beeld;
// Op de ___ komen je eigen functies uit STAP 1, 2 en 3 en hun
// instellingen. Zet elke nieuwe regel onder de vorige en kijk daarna
// of het rechter beeld meer op de voorbeelden lijkt.
//
// STAP 6a – Ruis: klik op "Webcam" en houd een cijfer op papier in het
//   groene vak. Een webcambeeld heeft ruis: kleine vlekjes die er niet
//   echt zijn. In een wazig beeld vallen die vlekjes weg. Welke functie
//   en welke kernel maken een beeld wazig?
//   Test: het rechter beeld wordt een beetje wazig.
// STAP 6b – Kleur: bij jou is het cijfer donker op licht papier, bij
//   MNIST is het wit op zwart. Welke functie uit STAP 1, 2 of 3 maakt
//   donkere pixels WIT en lichte pixels ZWART? Als grens gebruik je
//   een constante van onderaan.
//   Test: het rechter beeld is zwart met een wit cijfer. Zie je nog
//   losse witte stipjes? Haal je regel van 6a even weg en kijk wat er
//   dan gebeurt.
// STAP 6c – Plek en grootte: bij MNIST staat het cijfer altijd in het
//   midden en is het altijd even groot. Dat doet de hulpfunctie
//   centreer. Zet de regel beeld = centreer(beeld); onder je regel van
//   6b. Waarom moet hij ná 6b? Tip: centreer zoekt het cijfer door naar
//   witte pixels te kijken.
// STAP 6d – Aantal pixels: jouw beeld is 196 bij 196 pixels, het
//   netwerk kan alleen 28 bij 28 bekijken. Welke functie uit STAP 1, 2
//   of 3 maakt een beeld kleiner? Hoe groot moet een blok zijn?
//   Reken uit: 196 / 28 = ___. (Of gebruik de constanten
//   WEBCAM_PIXELS en CIJFER_PIXELS.)
//   Test: nu verschijnt er een voorspelling. Klik op "Tekenen", teken
//   tien cijfers en tel hoeveel er goed gaan.
// STAP 6e – Zachte randen: kijk goed naar de voorbeelden. De randen
//   zijn grijs. Bij jou is alles hard zwart of wit, en de lijnen zijn
//   dik. Maak de functie gemiddeldePooling hieronder af en gebruik die
//   in je regel van 6d in plaats van pooling. Gaan er nu meer van je
//   tien cijfers goed?
//
// UITLEG – Een netwerk werkt alleen goed op beelden die lijken op
// waarvan het geleerd heeft. Daarom maak je elk nieuw beeld eerst
// zo klaar dat het op de trainingsdata lijkt. Dat heet voorbewerking.
// -------------------------------------------------------------
function voorbewerking(img) {
  let beeld = naarGrijs(img);
  // jouw code
  return beeld;
}

// STAP 6e – Gemiddelde pooling
// Net als pooling uit STAP 3, maar nu wordt de nieuwe pixel het
// gemiddelde van het blok in plaats van de grootste waarde.
// Gemiddelde = de som van alle pixels in het blok, gedeeld door het
// aantal pixels in het blok (een blok heeft blok * blok pixels).
// Haal eerst de regel "return pooling(beeld, blok);" weg. Gebruik dan
// dit raamwerk, de loops ken je van STAP 3b:
//     let som = 0;
//     for (let bRij = 0; bRij < blok; bRij++) {
//       for (let bKolom = 0; bKolom < blok; bKolom++) {
//         som = som + beeld[___][___];
//       }
//     }
//     klein[rij][kolom] = ___ / ___;
function gemiddeldePooling(beeld, blok) {
  return pooling(beeld, blok); // STAP 6e: haal deze regel weg
  let klein = maakLeegBeeld(floor(beeld[0].length / blok), floor(beeld.length / blok));
  for (let rij = 0; rij < klein.length; rij++) {
    for (let kolom = 0; kolom < klein[0].length; kolom++) {
      // jouw code
    }
  }
  return klein;
}

// =============================================================
// Hieronder hoef je niets te veranderen
// =============================================================

// ---------- Constanten ----------
const ZWART = 0;
const WIT = 255;
const INKT_GRENS = 100;    // donkerder dan dit is inkt
const BLOK_DEEL1 = 10;     // pooling in deel 1: 300 / 10 = 30 pixels
const WEBCAM_PIXELS = 196; // het beeld in deel 2 is 196 bij 196 pixels
const CIJFER_PIXELS = 28;  // de MNIST-cijfers zijn 28 bij 28 pixels

// ---------- Kernels ----------
const BLUR = [
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
];

const RANDEN_VERTICAAL = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1],
];

const RANDEN_HORIZONTAAL = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1],
];

const VERSCHERPEN = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0],
];

// ---------- Testresultaten voor STAP 5 ----------
let testCijfers = [];
let testVoorspellingen = [];
let totaalPerCijfer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let goedPerCijfer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// ---------- Hulpfuncties voor het netwerk (STAP 4) ----------

function nieuwModel() {
  return tf.sequential();
}

// De eerste laag moet weten hoe groot het invoerbeeld is
function eersteLaag(model, instellingen) {
  if (model.layers.length === 0) instellingen.inputShape = [CIJFER_PIXELS, CIJFER_PIXELS, 1];
  return instellingen;
}

function voegPlatLaagToe(model) {
  model.add(tf.layers.flatten(eersteLaag(model, {})));
}

function voegNeuronenLaagToe(model, aantal) {
  model.add(tf.layers.dense(eersteLaag(model, { units: aantal, activation: "relu" })));
}

function voegConvolutieLaagToe(model, aantal) {
  model.add(tf.layers.conv2d(eersteLaag(model, { filters: aantal, kernelSize: 3, activation: "relu" })));
}

function voegPoolingLaagToe(model) {
  model.add(tf.layers.maxPooling2d(eersteLaag(model, { poolSize: 2 })));
}

function voegUitvoerLaagToe(model) {
  model.add(tf.layers.dense(eersteLaag(model, { units: 10, activation: "softmax" })));
}

// ---------- Beelden ----------

function maakLeegBeeld(breedte, hoogte) {
  let beeld = [];
  for (let rij = 0; rij < hoogte; rij++) {
    beeld.push(new Array(breedte).fill(ZWART));
  }
  return beeld;
}

// p5-afbeelding (of camerabeeld) naar een lijst van rijen met grijswaarden
function naarGrijs(img) {
  img.loadPixels();
  let beeld = maakLeegBeeld(img.width, img.height);
  for (let rij = 0; rij < img.height; rij++) {
    for (let kolom = 0; kolom < img.width; kolom++) {
      let i = 4 * (rij * img.width + kolom);
      beeld[rij][kolom] = round((img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3);
    }
  }
  return beeld;
}

// Lijst van rijen met grijswaarden naar p5-afbeelding
function naarAfbeelding(beeld) {
  let img = createImage(beeld[0].length, beeld.length);
  img.loadPixels();
  for (let rij = 0; rij < beeld.length; rij++) {
    for (let kolom = 0; kolom < beeld[0].length; kolom++) {
      let i = 4 * (rij * img.width + kolom);
      let v = constrain(abs(beeld[rij][kolom]), ZWART, WIT);
      img.pixels[i] = v;
      img.pixels[i + 1] = v;
      img.pixels[i + 2] = v;
      img.pixels[i + 3] = 255;
    }
  }
  img.updatePixels();
  return img;
}

// Zet het (witte) cijfer in het midden en maak het even groot als in MNIST:
// het cijfer past in een vierkant van 20/28 van het beeld en het
// zwaartepunt komt precies in het midden. Het beeld blijft even groot.
function centreer(beeld) {
  let grootte = beeld.length;
  let minK = grootte, minR = grootte, maxK = -1, maxR = -1;
  for (let rij = 1; rij < grootte - 1; rij++) {
    for (let kolom = 1; kolom < grootte - 1; kolom++) {
      if (beeld[rij][kolom] > WIT / 2) {
        minK = min(minK, kolom);
        maxK = max(maxK, kolom);
        minR = min(minR, rij);
        maxR = max(maxR, rij);
      }
    }
  }
  let uit = maakLeegBeeld(grootte, grootte);
  if (maxK < 0) return uit;
  let schaal = (grootte * 20) / CIJFER_PIXELS / max(maxK - minK + 1, maxR - minR + 1);
  let midK = (minK + maxK + 1) / 2;
  let midR = (minR + maxR + 1) / 2;
  for (let rij = 0; rij < grootte; rij++) {
    for (let kolom = 0; kolom < grootte; kolom++) {
      let bk = floor(midK + (kolom + 0.5 - grootte / 2) / schaal);
      let br = floor(midR + (rij + 0.5 - grootte / 2) / schaal);
      if (bk >= minK && bk <= maxK && br >= minR && br <= maxR) uit[rij][kolom] = beeld[br][bk];
    }
  }
  return verschuifNaarZwaartepunt(uit);
}

function verschuifNaarZwaartepunt(beeld) {
  let grootte = beeld.length;
  let som = 0, sk = 0, sr = 0;
  for (let rij = 0; rij < grootte; rij++) {
    for (let kolom = 0; kolom < grootte; kolom++) {
      som += beeld[rij][kolom];
      sk += kolom * beeld[rij][kolom];
      sr += rij * beeld[rij][kolom];
    }
  }
  if (som === 0) return beeld;
  let dk = round((grootte - 1) / 2 - sk / som);
  let dr = round((grootte - 1) / 2 - sr / som);
  let uit = maakLeegBeeld(grootte, grootte);
  for (let rij = 0; rij < grootte; rij++) {
    for (let kolom = 0; kolom < grootte; kolom++) {
      let bk = kolom - dk;
      let br = rij - dr;
      if (bk >= 0 && bk < grootte && br >= 0 && br < grootte) uit[rij][kolom] = beeld[br][bk];
    }
  }
  return uit;
}

// Eén cijfer uit de MNIST-data als beeld
function mnistCijfer(nummer) {
  let beeld = maakLeegBeeld(CIJFER_PIXELS, CIJFER_PIXELS);
  let start = nummer * CIJFER_PIXELS * CIJFER_PIXELS;
  for (let rij = 0; rij < CIJFER_PIXELS; rij++) {
    for (let kolom = 0; kolom < CIJFER_PIXELS; kolom++) {
      beeld[rij][kolom] = mnistBeeld.pixels[4 * (start + rij * CIJFER_PIXELS + kolom)];
    }
  }
  return beeld;
}

// ---------- Scherm, knoppen en tekenen ----------

const GROEN = [125, 201, 3];
const LIJNDIKTE = 16; // dikte van de pen bij Tekenen
const DEEL_TEST = 0.15; // 15% van de cijfers is testdata
const VOORBEELD_NUMMERS = [10, 20, 76, 31, 46, 56, 26, 25, 5, 17]; // een 0, 1, 2, ... 9 uit MNIST
const RIJ2 = 150; // hoogte waarop de beelden in deel 2 beginnen
let deel = 1;
let foto, video, tekenvlak;
let gebruikWebcam = true;
let bewerking = "drempel";
let kernel, kernelNaam;

let mnistBeeld, labels, xs, ys, model;
let bezig = false;
let status = "Klik op 'Train netwerk' om te beginnen.";
let geschiedenis = [];
let filters = null;
let kansen = null;
let invoer = null;
let voorbeelden = [];
let bron2 = "tekenen";
let tabs, knoppen2;

function preload() {
  foto = loadImage("foto.jpg");
  mnistBeeld = loadImage("data/mnist.png");
  labels = loadJSON("data/mnist_labels.json");
}

function setup() {
  tabs = createDiv("").parent("sketch").class("tabs");
  createButton("Deel 1 · Filters en pooling").parent(tabs).mousePressed(() => kiesDeel(1));
  createButton("Deel 2 · Cijfers herkennen").parent(tabs).mousePressed(() => kiesDeel(2));

  createCanvas(940, 480).parent("sketch");
  textFont("Work Sans");
  noSmooth();
  foto.resize(300, 300);
  labels = Object.values(labels);
  maakData();
  for (let c = 0; c < 10; c++) voorbeelden.push(naarAfbeelding(mnistCijfer(VOORBEELD_NUMMERS[c])));

  video = createCapture(VIDEO);
  video.size(400, 300);
  video.hide();
  tekenvlak = createGraphics(WEBCAM_PIXELS, WEBCAM_PIXELS);
  tekenvlak.pixelDensity(1);
  tekenvlak.background(WIT);

  knoppen2 = createDiv("").parent("sketch").class("knoppen");
  createButton("Train netwerk").parent(knoppen2).mousePressed(train);
  createButton("Tekenen").parent(knoppen2).class("tweede").mousePressed(() => (bron2 = "tekenen"));
  createButton("Wissen").parent(knoppen2).class("tweede").mousePressed(() => tekenvlak.background(WIT));
  createButton("Webcam").parent(knoppen2).class("tweede").mousePressed(() => (bron2 = "webcam"));

  kiesDeel(1);
}

function kiesDeel(d) {
  deel = d;
  let knop = tabs.elt.children;
  knop[0].className = d === 1 ? "" : "tweede";
  knop[1].className = d === 2 ? "" : "tweede";
  knoppen2.style("display", d === 2 ? "flex" : "none");
  resizeCanvas(940, d === 1 ? 480 : 600);
}

function webcamKlaar() {
  return video.elt.readyState >= 2;
}

function draw() {
  background(255);
  if (deel === 1) tekenDeel1();
  else tekenDeel2();
}

// ---------- Deel 1 ----------

function tekenDeel1() {
  let metWebcam = gebruikWebcam && webcamKlaar();
  let beeld = naarGrijs(metWebcam ? video.get(50, 0, 300, 300) : foto);
  let bewerkt;
  if (bewerking === "drempel") bewerkt = drempel(beeld, INKT_GRENS);
  else bewerkt = convolutie(beeld, kernel);
  let gepoold = pooling(bewerkt, BLOK_DEEL1);

  image(naarAfbeelding(beeld), 0, 0);
  image(naarAfbeelding(bewerkt), 320, 0);
  image(naarAfbeelding(gepoold), 640, 0, 300, 300);

  fill(60);
  noStroke();
  textSize(14);
  text(metWebcam ? "webcam (F = foto)" : "foto (F = webcam)", 0, 322);
  if (bewerking === "drempel") {
    text("na drempel (grens " + INKT_GRENS + ")", 320, 322);
  } else {
    text("na convolutie: " + kernelNaam, 320, 322);
    tekenKernel(320, 340);
  }
  text("na pooling (" + gepoold[0].length + " x " + gepoold.length + " pixels)", 640, 322);
  fill(120);
  textSize(12);
  text("D = drempel   1 = blur   2 = randen verticaal   3 = randen horizontaal   4 = verscherpen", 0, 470);
}

function tekenKernel(x, y) {
  textSize(12);
  textAlign(CENTER, CENTER);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      stroke(200);
      fill(248);
      rect(x + c * 46, y + r * 24, 46, 24);
      noStroke();
      fill(40);
      let getal = kernel[r][c];
      text(getal === 1 / 9 ? "1/9" : getal, x + c * 46 + 23, y + r * 24 + 12);
    }
  }
  textAlign(LEFT, BASELINE);
}

function keyPressed() {
  if (deel !== 1) return;
  if (key === "d" || key === "D") bewerking = "drempel";
  if (key === "1") [bewerking, kernel, kernelNaam] = ["filter", BLUR, "blur"];
  if (key === "2") [bewerking, kernel, kernelNaam] = ["filter", RANDEN_VERTICAAL, "randen verticaal"];
  if (key === "3") [bewerking, kernel, kernelNaam] = ["filter", RANDEN_HORIZONTAAL, "randen horizontaal"];
  if (key === "4") [bewerking, kernel, kernelNaam] = ["filter", VERSCHERPEN, "verscherpen"];
  if (key === "f" || key === "F") gebruikWebcam = !gebruikWebcam;
}

// ---------- Deel 2 ----------

function tekenDeel2() {
  tekenVoorbeelden(0, 52);
  let bron = null;
  if (bron2 === "tekenen") {
    if (mouseIsPressed && mouseX >= 0 && mouseX < WEBCAM_PIXELS && mouseY >= RIJ2 && mouseY < RIJ2 + WEBCAM_PIXELS) {
      tekenvlak.stroke(ZWART);
      tekenvlak.strokeWeight(LIJNDIKTE);
      tekenvlak.line(pmouseX, pmouseY - RIJ2, mouseX, mouseY - RIJ2);
    }
    bron = tekenvlak.get();
  } else if (webcamKlaar()) {
    bron = video.get(102, 52, WEBCAM_PIXELS, WEBCAM_PIXELS);
  }

  if (bron) {
    image(bron, 0, RIJ2);
    if (frameCount % 4 === 0) {
      invoer = voorbewerking(bron);
      kansen = null;
      if (model && !bezig && pastInNetwerk(invoer)) kansen = voorspel(invoer);
    }
  }
  noFill();
  stroke(...GROEN);
  strokeWeight(3);
  rect(1, RIJ2 + 1, WEBCAM_PIXELS - 2, WEBCAM_PIXELS - 2);

  if (invoer) image(naarAfbeelding(invoer), 216, RIJ2, WEBCAM_PIXELS, WEBCAM_PIXELS);
  tekenKansen(460, RIJ2);
  tekenGrafiek(0, RIJ2 + 270, 260, 150);
  tekenPerCijfer(320, RIJ2 + 270);
  tekenFilters(680, RIJ2 + 270);

  noStroke();
  fill(40);
  textSize(14);
  text(status, 0, 16);
  fill(110);
  textSize(12);
  text(bron2 === "webcam" ? "webcam: cijfer in het groene vak" : "teken een groot cijfer in het vak", 0, RIJ2 + 214);
  if (invoer) text("wat het netwerk ziet (" + invoer[0].length + " x " + invoer.length + ")", 216, RIJ2 + 214);
}

// Van elk cijfer één vast voorbeeld uit de trainingsdata
function tekenVoorbeelden(x, y) {
  noStroke();
  fill(40);
  textSize(14);
  text("zo zien de cijfers in de trainingsdata (MNIST) eruit", x, y - 10);
  for (let c = 0; c < 10; c++) {
    image(voorbeelden[c], x + c * 64, y, 56, 56);
  }
}

function pastInNetwerk(beeld) {
  return beeld.length === CIJFER_PIXELS && beeld[0].length === CIJFER_PIXELS;
}

function maakData() {
  mnistBeeld.loadPixels();
  let n = labels.length;
  let pixels = CIJFER_PIXELS * CIJFER_PIXELS;
  let data = new Float32Array(n * pixels);
  for (let i = 0; i < n * pixels; i++) data[i] = mnistBeeld.pixels[i * 4] / WIT;
  xs = tf.tensor4d(data, [n, CIJFER_PIXELS, CIJFER_PIXELS, 1]);
  ys = tf.oneHot(tf.tensor1d(labels, "int32"), 10);
}

async function train() {
  if (bezig) return;
  bezig = true;
  geschiedenis = [];
  filters = null;
  kansen = null;
  if (model) model.dispose();
  model = maakModel();
  model.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] });
  let params = model.countParams();
  await model.fit(xs, ys, {
    epochs: epochs,
    batchSize: 64,
    validationSplit: DEEL_TEST,
    shuffle: true,
    callbacks: {
      onBatchEnd: async (batch) => {
        status = "Trainen... epoch " + (geschiedenis.length + 1) + " van " + epochs + ", batch " + (batch + 1) + "   (" + params + " gewichten)";
        await tf.nextFrame();
      },
      onEpochEnd: (epoch, logs) => {
        geschiedenis.push({ train: logs.acc, test: logs.val_acc });
      },
    },
  });
  let laatste = geschiedenis[geschiedenis.length - 1];
  status = "Klaar! Accuracy op testdata: " + nf(100 * laatste.test, 0, 1) + "%   (" + params + " gewichten)";
  filters = leesFilters();
  voorspelTestdata();
  bezig = false;
}

// Laat het netwerk alle testcijfers voorspellen en roep telPerCijfer aan
function voorspelTestdata() {
  let start = floor(labels.length * (1 - DEEL_TEST));
  let aantal = labels.length - start;
  testCijfers = labels.slice(start);
  testVoorspellingen = tf.tidy(() => Array.from(model.predict(xs.slice([start], [aantal])).argMax(-1).dataSync()));
  totaalPerCijfer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  goedPerCijfer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  telPerCijfer();
}

function voorspel(beeld) {
  return tf.tidy(() => {
    let t = tf.tensor4d(beeld.flat().map((v) => v / WIT), [1, CIJFER_PIXELS, CIJFER_PIXELS, 1]);
    return Array.from(model.predict(t).dataSync());
  });
}

function tekenKansen(x, y) {
  noStroke();
  fill(40);
  textSize(14);
  text("voorspelling", x, y - 10);
  if (!kansen) {
    fill(130);
    textSize(13);
    let melding = "Train eerst je netwerk.";
    if (model && invoer && !pastInNetwerk(invoer)) melding = "Het netwerk kan alleen\n28 x 28 pixels bekijken.\nZie STAP 6.";
    else if (model) melding = "...";
    text(melding, x, y + 20);
    return;
  }
  let beste = kansen.indexOf(max(kansen));
  for (let i = 0; i < 10; i++) {
    let yy = y + i * 19;
    fill(i === beste ? 30 : 120);
    textSize(14);
    text(i, x, yy + 14);
    fill(238);
    rect(x + 18, yy + 2, 150, 15, 3);
    fill(...(i === beste ? GROEN : [180, 180, 180]));
    rect(x + 18, yy + 2, 150 * kansen[i], 15, 3);
    fill(90);
    textSize(11);
    text(nf(100 * kansen[i], 0, 0) + "%", x + 174, yy + 14);
  }
  fill(30);
  textSize(48);
  text(beste, x + 220, y + 120);
}

function tekenGrafiek(x, y, b, h) {
  noStroke();
  fill(40);
  textSize(14);
  text("accuracy per epoch", x, y - 8);
  stroke(220);
  strokeWeight(1);
  noFill();
  rect(x, y, b, h);
  for (let p of [0.25, 0.5, 0.75]) line(x, y + h * (1 - p), x + b, y + h * (1 - p));
  noStroke();
  fill(140);
  textSize(10);
  text("100%", x + b + 4, y + 8);
  text("0%", x + b + 4, y + h);
  if (geschiedenis.length === 0) return;
  let lijnen = [["train", [72, 106, 201]], ["test", GROEN]];
  for (let [naam, kleur] of lijnen) {
    stroke(...kleur);
    strokeWeight(2.5);
    let vorige = null;
    geschiedenis.forEach((g, i) => {
      let px = x + (b * (i + 1)) / max(epochs, 1);
      let py = y + h * (1 - g[naam]);
      if (vorige) line(vorige[0], vorige[1], px, py);
      circle(px, py, 4);
      vorige = [px, py];
    });
  }
  noStroke();
  fill(72, 106, 201);
  text("train", x + 6, y + h - 22);
  fill(...GROEN);
  text("test", x + 6, y + h - 8);
}

function tekenPerCijfer(x, y) {
  let h = 120;
  noStroke();
  fill(40);
  textSize(14);
  text("goed per cijfer (testdata)", x, y - 8);
  for (let c = 0; c < 10; c++) {
    let bx = x + c * 32;
    fill(238);
    rect(bx, y, 24, h, 3);
    let deelGoed = totaalPerCijfer[c] > 0 ? goedPerCijfer[c] / totaalPerCijfer[c] : 0;
    fill(...GROEN);
    rect(bx, y + h * (1 - deelGoed), 24, h * deelGoed, 3);
    fill(40);
    textSize(13);
    textAlign(CENTER, BASELINE);
    text(c, bx + 12, y + h + 15);
    fill(110);
    textSize(9);
    text(goedPerCijfer[c], bx + 12, y + h + 27);
    text("/ " + totaalPerCijfer[c], bx + 12, y + h + 38);
    textAlign(LEFT, BASELINE);
  }
  if (testCijfers.length > 0 && max(totaalPerCijfer) === 0) {
    fill(130);
    textSize(12);
    text("Nog niets geteld: zie STAP 5.", x + 6, y + 20);
  }
}

function leesFilters() {
  let laag = model.layers[0];
  if (laag.getClassName() !== "Conv2D") return null;
  return laag.getWeights()[0].arraySync();
}

function tekenFilters(x, y) {
  noStroke();
  fill(40);
  textSize(14);
  text("geleerde filters (eerste laag)", x, y - 8);
  if (!filters) {
    fill(130);
    textSize(12);
    text(model && !bezig ? "Je netwerk begint (nog) niet\nmet een convolutielaag." : "", x, y + 20);
    return;
  }
  let kh = filters.length;
  let kw = filters[0].length;
  let aantal = min(filters[0][0][0].length, 18);
  let cel = 10;
  for (let f = 0; f < aantal; f++) {
    let waarden = [];
    for (let r = 0; r < kh; r++) for (let c = 0; c < kw; c++) waarden.push(filters[r][c][0][f]);
    let grootste = max(waarden.map(abs));
    let fx = x + (f % 6) * (kw * cel + 8);
    let fy = y + floor(f / 6) * (kh * cel + 8);
    for (let r = 0; r < kh; r++) {
      for (let c = 0; c < kw; c++) {
        fill(map(filters[r][c][0][f], -grootste, grootste, 0, 255));
        rect(fx + c * cel, fy + r * cel, cel, cel);
      }
    }
  }
}