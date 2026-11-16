// =============================================================
// Project 3 – Je eigen taalbot
//
// Lees eerst de uitleg op de webpagina: hoe je bot tekst ziet, wat
// context is en hoe hij tekst genereert.
//
// HOE ZIET DE TEKST ERUIT IN DE CODE?
// Alle woorden uit de artikelen staan op volgorde in de lijst woorden.
//   woorden[0] is het eerste woord, woorden[1] het tweede, enzovoort.
//   woorden.length is het aantal woorden.
//   Alles staat in kleine letters. Leestekens (. , ! ?) tellen ook
//   als woord.
// Op de pagina zie je onder "Zo ziet je bot de tekst" de eerste
// woorden met hun plek in de lijst.
//
// Een context is een lijst met de laatste woorden van de tekst, zoals
// ["tour"] of ["de", "tour"]. contextLengte is het aantal woorden in
// de context. Die stel je in met de schuif op de pagina.
// =============================================================

// Je onderwerp: de titels van Wikipedia-artikelen, precies zoals ze
// op nl.wikipedia.org staan. Begin met dit voorbeeld over wielrennen
// (ongeveer 200.000 woorden). Als je klaar bent, kies je je eigen
// onderwerp.
let artikelen = [
  "Wielersport",
  "Veldrijden",
  "Baanwielrennen",
  "Wereldkampioenschappen wielrennen",
  "Ronde van Frankrijk",
  "Ronde van Italië",
  "Ronde van Spanje",
  "Ronde van Vlaanderen",
  "Parijs-Roubaix",
  "Milaan-San Remo",
  "Luik-Bastenaken-Luik",
  "Amstel Gold Race",
  "Fausto Coppi",
  "Jacques Anquetil",
  "Rik Van Looy",
  "Eddy Merckx",
  "Joop Zoetemelk",
  "Bernard Hinault",
  "Marco Pantani",
  "Mario Cipollini",
  "Johan Museeuw",
  "Jan Ullrich",
  "Lance Armstrong",
  "Michael Boogerd",
  "Erik Dekker",
  "Paolo Bettini",
  "Alberto Contador",
  "Cadel Evans",
  "Bradley Wiggins",
  "Alejandro Valverde",
  "Fabian Cancellara",
  "Tom Boonen",
  "Vincenzo Nibali",
  "Chris Froome",
  "Mark Cavendish",
  "Peter Sagan",
  "Greg Van Avermaet",
  "Niki Terpstra",
  "Bauke Mollema",
  "Steven Kruijswijk",
  "Tom Dumoulin",
  "Nairo Quintana",
  "Thibaut Pinot",
  "Thomas De Gendt",
  "Tim Wellens",
  "Victor Campenaerts",
  "Julian Alaphilippe",
  "Primož Roglič",
  "Sven Nys",
  "Zdeněk Štybar",
  "Dylan Groenewegen",
  "Fabio Jakobsen",
  "Mathieu van der Poel",
  "Wout van Aert",
  "Jonas Vingegaard",
  "Tadej Pogačar",
  "Remco Evenepoel",
  "Jasper Philipsen",
  "Tom Pidcock",
  "Eli Iserbyt",
  "Arnaud De Lie",
  "Leontien van Moorsel",
  "Marianne Vos",
  "Kirsten Wild",
  "Ellen van Dijk",
  "Anna van der Breggen",
  "Annemiek van Vleuten",
  "Lotte Kopecky",
  "Demi Vollering",
  "Fem van Empel",
];

// =============================================================
// Tekst genereren (praktijkles 5)
// Praktijkles 6 gebruik je om alles af te maken, je bot te
// onderzoeken en je logboek in te vullen.
// =============================================================

// -------------------------------------------------------------
// STAP 1 – Tellen
// Deze functie telt hoe vaak woord in lijst staat. Nu geeft hij
// altijd 0. Ga met een for-loop langs de hele lijst. Is het woord op
// plek i gelijk aan woord? Tel dan 1 op bij aantal.
//
// Test: typ een woord bij "Onderzoek je tekst", bijvoorbeeld tour.
// Je ziet hoe vaak het in de artikelen staat.
//
// UITLEG – Je bot weet niets van de betekenis van woorden. Hij kan
// alleen tellen. Toch is tellen de basis van je hele taalmodel.
// -------------------------------------------------------------
function tel(lijst, woord) {
  let aantal = 0;
  // jouw code
  return aantal;
}

