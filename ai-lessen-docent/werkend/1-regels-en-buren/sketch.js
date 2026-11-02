// =============================================================
// Project 1 – Van regels naar leren
//
// Elke stip is een leerling uit de bovenbouw:
//   x = gemiddeld cijfer wiskunde (1 t/m 10)
//   y = gemiddeld cijfer Nederlands (1 t/m 10)
//   label = profiel: 1 betekent N (natuurprofiel), -1 betekent M (maatschappijprofiel)
//
// De punten staan in drie lijsten. Op dezelfde plek in de lijsten
// staat dezelfde leerling. Leerling 0 heeft dus:
//   cijfer wiskunde trainX[0], cijfer Nederlands trainY[0], label trainLabel[0]
//
// Bediening: zie de zijbalk van de pagina.
// De achtergrondkleur laat zien wat jouw model voorspelt.
// =============================================================

let trainX = [];
let trainY = [];
let trainLabel = [];

let testX = [];
let testY = [];
let testLabel = [];

let k = 3;

// -------------------------------------------------------------
// STAP 1 – Regels
// Schrijf regels met if die het profiel voorspellen.
// x is het cijfer wiskunde, y het cijfer Nederlands.
// return 1 betekent N, return -1 betekent M.
//
// Nu staat er: wie hoger dan een 6 heeft voor wiskunde, krijgt N.
//
// STAP 1a – Zet een paar N- en M-leerlingen neer (toets N en M).
//           Pas de regel aan tot de achtergrondkleur klopt.
//           Je kunt ook y gebruiken, of twee if's.
//
// STAP 1b – Druk op R om alles te wissen. Zet nu N-leerlingen in een
//           rondje in het midden en M-leerlingen eromheen.
//           Probeer daar regels voor te schrijven. Lukt dat nog?
// -------------------------------------------------------------
function voorspelRegels(x, y) {
  // Eén mogelijke uitwerking voor 1b: N-leerlingen in een rondje rond (5, 5)
  if (x > 3 && x < 7 && y > 3 && y < 7) {
    return 1;
  }
  return -1;
}

// -------------------------------------------------------------
// STAP 2 – k-nearest neighbours
// Het idee: een nieuwe leerling krijgt het profiel van de
// leerlingen die het dichtst bij hem in de buurt liggen.
//
// De afstand van (x, y) tot trainpunt i bereken je met:
//   dist(x, y, trainX[i], trainY[i])
//
// STAP 2a – Eén buur
//   Schrijf in de functie hieronder:
//   1. Maak twee variabelen:
//        let kleinsteAfstand = 1000;
//        let beste = -1;
//   2. Maak een for-loop over alle trainpunten:
//        for (let i = 0; i < trainX.length; i++) {
//   3. Bereken in de loop de afstand van (x, y) tot trainpunt i.
//   4. Is die afstand kleiner dan kleinsteAfstand? Dan:
//        kleinsteAfstand = afstand;
//        beste = i;
//   5. Na de loop: als beste nog -1 is, zijn er geen punten: return -1;
//      Anders: return trainLabel[beste];
//   Test: druk op 2. Elk vlakje krijgt nu de kleur van het
//   dichtstbijzijnde punt.
//
// STAP 2b – k buren
//   Nu laten we de k dichtstbijzijnde buren stemmen. We zoeken k keer
//   de dichtstbijzijnde buur, en slaan buren over die al gekozen zijn.
//   1. Zet bovenaan de functie:
//        let gebruikt = [];
//        let som = 0;
//   2. Zet om je hele code van 2a (behalve de return-regels) een
//      nieuwe for-loop:
//        for (let keer = 0; keer < k; keer++) {
//      kleinsteAfstand en beste moeten dus BINNEN deze loop staan,
//      zodat ze elke keer opnieuw beginnen.
//   3. Zet in de binnenste loop een if om alles heen, zodat je een
//      punt alleen bekijkt als het nog niet gebruikt is:
//        if (gebruikt[i] !== true) { ... }
//   4. Na de binnenste loop (maar nog binnen de keer-loop):
//        if (beste !== -1) {
//          gebruikt[beste] = true;
//          som = som + trainLabel[beste];
//        }
//   5. Haal de oude return-regels weg. Zet onderaan de functie:
//        als som groter is dan 0: return 1;   anders: return -1;
//      (De labels zijn 1 en -1. Is de som positief, dan zijn er meer N-buren.)
//   Test: verander k met + en -.
// -------------------------------------------------------------
function voorspelKNN(x, y) {
  let gebruikt = [];
  let som = 0;
  for (let keer = 0; keer < k; keer++) {
    let kleinsteAfstand = 1000;
    let beste = -1;
    for (let i = 0; i < trainX.length; i++) {
      if (gebruikt[i] !== true) {
        let afstand = dist(x, y, trainX[i], trainY[i]);
        if (afstand < kleinsteAfstand) {
          kleinsteAfstand = afstand;
          beste = i;
        }
      }
    }
    if (beste !== -1) {
      gebruikt[beste] = true;
      som = som + trainLabel[beste];
    }
  }
  if (som > 0) {
    return 1;
  }
  return -1;
}

