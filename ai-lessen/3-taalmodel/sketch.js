// =============================================================
// Project 3 – Je eigen taalbot
//
// Je bot leest Wikipedia-artikelen over jouw onderwerp. Daarna kan
// hij jouw zinnen afmaken en het volgende woord voorspellen.
//
// Alle woorden uit de artikelen staan op volgorde in de lijst woorden:
//   woorden[0] is het eerste woord, woorden[1] het tweede, enzovoort.
//   Leestekens (. , ! ?) tellen ook als woord.
//
// n is het aantal woorden dat de bot terugkijkt (de context):
//   n = 1: na "de" komt ...
//   n = 2: na "de tour" komt ...
// =============================================================

// Kies je onderwerp: zet hier de titels van Wikipedia-artikelen,
// precies zoals ze op nl.wikipedia.org staan.
// Hoe meer woorden, hoe beter je bot. Kijk op de pagina bij
// "Hoeveel woorden heb je nodig?".
let artikelen = [
  "Wielersport",
  "Ronde van Frankrijk",
  "Ronde van Italië",
  "Ronde van Spanje",
  "Ronde van Vlaanderen",
  "Parijs-Roubaix",
  "Amstel Gold Race",
  "Eddy Merckx",
  "Mathieu van der Poel",
  "Wout van Aert",
  "Tadej Pogačar",
  "Demi Vollering",
];

let woorden = [];
let n = 1;

// =============================================================
// LES 1
// =============================================================

// -------------------------------------------------------------
// STAP 1 – Tellen
// Hoe vaak staat woord in lijst?
//   1. Maak een variabele aantal = 0.
//   2. Maak een for-loop over de lijst (i van 0 tot lijst.length).
//   3. Als lijst[i] gelijk is aan woord (===): aantal = aantal + 1;
//   4. Na de loop: return aantal;
// Test: typ een woord bij "Onderzoek een woord" op de pagina.
// Je ziet dan hoe vaak het in de artikelen staat.
// -------------------------------------------------------------
function tel(lijst, woord) {
  return 0; // vervang dit door jouw code
}

// -------------------------------------------------------------
// STAP 2 – Wat komt erna?
// context is een lijst met de laatste woorden, bijvoorbeeld ["de"].
// In les 1 kijken we alleen naar het eerste woord: context[0].
// Maak een lijst met alle woorden die in de tekst NA dat woord komen.
//   1. Maak een lege lijst: let opties = [];
//   2. Maak een for-loop met i van 0 tot woorden.length - 1.
//   3. Als woorden[i] gelijk is aan context[0]:
//        opties.push(woorden[i + 1]);
//   4. Na de loop: return opties;
// Komt een woord vaak na "de", dan staat het dus ook vaak in opties.
// Test: bij "Onderzoek een woord" zie je nu ook wat erna komt.
// -------------------------------------------------------------
function volgendeWoorden(context) {
  return []; // vervang dit door jouw code
}

// -------------------------------------------------------------
// STAP 3 – Een volgend woord kiezen
// Kies een willekeurig woord uit de opties. Woorden die vaak in de
// lijst staan, hebben vanzelf meer kans!
//   1. let opties = volgendeWoorden(context);
//   2. Als opties.length gelijk is aan 0: return "";
//      (dan weet de bot niet verder)
//   3. Kies een willekeurige plek: let plek = floor(random(opties.length));
//   4. return opties[plek];
// -------------------------------------------------------------
function kiesVolgend(context) {
  return ""; // vervang dit door jouw code
}

// -------------------------------------------------------------
// STAP 4 – Een zin afmaken
// zin is een lijst met de woorden die er al staan, bijvoorbeeld
// ["de", "tour"]. Jij plakt er steeds een woord achter.
//   1. Maak een for-loop die aantal keer herhaalt.
//   2. Zet in de loop:
//        let context = laatsteWoorden(zin, n);   (staat onderaan klaar)
//        let volgend = kiesVolgend(context);
//   3. Als volgend gelijk is aan "": stop de loop met break;
//   4. Anders: zin.push(volgend);
//   5. Na de loop: return zin;
// Test: typ het begin van een zin in de chat en druk op Enter.
// -------------------------------------------------------------
function genereer(zin, aantal) {
  return zin; // vervang dit door jouw code
}

// =============================================================
// LES 2
// =============================================================

