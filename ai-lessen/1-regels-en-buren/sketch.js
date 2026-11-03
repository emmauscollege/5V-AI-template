// =============================================================
// Project 1 – Van regels naar leren
//
// Kun je aan iemands cijfers zien welk profiel hij heeft?
// Lees eerst de uitleg op de webpagina: wat een N- en M-profiel is,
// waarom we wiskunde en Nederlands gebruiken en waar de data vandaan komt.
//
// DE DATA IN DE CODE
// De leerlingen staan in lijsten (onderaan dit bestand):
//   trainWIS, trainNETL, trainProfiel: hiervan leert het model (90%)
//   testWIS, testNETL, testProfiel:    hiermee testen we het model (10%)
// Op dezelfde plek in de lijsten staat dezelfde leerling. Leerling 0
// heeft dus wiskunde trainWIS[0], Nederlands trainNETL[0] en
// profiel trainProfiel[0].
//
// Volle stippen zijn trainleerlingen, open rondjes testleerlingen.
// Je kunt zelf testleerlingen toevoegen: jezelf en een paar
// klasgenoten. Ga met je muis naar de cijfers en druk op N of M.
//
// Linksboven zie je hoeveel procent van de testleerlingen het model
// goed voorspelt (de accuracy).
// =============================================================

// =============================================================
// STAP 1 – Regels
// =============================================================
// Kijk eerst goed naar de stippen. Waar zitten de N-leerlingen (blauw)
// en waar de M-leerlingen (oranje)?
//
// De functie hieronder krijgt de cijfers van één leerling: wis en netl.
// Hij geeft N_PROFIEL of M_PROFIEL terug.
// Nu staat er één regel: wie hoger dan een 6 haalt voor wiskunde,
// krijgt een N-profiel.
//
// STAP 1a – Verbeter de regel. Probeer een andere grens dan 6.
//           Kijk na elke wijziging naar de achtergrondkleur en de accuracy.
// STAP 1b – Gebruik ook het cijfer Nederlands. Je kunt twee if's maken,
//           of && (en) en || (of) gebruiken.
// STAP 1c – Zet testpunten neer van jezelf en drie klasgenoten.
//           Klopt jouw regel voor hen?
//
// UITLEG – Wat heb je gemaakt?
// Je hebt zelf bedacht hoe het profiel van de cijfers afhangt, en dat
// in regels gezet. Zo werkte AI vroeger: mensen schreven de regels.
// Je merkt waarschijnlijk dat het lastig is om regels te vinden die
// voor iedereen kloppen. Daarom laten we de computer in de volgende
// stappen zelf leren van de voorbeelden.
// -------------------------------------------------------------
function voorspelRegels(wis, netl) {
  if (wis > 6) {
    return N_PROFIEL;
  }
  return M_PROFIEL;
}

