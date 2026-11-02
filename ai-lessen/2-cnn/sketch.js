// =============================================================
// Project 2 – Een eigen CNN
//
// DEEL 1 (praktijkles 3): je bouwt filters, convolutie en pooling.
// DEEL 2 (praktijkles 4): je bouwt een netwerk dat cijfers herkent.
//         Je webcam gebruikt dan jouw functies uit deel 1.
//
// Bovenaan de pagina wissel je tussen deel 1 en deel 2.
//
// Een beeld is voor de computer een lijst van rijen met getallen.
//   b[y][x] is de helderheid van de pixel in rij y en kolom x
//   (0 = zwart, 255 = wit).
//   b.length is de hoogte, b[0].length is de breedte.
// =============================================================

// =============================================================
// DEEL 1 – Filters en pooling
// =============================================================

// -------------------------------------------------------------
// STAP 1 – Kernels
// Een kernel is een raster van 3 x 3 getallen. Nu staan ze allemaal
// op "niets doen": alleen het midden is 1.
// Je kunt pas zien wat ze doen als STAP 2 af is. Je mag ze dus ook
// na STAP 2 invullen.
//
// STAP 1a – Blur: elke pixel wordt het gemiddelde van zichzelf en
//           zijn 8 buren. Vul 9 keer hetzelfde getal in.
//           Welk getal? (tip: samen moeten ze 1 zijn)
// STAP 1b – Verticale randen: een rand is een plek waar links heel
//           anders is dan rechts. Zet in de linker kolom -1, -2, -1,
//           in de middelste kolom 0, 0, 0 en in de rechter kolom
//           1, 2, 1. Wat komt eruit in een egaal vlak? En op een rand?
// STAP 1c – Horizontale randen: hetzelfde, maar dan boven (negatief)
//           en onder (positief).
// STAP 1d – Bedenk zelf een filter. Wat doet het?
// -------------------------------------------------------------
let blur = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

let randenVerticaal = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

let randenHorizontaal = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

let eigenFilter = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

// -------------------------------------------------------------
// STAP 2 – Convolutie
// De kernel schuift over het beeld. Voor elke pixel tel je de pixel
// en zijn 8 buren op, elk keer het getal uit de kernel.
//
// Het kader staat al klaar: er wordt een leeg beeld uit gemaakt en
// er is een loop over alle pixels (behalve de rand). Nu wordt elke
// pixel nog gewoon gekopieerd. Jij vervangt die regel.
//
// STAP 2a – Alleen het midden
//   Vervang de regel  uit[y][x] = b[y][x];  door:
//     let som = b[y][x] * k[1][1];
//     uit[y][x] = som;
//   Test: met de "niets doen"-kernels zien de linker twee beelden er
//   nog steeds hetzelfde uit.
//
// STAP 2b – Alle negen vakjes
//   Het kernelvakje k[ky][kx] hoort bij de pixel b[y + ky - 1][x + kx - 1].
//   (ky en kx zijn 0, 1 of 2. Het midden is k[1][1], dat hoort bij b[y][x].)
//   Maak van je code:
//     let som = 0;
//     for (let ky = 0; ky < 3; ky++) {
//       for (let kx = 0; kx < 3; kx++) {
//         som = som + b[y + ky - 1][x + kx - 1] * k[ky][kx];
//       }
//     }
//     uit[y][x] = som;
//   Test met jouw blur-kernel (toets 1).
//
// STAP 2c – Negatief wordt positief
//   Bij randenfilters kan de som negatief zijn. Een rand van donker
//   naar licht en van licht naar donker zijn allebei een rand.
//   Zet daarom abs(som) in uit[y][x] in plaats van som.
//   Test met toets 2 en 3.
// -------------------------------------------------------------
function convolutie(b, k) {
  let hoogte = b.length;
  let breedte = b[0].length;
  let uit = maakLeegBeeld(breedte, hoogte);
  for (let y = 1; y < hoogte - 1; y++) {
    for (let x = 1; x < breedte - 1; x++) {
      uit[y][x] = b[y][x]; // vervang deze regel door jouw code
    }
  }
  return uit;
}