// -------------------------------------------------------------
// STAP 5 – Meer context
// Nu kijkt de bot n woorden terug. context bevat dan n woorden,
// bijvoorbeeld ["de", "tour"] als n = 2.
//
// STAP 5a – n = 2 (op papier of als test)
//   Bij n = 2 zoek je plekken i waar woorden[i] gelijk is aan context[0]
//   EN woorden[i + 1] gelijk is aan context[1]. Het volgende woord
//   is dan woorden[i + 2]. Schrijf deze if eerst op papier.
//
// STAP 5b – Elke n
//   Pas volgendeWoorden aan zodat het voor elke n werkt:
//   1. De loop loopt nu met i van 0 tot woorden.length - n.
//   2. Maak in de loop een variabele: let klopt = true;
//   3. Maak een tweede loop met j van 0 tot n:
//        als woorden[i + j] niet gelijk is aan context[j] (!==):
//          klopt = false;
//   4. Na de tweede loop: als klopt nog true is:
//        opties.push(woorden[i + n]);
//   Test: zet de schuif bij "context n" op 2 en 3.
//   Wanneer gaat de bot letterlijk zinnen uit Wikipedia overnemen?
// -------------------------------------------------------------

// -------------------------------------------------------------
// STAP 6 – Autocomplete
// Onder de chat verschijnen de 3 woorden die het vaakst na jouw
// laatste woorden komen.
//
// STAP 6a – meestVoorkomend(opties, alGekozen)
//   Zoek het woord dat het vaakst in opties staat, maar sla woorden
//   over die al in alGekozen staan.
//   1. let beste = "";  en  let besteAantal = 0;
//   2. Maak een for-loop over opties. Zet in de loop:
//        let woord = opties[i];
//   3. Als tel(alGekozen, woord) gelijk is aan 0 (nog niet gekozen):
//        let aantal = tel(opties, woord);
//        als aantal groter is dan besteAantal:
//          beste = woord;  en  besteAantal = aantal;
//   4. Na de loop: return beste;
//
// STAP 6b – top3(context)
//   1. let opties = volgendeWoorden(context);
//   2. let gekozen = [];
//   3. Maak een for-loop die 3 keer herhaalt. Zet daarin:
//        let woord = meestVoorkomend(opties, gekozen);
//        als woord niet gelijk is aan "": gekozen.push(woord);
//   4. Na de loop: return gekozen;
// Test: typ in de chat. Klik op een suggestie om hem toe te voegen.
// -------------------------------------------------------------
function meestVoorkomend(opties, alGekozen) {
  return ""; // vervang dit door jouw code
}

function top3(context) {
  return []; // vervang dit door jouw code
}

// =============================================================
// Hieronder hoef je niets te veranderen
// =============================================================

let taal = "nl";
let invoer, suggesties, chat, info, richtlijn, uitkomst, zoekveld;

// Vuistregel: per extra woord context heb je ongeveer 10 keer zoveel tekst nodig
const NODIG = [0, 2000, 20000, 200000, 2000000];

// Geeft de laatste n woorden van zin terug, bijvoorbeeld ["de", "tour"]
function laatsteWoorden(zin, aantal) {
  return zin.slice(Math.max(zin.length - aantal, 0));
}

// Knipt tekst in woorden en leestekens, in kleine letters
function maakTokens(tekst) {
  return tekst.toLowerCase().match(/[\p{L}\p{N}]+|[.,!?]/gu) || [];
}

function setup() {
  noCanvas();
  info = createP("Artikelen ophalen van Wikipedia...").parent("sketch").class("info");
  haalArtikelenOp().then(start);
}

// Haalt elk artikel op via de Wikipedia-API als platte tekst
async function haalArtikelenOp() {
  let tekst = "";
  let gelukt = [];
  let mislukt = [];
  for (let titel of artikelen) {
    let url =
      "https://" + taal + ".wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1" +
      "&redirects=1&format=json&formatversion=2&origin=*&titles=" + encodeURIComponent(titel);
    try {
      let antwoord = await fetch(url);
      let data = await antwoord.json();
      let pagina = data.query.pages[0];
      if (pagina.missing || !pagina.extract) throw new Error("niet gevonden");
      let regels = pagina.extract.split("\n").filter((r) => r.trim() !== "" && !r.startsWith("=="));
      tekst += " " + regels.join(" ");
      gelukt.push(pagina.title);
    } catch (e) {
      mislukt.push(titel);
    }
  }
  return { tekst, gelukt, mislukt };
}