// =============================================================
// STAP 2 – k-nearest neighbours
// =============================================================
// Het idee: een nieuwe leerling heeft waarschijnlijk hetzelfde profiel
// als de leerlingen met cijfers die erop lijken. Die liggen in de
// grafiek dicht bij hem in de buurt.
//
// De afstand van (wis, netl) tot trainleerling i krijg je met:
//   dist(wis, netl, trainWIS[i], trainNETL[i])
//
// STAP 2a – Eén buur (k = 1)
//   Zoek de trainleerling die het dichtst bij (wis, netl) ligt en geef
//   zijn profiel terug. Je zoekt dus de kleinste afstand, net zoals je
//   het kleinste getal in een lijst zoekt. Gebruik dit raamwerk en vul
//   de puntjes in:
//
//     let kleinsteAfstand = 1000;
//     let beste = 0;
//     for (let i = 0; i < trainWIS.length; i++) {
//       let afstand = ...;        // de afstand tot leerling i
//       if (...) {                // is leerling i dichterbij dan de beste tot nu toe?
//         ...                     // onthoud de nieuwe kleinste afstand
//         ...                     // onthoud het nummer van deze leerling
//       }
//     }
//     return ...;                 // het profiel van de dichtstbijzijnde leerling
//
//   Denk na: waarom begint kleinsteAfstand op 1000?
//   Test: druk op 2. Elk vlakje krijgt de kleur van de dichtstbijzijnde
//   leerling.
//
// STAP 2b – k buren
//   Eén buur kan net een uitzondering zijn. Daarom laten we k buren
//   stemmen. Onderaan dit bestand (bij de hulpfuncties) staat de functie
//   zoekBuur(wis, netl, gebruikt). Die doet hetzelfde als jouw code van
//   2a, maar slaat leerlingen over die al gekozen zijn. Hij geeft het
//   NUMMER van de dichtstbijzijnde leerling terug (niet het profiel).
//   Vervang je code van 2a door dit, en vul de ___ in:
//
//     let gebruikt = [];
//     let som = 0;
//     for (let keer = 0; keer < k; keer++) {
//       let i = zoekBuur(wis, netl, gebruikt);
//       gebruikt[i] = true;      // deze leerling niet nog een keer kiezen
//       som = som + ___;         // tel het profiel van leerling i op
//     }
//     if (___) {
//       return N_PROFIEL;
//     }
//     return M_PROFIEL;
//
//   Tip: onderaan dit bestand zie je dat N_PROFIEL eigenlijk het getal 1
//   is en M_PROFIEL het getal -1. Wat weet je als de som positief is?
//   Test: verander k met + en -. Bij welke k is de accuracy het hoogst?
//
// UITLEG – Wat heb je gemaakt?
// Je hebt een model gemaakt dat een nieuwe leerling vergelijkt met de
// k leerlingen die het meest op hem lijken, en die laat stemmen.
// Dit model heeft geen regels: het onthoudt gewoon alle voorbeelden.
// Bij k = 1 volgt het elke uitzondering in de data. Dat heet
// overfitting: het model leert de trainingsdata uit zijn hoofd in
// plaats van het algemene patroon. Kijk wat er met de achtergrond
// gebeurt als k groter wordt.
// -------------------------------------------------------------
let k = 3;

function voorspelKNN(wis, netl) {
  return N_PROFIEL; // vervang dit door jouw code
}

// =============================================================
// STAP 3 – Perceptron
// =============================================================
// Een perceptron rekent een som uit:
//   som = gewichtWIS * wis + gewichtNETL * netl + bias
// Is de som groter dan 0, dan zegt hij N_PROFIEL. Anders M_PROFIEL.
// Alle punten waar de som precies 0 is, vormen een rechte lijn.
// Dat is de grens tussen N en M. Met de gewichten bepaal je hoe
// schuin die lijn staat, met de bias waar hij ligt.
let gewichtWIS = 0;
let gewichtNETL = 0;
let bias = 0;
//
// STAP 3a – voorspelPerceptron
//   Bereken de som zoals hierboven. Geef N_PROFIEL terug als de som
//   groter is dan 0, anders M_PROFIEL.
//   Test: zet bovenaan gewichtWIS = 1 en bias = -6. Druk op 3.
//   Waar ligt de grens nu? Waarom precies daar?
//   Probeer ook gewichtNETL = -1. Zet daarna alles weer op 0.
//
// STAP 3b – leerStap
//   Nu gaat de perceptron de gewichten zelf zoeken. Hij bekijkt alle
//   trainleerlingen één voor één. Bij elke leerling vraagt hij zijn
//   eigen voorspelling en vergelijkt die met het echte profiel:
//     fout = echte profiel - voorspelling
//   Omdat N_PROFIEL 1 is en M_PROFIEL -1, is de fout 0 als de
//   voorspelling klopt, en 2 of -2 als hij ernaast zit. Met die fout
//   schuift hij de gewichten een klein stukje.
//   Gebruik dit raamwerk en vul de puntjes in:
//
//     for (let i = 0; i < trainWIS.length; i++) {
//       let voorspelling = ...;      // wat zegt je perceptron over leerling i?
//       let fout = ...;
//       gewichtWIS = gewichtWIS + 0.01 * fout * trainWIS[i];
//       gewichtNETL = ...;           // net als gewichtWIS, maar dan met Nederlands
//       bias = bias + 0.01 * fout;
//     }
//
//   Test: druk op 3 en daarna op spatie. Kijk hoe de grens beweegt.
//   Druk nog een keer op spatie om te stoppen.
//
// UITLEG – Wat heb je gemaakt?
// Je hebt een perceptron gemaakt die leert van zijn fouten. Elke keer
// dat hij een leerling verkeerd voorspelt, verschuift de lijn een klein
// beetje. Na heel veel kleine stapjes ligt de lijn ergens waar de
// meeste leerlingen aan de goede kant liggen. Het getal 0.01 is de
// leersnelheid (learning rate): hoe groot elk stapje is.
// Kijk goed: komt de lijn ooit helemaal stil te liggen? Waarom niet?
// En waarom gebruiken we na het leren de beste lijn die hij vond?
// -------------------------------------------------------------
function voorspelPerceptron(wis, netl) {
  return N_PROFIEL; // vervang dit door jouw code
}