// -------------------------------------------------------------
// STAP 3 – Pooling
// Pooling maakt het beeld kleiner: elk blok van g x g pixels wordt
// één pixel. Het kader staat klaar: uit is het kleine beeld, en er
// is een loop over alle pixels van het kleine beeld.
// Pixel (x, y) van het kleine beeld hoort bij het blok dat begint
// bij b[y * g][x * g].
//
// STAP 3a – Linksboven
//   Zet in de loop:  uit[y][x] = b[y * g][x * g];
//   Test: het rechterbeeld is nu een kleine versie van het midden.
//
// STAP 3b – De grootste uit het blok (max pooling)
//   Vervang je regel van 3a door:
//     let grootste = 0;
//     een for-loop over dy van 0 tot g, met daarin een for-loop
//     over dx van 0 tot g. Zet daarin:
//       let waarde = b[y * g + dy][x * g + dx];
//       als waarde groter is dan grootste: grootste = waarde;
//     na de twee loops: uit[y][x] = grootste;
//   Test met toets 2: blijven dunne randen nu beter zichtbaar?
// -------------------------------------------------------------
function pooling(b, g) {
  let hoogte = floor(b.length / g);
  let breedte = floor(b[0].length / g);
  let uit = maakLeegBeeld(breedte, hoogte);
  for (let y = 0; y < hoogte; y++) {
    for (let x = 0; x < breedte; x++) {
      // jouw code
    }
  }
  return uit;
}

// =============================================================
// DEEL 2 – Cijfers herkennen
// =============================================================

// -------------------------------------------------------------
// STAP 4 – Drempel
// Op papier is inkt donker en het papier licht. Het netwerk wil het
// andersom: een wit cijfer (255) op een zwarte achtergrond (0).
// Het kader staat klaar. Zet in de loop:
//   als b[y][x] kleiner is dan grens: uit[y][x] = 255;   (inkt)
//   anders: uit[y][x] = 0;                              (papier)
// -------------------------------------------------------------
function drempel(b, grens) {
  let hoogte = b.length;
  let breedte = b[0].length;
  let uit = maakLeegBeeld(breedte, hoogte);
  for (let y = 0; y < hoogte; y++) {
    for (let x = 0; x < breedte; x++) {
      // jouw code
    }
  }
  return uit;
}

// -------------------------------------------------------------
// STAP 5 – Je eigen netwerk
// Het netwerk leert van 15.000 handgeschreven cijfers.
//
// STAP 5a – Klik op "Train netwerk" en wacht tot het klaar is.
//           Schrijf de accuracy op. Dit netwerk heeft nog GEEN
//           convolutie: elke pixel gaat los het netwerk in.
//
// STAP 5b – Maak er een CNN van. Zet direct onder de regel
//           let model = tf.sequential();
//           deze twee regels:
//   model.add(tf.layers.conv2d({ inputShape: [28, 28, 1], filters: 8, kernelSize: 3, activation: "relu" }));
//   model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
//           en verander de flatten-regel in:
//   model.add(tf.layers.flatten());
//           (inputShape hoort alleen bij de allereerste laag.)
//           Train opnieuw. Wat is de accuracy nu? Bekijk de geleerde
//           filters rechtsonder.
//           conv2d is jouw convolutie en maxPooling2d is jouw pooling.
//           Het verschil: het netwerk leert de getallen in de kernels zelf.
//
// STAP 5c – Experimenteer en schrijf steeds de accuracy op:
//           - filters: 4 of 16 in plaats van 8
//           - epochs = 5 in plaats van 3
//           - nog een conv2d en maxPooling2d erbij (zonder inputShape)
// -------------------------------------------------------------
let epochs = 3;