// -------------------------------------------------------------
// STAP 3 – Perceptron
// Een perceptron rekent een som uit met gewichten. Die gewichten
// leert hij zelf.
let gewichtX = 0;
let gewichtY = 0;
let bias = 0;
//
// STAP 3a – voorspelPerceptron
//   1. let som = gewichtX * x + gewichtY * y + bias;
//   2. Is som groter dan 0? return 1;   Anders: return -1;
//
// STAP 3b – leerStap
//   Maak een for-loop over alle trainpunten (i). Zet in de loop:
//   1. let voorspelling = voorspelPerceptron(trainX[i], trainY[i]);
//   2. let fout = trainLabel[i] - voorspelling;
//      (fout is 0 als het goed is, en 2 of -2 als het fout is)
//   3. gewichtX = gewichtX + 0.01 * fout * trainX[i];
//      gewichtY = gewichtY + 0.01 * fout * trainY[i];
//      bias = bias + 0.01 * fout;
//   Test: druk op 3 en daarna op spatie. Kijk hoe de grens verschuift.
//   Probeer ook het rondje uit 1b. Wat gebeurt er?
// -------------------------------------------------------------
function voorspelPerceptron(x, y) {
  let som = gewichtX * x + gewichtY * y + bias;
  if (som > 0) {
    return 1;
  }
  return -1;
}

function leerStap() {
  for (let i = 0; i < trainX.length; i++) {
    let voorspelling = voorspelPerceptron(trainX[i], trainY[i]);
    let fout = trainLabel[i] - voorspelling;
    gewichtX = gewichtX + 0.01 * fout * trainX[i];
    gewichtY = gewichtY + 0.01 * fout * trainY[i];
    bias = bias + 0.01 * fout;
  }
}

// -------------------------------------------------------------
// STAP 4 – Eerlijk testen
// Druk op T en zet testpunten neer (open rondjes). Die worden niet
// gebruikt om te leren. We tellen hoe vaak het model goed of fout zit.
// "Positief" betekent hier N (label 1).
let tp = 0; // voorspeld N, echt N
let fp = 0; // voorspeld N, echt M
let tn = 0; // voorspeld M, echt M
let fn = 0; // voorspeld M, echt N
//
//   1. Zet bovenaan de functie tp, fp, tn en fn op 0.
//   2. Maak een for-loop over alle testpunten (i).
//   3. let voorspelling = voorspel(testX[i], testY[i]);
//      (voorspel gebruikt de methode die nu aan staat)
//   4. Schrijf vier if's, bijvoorbeeld:
//        if (voorspelling === 1 && testLabel[i] === 1) {
//          tp = tp + 1;
//        }
//      en zo ook voor fp, tn en fn.
//   Linksboven verschijnen dan de aantallen en de accuracy.
// -------------------------------------------------------------
function telGoedEnFout() {
  tp = 0;
  fp = 0;
  tn = 0;
  fn = 0;
  for (let i = 0; i < testX.length; i++) {
    let voorspelling = voorspel(testX[i], testY[i]);
    if (voorspelling === 1 && testLabel[i] === 1) {
      tp = tp + 1;
    }
    if (voorspelling === 1 && testLabel[i] === -1) {
      fp = fp + 1;
    }
    if (voorspelling === -1 && testLabel[i] === -1) {
      tn = tn + 1;
    }
    if (voorspelling === -1 && testLabel[i] === 1) {
      fn = fn + 1;
    }
  }
}