function leerStap() {
  // jouw code
}

// =============================================================
// STAP 4 – Wat voor fouten maakt het model?
// =============================================================
// De accuracy linksboven zegt hoeveel procent goed is. Maar welke
// fouten maakt het model? Voor elke testleerling zijn er vier
// mogelijkheden. We noemen N hier "positief" en M "negatief":
//
//   TP (true positive):  het model zegt N, en het is echt N.  Goed!
//   TN (true negative):  het model zegt M, en het is echt M.  Goed!
//   FP (false positive): het model zegt N, maar het is echt M. Fout.
//   FN (false negative): het model zegt M, maar het is echt N. Fout.
//
// "True" of "false" zegt of het model gelijk had. "Positive" of
// "negative" zegt wat het model voorspelde.
//
// Deze vier getallen samen heten de confusion matrix:
//
//                     echt N     echt M
//   voorspeld N         TP         FP
//   voorspeld M         FN         TN
//
let tp = 0;
let fp = 0;
let tn = 0;
let fn = 0;
//
// STAP 4a – Zet bovenaan de functie alle vier de tellers op 0.
//           (De functie wordt steeds opnieuw uitgevoerd. Wat zou er
//           gebeuren als je dat vergeet?)
// STAP 4b – Maak een for-loop langs alle testleerlingen. Vraag voor
//           elke leerling wat het model voorspelt:
//             let voorspelling = voorspel(testWIS[i], testNETL[i]);
//           (voorspel gebruikt de methode die nu aan staat.)
// STAP 4c – Tel met vier if's bij de goede teller 1 op. De eerste:
//             if (voorspelling === N_PROFIEL && testProfiel[i] === N_PROFIEL) {
//               tp = tp + 1;
//             }
//           Bedenk de andere drie zelf met de tabel hierboven.
//   Test: linksboven zie je de vier aantallen.
//   Tel TP + TN en deel door het totaal. Krijg je dezelfde accuracy?
//
// UITLEG – Wat heb je gemaakt?
// Je hebt de confusion matrix van je model geteld. Daarmee zie je niet
// alleen hoe vaak het model goed zit, maar ook welke kant het op
// fout gaat. Dat is belangrijk, want niet elke fout is even erg. Denk
// aan een decaan die dit model zou gebruiken: wat is erger, een FP
// of een FN?
// -------------------------------------------------------------
function telGoedEnFout() {
  // jouw code
}