function maakModel() {
  let model = tf.sequential();
  model.add(tf.layers.flatten({ inputShape: [28, 28, 1] }));
  model.add(tf.layers.dense({ units: 32, activation: "relu" }));
  model.add(tf.layers.dense({ units: 10, activation: "softmax" }));
  return model;
}

// -------------------------------------------------------------
// STAP 6 – Het webcambeeld voorbewerken
// Het webcambeeld moet lijken op de MNIST-plaatjes: een wit cijfer
// op zwart, 28 x 28 pixels. Daarvoor gebruik je jouw functies.
// Haal steeds bij één regel de // weg en kijk bij
// "wat het netwerk ziet" wat er verandert.
//   STAP 6a – blur tegen ruis
//   STAP 6b – drempel: inkt wordt wit, papier zwart
//             (te veel of te weinig wit? probeer een andere grens)
//   STAP 6c – pooling: 196 / 7 = 28 pixels
// -------------------------------------------------------------
function voorbewerking(img) {
  let b = naarGrijs(img);
  // b = convolutie(b, blur);
  // b = drempel(b, 100);
  // b = pooling(b, 7);
  return centreer(b);
}

// =============================================================
// Hieronder hoef je niets te veranderen
// =============================================================

const GROEN = [125, 201, 3];
let deel = 1;
let foto, video, tekenvlak;
let gebruikWebcam = true;
let kernel, kernelNaam = "blur";

let mnistBeeld, labels, xs, ys, model;
let bezig = false;
let status = "Klik op 'Train netwerk' om te beginnen.";
let geschiedenis = [];
let filters = null;
let kansen = null;
let invoer = null;
let bron2 = "webcam";
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

  createCanvas(940, 470).parent("sketch");
  textFont("Work Sans");
  noSmooth();
  foto.resize(300, 300);
  labels = Object.values(labels);
  maakData();

  video = createCapture(VIDEO);
  video.size(400, 300);
  video.hide();
  tekenvlak = createGraphics(196, 196);
  tekenvlak.pixelDensity(1);
  tekenvlak.background(255);

  knoppen2 = createDiv("").parent("sketch").class("knoppen");
  createButton("Train netwerk").parent(knoppen2).mousePressed(train);
  createButton("Webcam").parent(knoppen2).class("tweede").mousePressed(() => (bron2 = "webcam"));
  createButton("Tekenen").parent(knoppen2).class("tweede").mousePressed(() => (bron2 = "tekenen"));
  createButton("Wissen").parent(knoppen2).class("tweede").mousePressed(() => tekenvlak.background(255));

  kernel = blur;
  kiesDeel(1);
}

function kiesDeel(d) {
  deel = d;
  let knop = tabs.elt.children;
  knop[0].className = d === 1 ? "" : "tweede";
  knop[1].className = d === 2 ? "" : "tweede";
  knoppen2.style("display", d === 2 ? "flex" : "none");
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
  let gefilterd = convolutie(beeld, kernel);
  let gepoold = pooling(gefilterd, 10);

  image(naarAfbeelding(beeld), 0, 0);
  image(naarAfbeelding(gefilterd), 320, 0);
  image(naarAfbeelding(gepoold), 640, 0, 300, 300);

  fill(60);
  noStroke();
  textSize(14);
  text(metWebcam ? "webcam" : "foto", 0, 322);
  text("na filter: " + kernelNaam, 320, 322);
  text("na pooling (" + gepoold[0].length + " x " + gepoold.length + ")", 640, 322);
  tekenKernel(320, 340);
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
      text(nf(kernel[r][c], 0, 2).replace(".00", ""), x + c * 46 + 23, y + r * 24 + 12);
    }
  }
  textAlign(LEFT, BASELINE);
}