// -------------------------------------------------------------
// STAP 5 – Meerdere perceptrons (netwerk)
// Hier hoef je niets te programmeren. Druk op 4 en daarna op spatie.
// Het netwerk bestaat uit een paar perceptrons (neuronen) en een
// neuron dat hun antwoorden combineert. De grijze lijnen zijn de
// lijnen van de losse neuronen. Verander het aantal met + en -.
//   - Hoeveel neuronen heb je nodig voor het rondje uit 1b?
//   - Wat gebeurt er met 1 neuron? En met 10?

// =============================================================
// Hieronder hoef je niets te veranderen
// =============================================================

const N_KLEUR = [72, 106, 201];
const M_KLEUR = [232, 137, 12];
let methode = "regels";
let leren = false;
let testModus = false;
let neuronen = 4;
let net;

function setup() {
  createCanvas(500, 500).parent("sketch");
  textFont("Work Sans");
  net = maakNetwerk(neuronen);
}

function draw() {
  if (leren && methode === "perceptron") leerStap();
  if (leren && methode === "netwerk") {
    for (let i = 0; i < 10; i++) netLeerStap();
  }
  tekenBeslisgrens();
  tekenAssen();
  if (methode === "netwerk") tekenNeuronLijnen();
  tekenPunten(trainX, trainY, trainLabel, false);
  tekenPunten(testX, testY, testLabel, true);
  tekenInfo();
}

function voorspel(x, y) {
  if (methode === "regels") return voorspelRegels(x, y);
  if (methode === "knn") return voorspelKNN(x, y);
  if (methode === "perceptron") return voorspelPerceptron(x, y);
  return voorspelNetwerk(x, y);
}

// Scherm (pixels) <-> cijfers (1 t/m 10)
function naarCijfer(px, py) {
  return { x: 1 + (px / width) * 9, y: 1 + ((height - py) / height) * 9 };
}

function naarScherm(x, y) {
  return { x: ((x - 1) / 9) * width, y: height - ((y - 1) / 9) * height };
}