// =============================================================
// STAP 5 – Perceptrons combineren
// =============================================================
// Eén perceptron kan alleen een rechte lijn trekken. Maar je kunt de
// antwoorden van meerdere perceptrons weer in een perceptron stoppen.
// Dat is een neuraal netwerk!
//
// STAP 5a – Een algemene perceptron
//   Schrijf de functie perceptron(a, b, gewichtA, gewichtB, b0).
//   Hij doet hetzelfde als je voorspelPerceptron uit 3a, maar krijgt
//   de invoer (a en b), de gewichten en de bias (b0) mee als parameters.
//
// STAP 5b – Twee lijnen en een baas
//   In voorspelTwee hieronder staan twee perceptrons die naar de
//   cijfers kijken:
//     lijn1: "is wiskunde hoger dan 5?"     (1 * wis - 5 > 0)
//     lijn2: "is Nederlands lager dan 7?"   (-1 * netl + 7 > 0)
//   Daarna komt een derde perceptron: de baas. Die krijgt de antwoorden
//   van lijn1 en lijn2 (allebei N_PROFIEL of M_PROFIEL, dus 1 of -1)
//   en beslist.
//   Druk op 4. De grijze lijnen zijn lijn1 en lijn2.
//   Vul de ___ bij de baas in, zodat hij alleen N zegt als lijn1 EN
//   lijn2 allebei N zeggen.
//   Tip: maak een tabel met de vier combinaties van lijn1 en lijn2
//   (1 of -1). Reken voor elke combinatie 1 * lijn1 + 1 * lijn2 uit.
//   Welk getal moet je erbij optellen zodat alleen de combinatie 1 en 1
//   boven 0 uitkomt?
//
// STAP 5c – Verschuif de lijnen
//   Verander de getallen van lijn1 en lijn2 tot het gebied zo goed
//   mogelijk om de N-leerlingen past. Hoe hoog krijg je de accuracy?
//
// STAP 5d – Laat het netwerk zelf leren
//   Druk op 5 en daarna op spatie. Nu zoekt de computer zelf de lijnen
//   (de grijze lijnen) en de baas. Verander het aantal lijnen met + en -.
//
// UITLEG – Wat heb je gemaakt?
// Je hebt een klein neuraal netwerk gebouwd met twee lagen: een laag
// perceptrons die elk één lijn trekken, en een perceptron die hun
// antwoorden combineert. Samen kunnen ze een gebied afbakenen dat
// geen rechte lijn is. Het lastige is de goede gewichten vinden: jij
// hebt dat met de hand gedaan, bij stap 5d doet de computer het zelf.
// Echte neurale netwerken werken op dezelfde manier, maar met
// duizenden tot miljarden perceptrons.
// -------------------------------------------------------------
function perceptron(a, b, gewichtA, gewichtB, b0) {
  return N_PROFIEL; // vervang dit door jouw code
}

function voorspelTwee(wis, netl) {
  let lijn1 = perceptron(wis, netl, 1, 0, -5);
  let lijn2 = perceptron(wis, netl, 0, -1, 7);
  let baas = perceptron(lijn1, lijn2, 1, 1, ___);
  return baas;
}

// =============================================================
// Hieronder hoef je niets te veranderen
// =============================================================

// ---------- Profielen ----------
// Een profiel is eigenlijk gewoon een getal. Daardoor kun je er mee
// rekenen, bijvoorbeeld optellen bij k-NN.
const N_PROFIEL = 1;
const M_PROFIEL = -1;

// ---------- Data ----------