function keyPressed() {
  if (deel !== 1) return;
  if (key === "1") [kernel, kernelNaam] = [blur, "blur"];
  if (key === "2") [kernel, kernelNaam] = [randenVerticaal, "randen verticaal"];
  if (key === "3") [kernel, kernelNaam] = [randenHorizontaal, "randen horizontaal"];
  if (key === "4") [kernel, kernelNaam] = [eigenFilter, "eigen filter"];
  if (key === "f" || key === "F") gebruikWebcam = !gebruikWebcam;
}

// ---------- Deel 2 ----------

function tekenDeel2() {
  let bron = null;
  if (bron2 === "tekenen") {
    if (mouseIsPressed && mouseX >= 0 && mouseX < 196 && mouseY >= 30 && mouseY < 226) {
      tekenvlak.stroke(0);
      tekenvlak.strokeWeight(14);
      tekenvlak.line(pmouseX, pmouseY - 30, mouseX, mouseY - 30);
    }
    bron = tekenvlak.get();
  } else if (webcamKlaar()) {
    bron = video.get(102, 52, 196, 196);
  }

  if (bron) {
    image(bron, 0, 30);
    if (frameCount % 4 === 0) {
      invoer = voorbewerking(bron);
      if (model && !bezig) kansen = voorspel(invoer);
    }
  }
  noFill();
  stroke(...GROEN);
  strokeWeight(3);
  rect(1, 31, 194, 194);

  if (invoer) image(naarAfbeelding(invoer), 230, 30, 196, 196);
  tekenKansen(460, 30);
  tekenGrafiek(0, 280, 420, 160);
  tekenFilters(460, 280);

  noStroke();
  fill(40);
  textSize(14);
  text(status, 0, 16);
  fill(110);
  textSize(12);
  text(bron2 === "webcam" ? "webcam: houd je cijfer in het groene vak" : "teken een cijfer in het vak", 0, 244);
  text("wat het netwerk ziet (28 x 28)", 230, 244);
}

function maakData() {
  mnistBeeld.loadPixels();
  let n = labels.length;
  let data = new Float32Array(n * 784);
  for (let i = 0; i < n * 784; i++) data[i] = mnistBeeld.pixels[i * 4] / 255;
  xs = tf.tensor4d(data, [n, 28, 28, 1]);
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
    validationSplit: 0.15,
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
  bezig = false;
}

function voorspel(b) {
  return tf.tidy(() => {
    let t = tf.tensor4d(b.flat().map((v) => v / 255), [1, 28, 28, 1]);
    return Array.from(model.predict(t).dataSync());
  });
}

// Zet het cijfer in het midden en maak het 20 x 20 groot, net als in MNIST.
// De buitenste rand slaan we over: daar kan de convolutie niets mee.
function centreer(b) {
  let hoogte = b.length;
  let breedte = b[0].length;
  let minX = breedte, minY = hoogte, maxX = -1, maxY = -1;
  for (let y = 1; y < hoogte - 1; y++) {
    for (let x = 1; x < breedte - 1; x++) {
      if (b[y][x] > 128) {
        minX = min(minX, x);
        maxX = max(maxX, x);
        minY = min(minY, y);
        maxY = max(maxY, y);
      }
    }
  }
  let uit = maakLeegBeeld(28, 28);
  if (maxX < 0) return uit;
  let schaal = 20 / max(maxX - minX + 1, maxY - minY + 1);
  let midX = (minX + maxX + 1) / 2;
  let midY = (minY + maxY + 1) / 2;
  for (let y = 0; y < 28; y++) {
    for (let x = 0; x < 28; x++) {
      let bx = floor(midX + (x + 0.5 - 14) / schaal);
      let by = floor(midY + (y + 0.5 - 14) / schaal);
      if (bx >= minX && bx <= maxX && by >= minY && by <= maxY) uit[y][x] = b[by][bx];
    }
  }
  return verschuifNaarZwaartepunt(uit);
}