// -------------------------------------------------------------
// STAP 2 – Wat komt erna?
// Bekijk eerst het plaatje "Wat komt erna?" op de pagina.
// Deze functie maakt een lijst met alle woorden die in de tekst NA de
// context komen.
//
// Het lastigste deel staat al klaar: de hulpfunctie
// pastOpPlek(plek, context) geeft true als de context in woorden
// staat vanaf die plek, en anders false.
//
// Ga met een for-loop langs alle plekken in woorden. Past de context
// op een plek? Dan zet je het woord direct na de context in opties.
// De context is contextLengte woorden lang, dus dat woord staat op
// plek + contextLengte. Stop op tijd: na het laatste stukje tekst
// komt geen woord meer. Gebruik dit raamwerk:
//     for (let plek = 0; plek < woorden.length - contextLengte; plek++) {
//       if (___) {
//         opties.push(___);
//       }
//     }
//
// Test: bij "Onderzoek je tekst" zie je nu ook wat er na je woord komt.
// Zet de schuif op 2 en typ twee woorden, bijvoorbeeld "de ronde".
//
// UITLEG – opties is een lijst met mogelijke volgende woorden. Hoe
// vaker een woord erin staat, hoe vaker het in de tekst na de context
// kwam. Zo heeft je bot geleerd wat waarschijnlijk is.
// -------------------------------------------------------------
function volgendeWoorden(context) {
  let opties = [];
  // jouw code
  return opties;
}

// -------------------------------------------------------------
// STAP 3 – Een volgend woord kiezen
// Kies één woord uit de opties van STAP 2:
// - Zijn er geen opties? Dan weet de bot niet verder: geef GEEN_WOORD
//   terug.
// - Anders kies je een willekeurige plek in opties. Een willekeurig
//   heel getal van 0 tot opties.length krijg je met
//   floor(random(opties.length)). Geef het woord op die plek terug.
//
// Test: bij "Onderzoek je tekst" staat nu een woord achter "Gok van je
// bot". Typ steeds hetzelfde woord opnieuw: de gok verandert.
//
// UITLEG – Je kiest willekeurig, maar woorden die vaak in opties
// staan, hebben meer kans. Daardoor kiest je bot meestal een woord dat
// past, maar niet elke keer hetzelfde.
// -------------------------------------------------------------
function kiesVolgend(context) {
  return GEEN_WOORD; // vervang dit door jouw code
}

// -------------------------------------------------------------
// STAP 4 – Een woord toevoegen
// Bekijk eerst het plaatje "Tekst genereren" op de pagina.
// tekst is een lijst met de woorden die de bot al heeft geschreven.
// Deze functie zet er één woord achter. Doe daarvoor drie dingen:
// - Haal de context op: de laatste woorden van de tekst. Dat doet de
//   hulpfunctie laatsteWoorden(tekst, contextLengte).
// - Kies met die context een volgend woord (STAP 3).
// - Is dat woord niet GEEN_WOORD? Zet het dan met push achter de tekst.
// De knop "Genereer tekst" roept deze functie steeds opnieuw aan, tot
// de tekst lang genoeg is.
//
// Test: klik op "Genereer tekst". De bot schrijft een stuk tekst.
//
// UITLEG – Je bot kijkt steeds alleen naar de laatste woorden en
// vergeet de rest. Daarom klopt elk stukje, maar dwaalt de hele tekst
// vaak af.
// -------------------------------------------------------------
function voegWoordToe(tekst) {
  // jouw code
}

// -------------------------------------------------------------
// KLAAR? Onderzoek je bot
// - Klik een paar keer op "Genereer tekst" bij contextLengte 1 tot en
//   met 5. Oranje woorden: daar had de bot maar één keuze en kopieert
//   hij letterlijk uit Wikipedia. Wanneer worden het er veel? Kijk ook
//   in de tabel "Hoeveel woorden heb je nodig?".
// - Kies je eigen onderwerp: zet bovenaan de titels van artikelen over
//   iets wat jij leuk vindt. Kies artikelen met veel tekst.
// - Beantwoord de vragen in LOGBOEK.md.
// -------------------------------------------------------------

// =============================================================
// Hieronder hoef je niets te veranderen
// =============================================================

// ---------- Constanten ----------
const GEEN_WOORD = "";            // de bot weet geen volgend woord
const WOORDEN_PER_TEKST = 50;     // zoveel woorden schrijft de bot per keer
const MAX_CONTEXT = 5;            // de schuif gaat van 1 tot 5
const TAAL = "nl";                // nl.wikipedia.org
const TEGELIJK_OPHALEN = 5;       // zoveel artikelen tegelijk ophalen
const KLEUR_GEKOPIEERD = "#fde3c4"; // oranje: de bot had maar één keuze

// Vuistregel: per extra woord context heb je ongeveer 10 keer zoveel
// tekst nodig. WOORDEN_NODIG[2] is het aantal voor contextLengte 2.
const WOORDEN_NODIG = [0, 2000, 20000, 200000, 2000000, 20000000];

// ---------- Data en instellingen ----------
let woorden = [];               // alle woorden uit de artikelen, op volgorde
let contextLengte = 1;          // stel je in met de schuif