// Trainingsdata: 72 leerlingen (36 N en 36 M). Hiervan leert het model.
// Op dezelfde plek in de drie lijsten staat dezelfde leerling.
let trainWIS = [
  8.5, 5.4, 9.2, 6.1, 5.3, 7.3, 6.4, 6.8, 6.0, 8.3, 5.0, 6.9, 5.7, 5.7, 5.6, 5.2,
  5.4, 5.5, 7.7, 5.7, 5.2, 5.2, 7.7, 6.5, 5.9, 5.0, 4.3, 6.7, 5.2, 7.4, 6.8, 6.4,
  6.3, 8.6, 8.0, 6.2, 8.6, 6.8, 6.0, 5.2, 7.8, 4.0, 6.5, 6.7, 5.6, 7.3, 7.2, 7.1,
  8.7, 7.4, 6.4, 7.0, 3.9, 4.1, 7.3, 4.7, 6.8, 5.6, 9.2, 6.1, 5.9, 6.7, 5.6, 8.0,
  5.2, 4.6, 6.9, 5.0, 7.8, 5.5, 6.4, 4.9,
];
let trainNETL = [
  7.7, 7.8, 6.6, 5.1, 6.3, 6.1, 6.7, 7.4, 6.7, 7.6, 3.6, 6.2, 7.9, 6.8, 6.9, 6.3,
  5.4, 6.0, 7.5, 5.9, 5.3, 5.8, 7.0, 5.8, 7.2, 7.2, 6.0, 5.4, 6.8, 7.1, 6.2, 7.4,
  3.7, 6.8, 4.7, 6.5, 5.2, 5.7, 5.7, 6.7, 7.9, 6.0, 7.5, 4.7, 6.4, 6.8, 9.0, 7.1,
  7.3, 7.1, 5.0, 4.3, 8.0, 6.6, 6.3, 6.9, 4.8, 5.5, 7.8, 5.9, 6.9, 7.7, 6.1, 7.6,
  5.8, 7.5, 7.0, 9.5, 5.2, 7.4, 5.5, 6.4,
];
let trainProfiel = [
  N_PROFIEL, M_PROFIEL, M_PROFIEL, N_PROFIEL, M_PROFIEL, N_PROFIEL,
  M_PROFIEL, M_PROFIEL, M_PROFIEL, N_PROFIEL, N_PROFIEL, M_PROFIEL,
  M_PROFIEL, M_PROFIEL, M_PROFIEL, M_PROFIEL, N_PROFIEL, M_PROFIEL,
  N_PROFIEL, M_PROFIEL, N_PROFIEL, N_PROFIEL, N_PROFIEL, M_PROFIEL,
  M_PROFIEL, M_PROFIEL, N_PROFIEL, M_PROFIEL, N_PROFIEL, N_PROFIEL,
  M_PROFIEL, N_PROFIEL, N_PROFIEL, N_PROFIEL, N_PROFIEL, M_PROFIEL,
  N_PROFIEL, N_PROFIEL, N_PROFIEL, M_PROFIEL, N_PROFIEL, N_PROFIEL,
  M_PROFIEL, N_PROFIEL, M_PROFIEL, N_PROFIEL, N_PROFIEL, M_PROFIEL,
  N_PROFIEL, N_PROFIEL, N_PROFIEL, N_PROFIEL, M_PROFIEL, M_PROFIEL,
  N_PROFIEL, M_PROFIEL, N_PROFIEL, N_PROFIEL, N_PROFIEL, M_PROFIEL,
  M_PROFIEL, M_PROFIEL, M_PROFIEL, N_PROFIEL, N_PROFIEL, M_PROFIEL,
  M_PROFIEL, M_PROFIEL, N_PROFIEL, M_PROFIEL, M_PROFIEL, M_PROFIEL,
];

// Testdata: 8 leerlingen (4 N en 4 M). Het model ziet deze leerlingen niet
// tijdens het leren. Jouw eigen testpunten (N en M) komen hier achteraan bij.
let testWIS = [
  7.0, 7.9, 7.8, 6.5, 7.8, 8.4, 4.3, 7.4,
];
let testNETL = [
  6.7, 8.0, 5.4, 6.8, 9.0, 4.3, 6.6, 5.4,
];
let testProfiel = [
  M_PROFIEL, N_PROFIEL, N_PROFIEL, M_PROFIEL, M_PROFIEL, N_PROFIEL,
  M_PROFIEL, N_PROFIEL,
];

// ---------- Hulpfuncties ----------