// MNIST zet het zwaartepunt van het cijfer precies in het midden
function verschuifNaarZwaartepunt(b) {
  let som = 0, sx = 0, sy = 0;
  for (let y = 0; y < 28; y++) {
    for (let x = 0; x < 28; x++) {
      som += b[y][x];
      sx += x * b[y][x];
      sy += y * b[y][x];
    }
  }
  if (som === 0) return b;
  let dx = round(13.5 - sx / som);
  let dy = round(13.5 - sy / som);
  let uit = maakLeegBeeld(28, 28);
  for (let y = 0; y < 28; y++) {
    for (let x = 0; x < 28; x++) {
      let bx = x - dx;
      let by = y - dy;
      if (bx >= 0 && bx < 28 && by >= 0 && by < 28) uit[y][x] = b[by][bx];
    }
  }
  return uit;
}

function tekenKansen(x, y) {
  noStroke();
  fill(40);
  textSize(14);
  text("voorspelling", x, y - 10);
  if (!kansen) {
    fill(130);
    textSize(13);
    text(model ? "..." : "Train eerst je netwerk.", x, y + 20);
    return;
  }
  let beste = kansen.indexOf(max(kansen));
  for (let i = 0; i < 10; i++) {
    let yy = y + i * 19;
    fill(i === beste ? 30 : 120);
    textSize(14);
    text(i, x, yy + 14);
    fill(238);
    rect(x + 20, yy + 2, 300, 15, 3);
    fill(...(i === beste ? GROEN : [180, 180, 180]));
    rect(x + 20, yy + 2, 300 * kansen[i], 15, 3);
    fill(90);
    textSize(11);
    text(nf(100 * kansen[i], 0, 0) + "%", x + 328, yy + 14);
  }
  fill(30);
  textSize(48);
  text(beste, x + 380, y + 120);
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
    textSize(13);
    text(model && !bezig ? "Je netwerk heeft (nog) geen conv2d-laag." : "", x, y + 20);
    return;
  }
  let kh = filters.length;
  let kw = filters[0].length;
  let aantal = filters[0][0][0].length;
  let cel = 16;
  for (let f = 0; f < aantal; f++) {
    let waarden = [];
    for (let r = 0; r < kh; r++) for (let c = 0; c < kw; c++) waarden.push(filters[r][c][0][f]);
    let grootste = max(waarden.map(abs));
    let fx = x + (f % 8) * (kw * cel + 10);
    let fy = y + floor(f / 8) * (kh * cel + 10);
    for (let r = 0; r < kh; r++) {
      for (let c = 0; c < kw; c++) {
        fill(map(filters[r][c][0][f], -grootste, grootste, 0, 255));
        rect(fx + c * cel, fy + r * cel, cel, cel);
      }
    }
  }
}

// ---------- Beelden ----------

function maakLeegBeeld(breedte, hoogte) {
  let b = [];
  for (let y = 0; y < hoogte; y++) {
    b.push(new Array(breedte).fill(0));
  }
  return b;
}

// p5-afbeelding (of camerabeeld) naar een lijst van rijen met grijswaarden
function naarGrijs(img) {
  img.loadPixels();
  let b = maakLeegBeeld(img.width, img.height);
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let i = 4 * (y * img.width + x);
      b[y][x] = round((img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3);
    }
  }
  return b;
}

// Lijst van rijen met grijswaarden naar p5-afbeelding
function naarAfbeelding(b) {
  let img = createImage(b[0].length, b.length);
  img.loadPixels();
  for (let y = 0; y < b.length; y++) {
    for (let x = 0; x < b[0].length; x++) {
      let i = 4 * (y * img.width + x);
      let v = constrain(abs(b[y][x]), 0, 255);
      img.pixels[i] = v;
      img.pixels[i + 1] = v;
      img.pixels[i + 2] = v;
      img.pixels[i + 3] = 255;
    }
  }
  img.updatePixels();
  return img;
}