// ---------- Hulpfuncties ----------

// Geeft true als de context in woorden staat vanaf plek, anders false
function pastOpPlek(plek, context) {
  for (let i = 0; i < context.length; i++) {
    if (woorden[plek + i] !== context[i]) {
      return false;
    }
  }
  return true;
}

// Telt hoeveel verschillende woorden er in opties staan
function aantalVerschillend(opties) {
  return new Set(opties).size;
}

// Geeft de laatste woorden van tekst terug, bijvoorbeeld ["de", "tour"]
function laatsteWoorden(tekst, aantal) {
  return tekst.slice(Math.max(tekst.length - aantal, 0));
}

// Knipt tekst in woorden en leestekens, in kleine letters
function maakTokens(tekst) {
  return tekst.toLowerCase().match(/[\p{L}\p{N}]+|[.,!?]/gu) || [];
}

// Zet een woord netjes op het scherm: geen spatie voor een leesteken
// en een hoofdletter aan het begin van een zin
function alsTekst(woord, vorige) {
  if ([".", ",", "!", "?"].includes(woord)) return woord;
  if (vorige === undefined || [".", "!", "?"].includes(vorige)) woord = woord.charAt(0).toUpperCase() + woord.slice(1);
  return " " + woord;
}

// ---------- Scherm ----------
let info, tekstlijst, zoekveld, uitkomst, richtlijn, uitvoer, samenvatting, knop;

function setup() {
  noCanvas();
  info = createP("Artikelen ophalen van Wikipedia...").parent("sketch").class("info");
  haalArtikelenOp().then(start);
}

// Haalt de artikelen op via de Wikipedia-API, een paar tegelijk
async function haalArtikelenOp() {
  let teksten = [];
  let gelukt = [];
  let mislukt = [];
  for (let begin = 0; begin < artikelen.length; begin += TEGELIJK_OPHALEN) {
    info.html("Artikelen ophalen van Wikipedia... " + begin + " van " + artikelen.length);
    let groep = artikelen.slice(begin, begin + TEGELIJK_OPHALEN);
    let resultaten = await Promise.all(groep.map(haalArtikelOp));
    for (let i = 0; i < groep.length; i++) {
      if (resultaten[i] === null) mislukt.push(groep[i]);
      else {
        teksten.push(resultaten[i].tekst);
        gelukt.push(resultaten[i].titel);
      }
    }
  }
  return { tekst: teksten.join(" "), gelukt, mislukt };
}

async function haalArtikelOp(titel) {
  let url =
    "https://" + TAAL + ".wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1" +
    "&redirects=1&format=json&formatversion=2&origin=*&titles=" + encodeURIComponent(titel);
  try {
    let antwoord = await fetch(url);
    let data = await antwoord.json();
    let pagina = data.query.pages[0];
    if (pagina.missing || !pagina.extract) return null;
    let regels = pagina.extract.split("\n").filter((r) => r.trim() !== "" && !r.startsWith("=="));
    return { titel: pagina.title, tekst: regels.join(" ") };
  } catch (e) {
    return null;
  }
}

function start(resultaat) {
  woorden = maakTokens(resultaat.tekst);
  let tekst = resultaat.gelukt.length + " artikelen geladen (" + woorden.length.toLocaleString("nl") + " woorden).";
  if (resultaat.gelukt.length === 0) tekst = "Er zijn geen artikelen geladen. Controleer je internetverbinding en de titels in artikelen.";
  if (resultaat.mislukt.length > 0) tekst += " Niet gevonden: " + resultaat.mislukt.join(", ") + ".";
  info.html(tekst);

  createElement("h3", "Zo ziet je bot de tekst").parent("sketch");
  tekstlijst = createDiv("").parent("sketch").class("uitkomst");
  toonTekstlijst();

  let instellingen = createDiv("").parent("sketch").class("instellingen");
  createSpan("contextLengte").parent(instellingen);
  let schuif = createSlider(1, MAX_CONTEXT, 1).parent(instellingen);
  let schuifWaarde = createSpan("1").parent(instellingen).class("waarde");
  schuif.input(() => {
    contextLengte = schuif.value();
    schuifWaarde.html(contextLengte);
    toonRichtlijn();
    onderzoek();
  });

  createElement("h3", "Onderzoek je tekst").parent("sketch");
  let rij = createDiv("").parent("sketch").class("onderzoek");
  zoekveld = createInput("").parent(rij).attribute("placeholder", "bijvoorbeeld: tour");
  zoekveld.input(onderzoek);
  uitkomst = createDiv("").parent("sketch").class("uitkomst");

  createElement("h3", "Genereer tekst").parent("sketch");
  knop = createButton("Genereer tekst").parent("sketch").mousePressed(genereerTekst);
  uitvoer = createDiv("Klik op de knop. De bot begint met een stukje echte tekst (grijs) en schrijft dan zelf verder.")
    .parent("sketch").class("uitkomst").style("margin-top", "12px").style("font-size", "16px");
  samenvatting = createP("").parent("sketch").class("info");

  createElement("h3", "Hoeveel woorden heb je nodig?").parent("sketch");
  richtlijn = createElement("table").parent("sketch").class("richtlijn");

  toonRichtlijn();
  onderzoek();
}