// Voor STAP 2b: geeft het nummer van de dichtstbijzijnde trainleerling
// die nog niet gebruikt is.
function zoekBuur(wis, netl, gebruikt) {
  let kleinsteAfstand = 1000;
  let beste = 0;
  for (let i = 0; i < trainWIS.length; i++) {
    let afstand = dist(wis, netl, trainWIS[i], trainNETL[i]);
    if (gebruikt[i] !== true && afstand < kleinsteAfstand) {
      kleinsteAfstand = afstand;
      beste = i;
    }
  }
  return beste;
}

const N_KLEUR = [72, 106, 201];
const M_KLEUR = [232, 137, 12];
const ___ = 0; // zodat de sketch werkt zolang de ___ nog niet is ingevuld
let methode = "regels";
let leren = false;
let neuronen = 4;
let net;
let aantalVasteTest;

function setup() {
  createCanvas(500, 500).parent("sketch");
  textFont("Work Sans");
  aantalVasteTest = testWIS.length;
  net = maakNetwerk(neuronen);
}

function draw() {
  if (leren && methode === "perceptron") {
    leerStap();
    onthoudBesteLijn();
  }
  if (leren && methode === "netwerk") {
    for (let i = 0; i < 10; i++) netLeerStap();
  }
  tekenBeslisgrens();
  tekenAssen();
  if (methode === "twee") tekenTweeLijnen();
  if (methode === "netwerk") tekenNeuronLijnen();
  tekenPunten(trainWIS, trainNETL, trainProfiel, false);
  tekenPunten(testWIS, testNETL, testProfiel, true);
  tekenInfo();
}

function voorspel(wis, netl) {
  if (methode === "regels") return voorspelRegels(wis, netl);
  if (methode === "knn") return voorspelKNN(wis, netl);
  if (methode === "perceptron") return voorspelPerceptron(wis, netl);
  if (methode === "twee") return voorspelTwee(wis, netl);
  return voorspelNetwerk(wis, netl);
}

// Onthoudt de lijn die tot nu toe de meeste trainleerlingen goed heeft.
// Bij data die niet met één rechte lijn te scheiden is, blijft de
// perceptron springen. Daarom gebruiken we na het leren de beste lijn.
let besteScore = -1;
let besteGewichten = [0, 0, 0];

function onthoudBesteLijn() {
  let goed = 0;
  for (let i = 0; i < trainWIS.length; i++) {
    if (voorspelPerceptron(trainWIS[i], trainNETL[i]) === trainProfiel[i]) goed++;
  }
  if (goed > besteScore) {
    besteScore = goed;
    besteGewichten = [gewichtWIS, gewichtNETL, bias];
  }
}

// Telt hoeveel testleerlingen goed voorspeld worden
function aantalGoed() {
  let goed = 0;
  for (let i = 0; i < testWIS.length; i++) {
    if (voorspel(testWIS[i], testNETL[i]) === testProfiel[i]) goed++;
  }
  return goed;
}

// Scherm (pixels) <-> cijfers (1 t/m 10)
function naarCijfer(px, py) {
  return { wis: 1 + (px / width) * 9, netl: 1 + ((height - py) / height) * 9 };
}

function naarScherm(wis, netl) {
  return { x: ((wis - 1) / 9) * width, y: height - ((netl - 1) / 9) * height };
}

function tekenBeslisgrens() {
  noStroke();
  for (let px = 0; px < width; px += 10) {
    for (let py = 0; py < height; py += 10) {
      let c = naarCijfer(px + 5, py + 5);
      if (voorspel(c.wis, c.netl) === N_PROFIEL) fill(214, 224, 247);
      else fill(250, 228, 200);
      rect(px, py, 10, 10);
    }
  }
}