function start(resultaat) {
  woorden = maakTokens(resultaat.tekst);
  let tekst = "Geladen: " + resultaat.gelukt.join(", ") + ".";
  if (resultaat.mislukt.length > 0) tekst += " Niet gevonden: " + resultaat.mislukt.join(", ") + ".";
  info.html(tekst);

  createElement("h3", "Hoeveel woorden heb je nodig?").parent("sketch");
  richtlijn = createElement("table").parent("sketch").class("richtlijn");

  createElement("h3", "Onderzoek een woord").parent("sketch");
  let rij0 = createDiv("").parent("sketch").class("onderzoek");
  zoekveld = createInput("").parent(rij0).attribute("placeholder", "bijvoorbeeld: tour");
  zoekveld.input(onderzoek);
  uitkomst = createDiv("Typ een woord.").parent("sketch").class("uitkomst");

  createElement("h3", "Chat met je bot").parent("sketch");
  let instellingen = createDiv("").parent("sketch").class("instellingen");
  createSpan("context n").parent(instellingen);
  let nSlider = createSlider(1, 4, 1).parent(instellingen);
  let nLabel = createSpan("1").parent(instellingen).class("waarde");
  nSlider.input(() => {
    n = nSlider.value();
    nLabel.html(n);
    toonRichtlijn();
    toonSuggesties();
  });

  chat = createDiv("").parent("sketch").class("chat");
  bericht("bot", "Hoi! Begin een zin, dan maak ik hem af. Of klik op 'Verras me'.");

  let rij = createDiv("").parent("sketch").class("invoerrij");
  invoer = createInput("").parent(rij).attribute("placeholder", "Typ het begin van een zin...");
  invoer.input(toonSuggesties);
  invoer.elt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") praat();
  });
  createButton("Maak af").parent(rij).mousePressed(praat);
  createButton("Verras me").parent(rij).class("tweede").mousePressed(verras);
  suggesties = createDiv("").parent("sketch").class("suggesties");

  toonRichtlijn();
}

function toonRichtlijn() {
  let html = "<tr><th>context n</th><th>vuistregel</th><th>jij hebt " + woorden.length.toLocaleString("nl") + " woorden</th></tr>";
  for (let i = 1; i <= 4; i++) {
    let genoeg = woorden.length >= NODIG[i];
    html +=
      "<tr" + (i === n ? ' class="nu"' : "") + "><td>" + i + "</td><td>vanaf ongeveer " +
      NODIG[i].toLocaleString("nl") + " woorden</td><td class='" + (genoeg ? "ok'>genoeg" : "nietok'>te weinig, de bot gaat kopiëren") +
      "</td></tr>";
  }
  richtlijn.html(html);
}

function onderzoek() {
  let woord = maakTokens(zoekveld.value())[0];
  if (!woord) {
    uitkomst.html("Typ een woord.");
    return;
  }
  let opties = volgendeWoorden([woord]);
  let html = "<b>" + woord + "</b> komt " + tel(woorden, woord) + " keer voor.";
  if (opties.length > 0) {
    html += "<br>Daarna komt (" + opties.length + " keer): " + opties.slice(0, 40).join(", ") + (opties.length > 40 ? ", ..." : "");
  }
  uitkomst.html(html);
}

function praat() {
  let tekst = invoer.value().trim();
  if (tekst === "") return;
  bericht("jij", tekst);
  let zin = genereer(maakTokens(tekst), 40);
  bericht("bot", zin.join(" ") || "(ik weet niet hoe ik verder moet)");
  invoer.value("");
  toonSuggesties();
}

function verras() {
  let i = floor(random(max(woorden.length - n, 1)));
  let zin = genereer(woorden.slice(i, i + n), 40);
  bericht("bot", zin.join(" ") || "(nog geen tekst)");
}

function bericht(wie, tekst) {
  createDiv("").parent(chat).class("bubbel " + wie).html(tekst.replace(/</g, "&lt;"));
  chat.elt.scrollTop = chat.elt.scrollHeight;
}

// Laat de drie meest waarschijnlijke volgende woorden zien als knopjes
function toonSuggesties() {
  suggesties.html("");
  let tokens = maakTokens(invoer.value());
  if (tokens.length < n) return;
  for (let woord of top3(laatsteWoorden(tokens, n))) {
    createButton(woord).parent(suggesties).class("chip").mousePressed(() => {
      invoer.value(invoer.value().replace(/\s*$/, " ") + woord + " ");
      invoer.elt.focus();
      toonSuggesties();
    });
  }
}