// Kiest een willekeurig begin van een zin in de tekst en laat de bot
// daarna steeds een woord toevoegen
function genereerTekst() {
  let begin = floor(random(max(woorden.length - contextLengte, 1)));
  for (let i = begin; i < woorden.length - contextLengte - 1; i++) {
    if (woorden[i] === ".") {
      begin = i + 1;
      break;
    }
  }
  let tekst = woorden.slice(begin, begin + contextLengte);
  let keuzes = [];
  for (let i = 0; i < WOORDEN_PER_TEKST; i++) {
    let lengte = tekst.length;
    let context = laatsteWoorden(tekst, contextLengte);
    voegWoordToe(tekst);
    if (tekst.length === lengte) break;
    keuzes.push(aantalVerschillend(volgendeWoorden(context)));
  }
  toonTekst(tekst, contextLengte, keuzes);
}

function toonTekst(tekst, vast, keuzes) {
  let html = "";
  let eenKeuze = 0;
  for (let i = 0; i < tekst.length; i++) {
    let stukje = alsTekst(tekst[i], tekst[i - 1]).replace(/</g, "&lt;");
    if (i < vast) html += '<span style="color:#999">' + stukje + "</span>";
    else if (keuzes[i - vast] === 1) {
      html += '<span style="background:' + KLEUR_GEKOPIEERD + '">' + stukje + "</span>";
      eenKeuze++;
    } else html += stukje;
  }
  uitvoer.html(html);
  let nieuw = tekst.length - vast;
  if (nieuw === 0) {
    samenvatting.html("De bot heeft nog geen woorden toegevoegd. Is STAP 4 af?");
  } else {
    samenvatting.html(nieuw + " woorden geschreven. Oranje: maar één keuze, de bot kopieert (" + eenKeuze + " van de " + nieuw + " woorden).");
  }
}

function toonTekstlijst() {
  let html = "";
  for (let i = 0; i < min(60, woorden.length); i++) {
    html += '<span style="display:inline-block;margin:2px 8px 2px 0"><small style="color:#999">' + i + "</small> " + woorden[i] + "</span>";
  }
  tekstlijst.html(html + " ...");
}

function toonRichtlijn() {
  let html = "<tr><th>contextLengte</th><th>vuistregel</th><th>jij hebt " + woorden.length.toLocaleString("nl") + " woorden</th></tr>";
  for (let i = 1; i <= MAX_CONTEXT; i++) {
    let genoeg = woorden.length >= WOORDEN_NODIG[i];
    html +=
      "<tr" + (i === contextLengte ? ' class="nu"' : "") + "><td>" + i + "</td><td>vanaf ongeveer " +
      WOORDEN_NODIG[i].toLocaleString("nl") + " woorden</td><td class='" +
      (genoeg ? "ok'>genoeg" : "nietok'>te weinig, de bot gaat kopiëren") + "</td></tr>";
  }
  richtlijn.html(html);
}

function onderzoek() {
  let tokens = maakTokens(zoekveld.value());
  if (tokens.length === 0) {
    uitkomst.html("Typ een woord. Bij een grotere contextLengte typ je meer woorden.");
    return;
  }
  let laatste = tokens[tokens.length - 1];
  let html = "<b>" + laatste + "</b> komt " + tel(woorden, laatste) + " keer voor.";
  if (tokens.length < contextLengte) {
    uitkomst.html(html + "<br>Typ minstens " + contextLengte + " woorden om te zien wat erna komt.");
    return;
  }
  let context = laatsteWoorden(tokens, contextLengte);
  let opties = volgendeWoorden(context);
  html += "<br>Opties na <b>" + context.join(" ") + "</b> (" + opties.length + "): " + kort(opties);
  html += "<br>Verschillende woorden: " + aantalVerschillend(opties);
  let gok = kiesVolgend(context);
  html += "<br>Gok van je bot: " + (gok === GEEN_WOORD ? "(geen woord)" : "<b>" + gok + "</b>");
  uitkomst.html(html);
}

// Laat de eerste 30 woorden van een lijst zien
function kort(lijst) {
  if (lijst.length === 0) return "niets";
  return lijst.slice(0, 30).join(", ") + (lijst.length > 30 ? ", ..." : "");
}