function tekenAssen() {
  stroke(0, 35);
  strokeWeight(1);
  for (let i = 1; i <= 10; i++) {
    let s = naarScherm(i, i);
    line(s.x, 0, s.x, height);
    line(0, s.y, width, s.y);
  }
  noStroke();
  fill(60);
  textSize(12);
  textAlign(RIGHT, BOTTOM);
  text("WIS: cijfer wiskunde →", width - 8, height - 20);
  textAlign(LEFT, TOP);
  text("↑ NETL: cijfer Nederlands", 22, 136);
  for (let i = 2; i <= 9; i++) {
    let s = naarScherm(i, i);
    text(i, s.x + 3, height - 16);
    text(i, 3, s.y + 2);
  }
}

function tekenPunten(wissen, netls, profielen, isTest) {
  textAlign(CENTER, CENTER);
  textSize(10);
  for (let i = 0; i < wissen.length; i++) {
    let s = naarScherm(wissen[i], netls[i]);
    let kleur = profielen[i] === N_PROFIEL ? N_KLEUR : M_KLEUR;
    if (isTest) {
      fill(255);
      stroke(kleur);
      strokeWeight(3);
      circle(s.x, s.y, 18);
      noStroke();
      fill(kleur);
      text(profielen[i] === N_PROFIEL ? "N" : "M", s.x, s.y + 1);
    } else {
      fill(kleur);
      noStroke();
      circle(s.x, s.y, 14);
    }
  }
}

function tekenInfo() {
  telGoedEnFout();
  let goed = aantalGoed();
  let namen = { regels: "1 regels", knn: "2 k-NN", perceptron: "3 perceptron", twee: "4 twee perceptrons", netwerk: "5 netwerk" };
  let regels = ["methode: " + namen[methode]];
  if (methode === "knn") regels[0] += "   k = " + k;
  if (methode === "netwerk") regels[0] += "   lijnen = " + neuronen;
  if (methode === "perceptron" || methode === "netwerk") regels[0] += leren ? "   (leert)" : "   (spatie = leren)";
  if (methode === "twee") regels[0] += "   (lijnen zelf instellen)";
  regels.push("accuracy: " + nf((100 * goed) / testWIS.length, 0, 1) + "%   (" + goed + " van " + testWIS.length + " testleerlingen goed)");
  if (tp + fp + tn + fn > 0) regels.push("TP " + tp + "   FP " + fp + "   TN " + tn + "   FN " + fn);
  else regels.push("TP, FP, TN en FN: nog niet geteld (STAP 4)");
  if (methode === "perceptron" && besteScore >= 0) regels.push("beste lijn tot nu toe: " + besteScore + " van " + trainWIS.length + " trainleerlingen goed");
  regels.push("eigen testpunten: " + (testWIS.length - aantalVasteTest) + "   (N / M zetten, Z = terug)");

  noStroke();
  fill(255, 225);
  rect(6, 6, 360, 18 * regels.length + 10, 6);
  fill(30);
  textSize(13);
  textAlign(LEFT, TOP);
  regels.forEach((r, i) => text(r, 14, 12 + 18 * i));
}

function keyPressed() {
  let toets = key.toLowerCase();
  if (toets === "n" || toets === "m") {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
    let c = naarCijfer(mouseX, mouseY);
    testWIS.push(c.wis);
    testNETL.push(c.netl);
    testProfiel.push(toets === "n" ? N_PROFIEL : M_PROFIEL);
  }
  if (toets === "z" && testWIS.length > aantalVasteTest) {
    testWIS.pop();
    testNETL.pop();
    testProfiel.pop();
  }
  if (key === "1") methode = "regels";
  if (key === "2") methode = "knn";
  if (key === "3") methode = "perceptron";
  if (key === "4") methode = "twee";
  if (key === "5") methode = "netwerk";
  if (key === "+" || key === "=") {
    if (methode === "netwerk") nieuwNetwerk(neuronen + 1);
    else if (k < trainWIS.length) k++;
  }
  if (key === "-") {
    if (methode === "netwerk" && neuronen > 1) nieuwNetwerk(neuronen - 1);
    else if (methode !== "netwerk" && k > 1) k--;
  }
  if (key === " ") {
    leren = !leren;
    // Stopt het leren? Dan gaat de perceptron terug naar de beste lijn
    if (!leren && methode === "perceptron" && besteScore >= 0) {
      gewichtWIS = besteGewichten[0];
      gewichtNETL = besteGewichten[1];
      bias = besteGewichten[2];
    }
    return false;
  }
  if (toets === "r") {
    testWIS.length = aantalVasteTest;
    testNETL.length = aantalVasteTest;
    testProfiel.length = aantalVasteTest;
    gewichtWIS = 0;
    gewichtNETL = 0;
    bias = 0;
    besteScore = -1;
    nieuwNetwerk(neuronen);
  }
}