function tekenBeslisgrens() {
  noStroke();
  for (let px = 0; px < width; px += 10) {
    for (let py = 0; py < height; py += 10) {
      let c = naarCijfer(px + 5, py + 5);
      if (voorspel(c.x, c.y) === 1) fill(214, 224, 247);
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
  text("cijfer wiskunde →", width - 8, height - 20);
  textAlign(LEFT, TOP);
  text("↑ cijfer Nederlands", 22, 118);
  for (let i = 2; i <= 9; i++) {
    let s = naarScherm(i, i);
    text(i, s.x + 3, height - 16);
    text(i, 3, s.y + 2);
  }
}

function tekenPunten(xs, ys, labels, isTest) {
  textAlign(CENTER, CENTER);
  textSize(10);
  for (let i = 0; i < xs.length; i++) {
    let s = naarScherm(xs[i], ys[i]);
    let kleur = labels[i] === 1 ? N_KLEUR : M_KLEUR;
    if (isTest) {
      fill(255);
      stroke(kleur);
      strokeWeight(3);
      circle(s.x, s.y, 16);
    } else {
      fill(kleur);
      noStroke();
      circle(s.x, s.y, 16);
      fill(255);
      text(labels[i] === 1 ? "N" : "M", s.x, s.y + 1);
    }
  }
}

function tekenInfo() {
  telGoedEnFout();
  let totaal = tp + fp + tn + fn;
  let regels = ["methode: " + methode];
  if (methode === "knn") regels[0] += "   k = " + k;
  if (methode === "netwerk") regels[0] += "   neuronen = " + neuronen;
  if (methode === "perceptron" || methode === "netwerk") regels[0] += leren ? "   (leert)" : "   (spatie = leren)";
  regels.push(testModus ? "je zet nu TESTpunten (open rondjes)" : "je zet nu TRAINpunten");
  regels.push("TP " + tp + "   FP " + fp + "   TN " + tn + "   FN " + fn);
  if (totaal > 0) regels.push("accuracy: " + nf((100 * (tp + tn)) / totaal, 0, 1) + "%");

  noStroke();
  fill(255, 220);
  rect(6, 6, 270, 18 * regels.length + 10, 6);
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
    let label = toets === "n" ? 1 : -1;
    if (testModus) {
      testX.push(c.x);
      testY.push(c.y);
      testLabel.push(label);
    } else {
      trainX.push(c.x);
      trainY.push(c.y);
      trainLabel.push(label);
    }
  }
  if (toets === "z") {
    if (testModus) [testX, testY, testLabel].forEach((l) => l.pop());
    else [trainX, trainY, trainLabel].forEach((l) => l.pop());
  }
  if (key === "1") methode = "regels";
  if (key === "2") methode = "knn";
  if (key === "3") methode = "perceptron";
  if (key === "4") methode = "netwerk";
  if (key === "+" || key === "=") {
    if (methode === "netwerk") nieuwNetwerk(neuronen + 1);
    else k++;
  }
  if (key === "-") {
    if (methode === "netwerk" && neuronen > 1) nieuwNetwerk(neuronen - 1);
    else if (methode !== "netwerk" && k > 1) k--;
  }
  if (key === " ") {
    leren = !leren;
    return false;
  }
  if (toets === "t") testModus = !testModus;
  if (toets === "r") {
    trainX = [];
    trainY = [];
    trainLabel = [];
    testX = [];
    testY = [];
    testLabel = [];
    gewichtX = 0;
    gewichtY = 0;
    bias = 0;
    nieuwNetwerk(neuronen);
  }
}

// ---------- Netwerk met één verborgen laag (voor stap 5) ----------

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

function netVooruit(x, y) {
  let a = [(x - 5.5) / 4.5, (y - 5.5) / 4.5];
  let h = net.w1.map((v) => Math.tanh(v[0] * a[0] + v[1] * a[1] + v[2]));
  let z = net.w2[h.length];
  for (let j = 0; j < h.length; j++) z += net.w2[j] * h[j];
  return { a, h, o: 1 / (1 + Math.exp(-z)) };
}

function voorspelNetwerk(x, y) {
  return netVooruit(x, y).o > 0.5 ? 1 : -1;
}

// Backpropagation: de fout wordt teruggerekend naar elk gewicht
function netLeerStap() {
  for (let i = 0; i < trainX.length; i++) {
    let { a, h, o } = netVooruit(trainX[i], trainY[i]);
    let d = o - (trainLabel[i] === 1 ? 1 : 0);
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
    let p;
    if (abs(v[1]) > abs(v[0])) p = [-1.2, 1.2].map((ax) => [ax, -(v[0] * ax + v[2]) / v[1]]);
    else p = [-1.2, 1.2].map((ay) => [-(v[1] * ay + v[2]) / v[0], ay]);
    let s = p.map(([ax, ay]) => naarScherm(ax * 4.5 + 5.5, ay * 4.5 + 5.5));
    line(s[0].x, s[0].y, s[1].x, s[1].y);
  }
}