// Tekent de lijnen van lijn1 en lijn2 uit voorspelTwee
function tekenTweeLijnen() {
  let bron = voorspelTwee.toString();
  let gevonden = [...bron.matchAll(/perceptron\(\s*wis\s*,\s*netl\s*,([^,]+),([^,]+),([^)]+)\)/g)];
  stroke(0, 110);
  strokeWeight(2);
  for (let g of gevonden) {
    let w = g.slice(1, 4).map((s) => Number(s));
    if (w.some(isNaN)) continue;
    tekenLijn(w[0], w[1], w[2]);
  }
}

// Tekent de lijn gA * wis + gB * netl + b0 = 0
function tekenLijn(gA, gB, b0) {
  let p;
  if (abs(gB) > abs(gA)) p = [0, 11].map((w) => [w, -(gA * w + b0) / gB]);
  else if (gA !== 0) p = [0, 11].map((n) => [-(gB * n + b0) / gA, n]);
  else return;
  let s = p.map(([w, n]) => naarScherm(w, n));
  line(s[0].x, s[0].y, s[1].x, s[1].y);
}

// ---------- Netwerk dat zelf leert (voor STAP 5d) ----------

function nieuwNetwerk(aantal) {
  neuronen = aantal;
  net = maakNetwerk(aantal);
}

function maakNetwerk(aantal) {
  let r = () => random(-1, 1);
  return {
    w1: Array.from({ length: aantal }, () => [r(), r(), r()]),
    w2: Array.from({ length: aantal + 1 }, r),
  };
}

function netVooruit(wis, netl) {
  let a = [(wis - 5.5) / 4.5, (netl - 5.5) / 4.5];
  let h = net.w1.map((v) => Math.tanh(v[0] * a[0] + v[1] * a[1] + v[2]));
  let z = net.w2[h.length];
  for (let j = 0; j < h.length; j++) z += net.w2[j] * h[j];
  return { a, h, o: 1 / (1 + Math.exp(-z)) };
}

function voorspelNetwerk(wis, netl) {
  return netVooruit(wis, netl).o > 0.5 ? N_PROFIEL : M_PROFIEL;
}

// Backpropagation: de fout wordt teruggerekend naar elk gewicht
function netLeerStap() {
  for (let i = 0; i < trainWIS.length; i++) {
    let { a, h, o } = netVooruit(trainWIS[i], trainNETL[i]);
    let d = o - (trainProfiel[i] === N_PROFIEL ? 1 : 0);
    for (let j = 0; j < h.length; j++) {
      let dh = d * net.w2[j] * (1 - h[j] * h[j]);
      net.w2[j] -= 0.1 * d * h[j];
      net.w1[j][0] -= 0.1 * dh * a[0];
      net.w1[j][1] -= 0.1 * dh * a[1];
      net.w1[j][2] -= 0.1 * dh;
    }
    net.w2[h.length] -= 0.1 * d;
  }
}

function tekenNeuronLijnen() {
  stroke(0, 70);
  strokeWeight(1.5);
  for (let v of net.w1) {
    // omrekenen van de geschaalde cijfers naar gewone cijfers
    let gA = v[0] / 4.5;
    let gB = v[1] / 4.5;
    let b0 = v[2] - 5.5 * gA - 5.5 * gB;
    tekenLijn(gA, gB, b0);
  }
}