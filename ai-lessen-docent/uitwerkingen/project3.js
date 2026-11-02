function tel(lijst, woord) {
  let aantal = 0;
  for (let i = 0; i < lijst.length; i++) {
    if (lijst[i] === woord) {
      aantal = aantal + 1;
    }
  }
  return aantal;
}

// Versie van les 2 (STAP 5b), werkt voor elke n
function volgendeWoorden(context) {
  let opties = [];
  for (let i = 0; i < woorden.length - n; i++) {
    let klopt = true;
    for (let j = 0; j < n; j++) {
      if (woorden[i + j] !== context[j]) {
        klopt = false;
      }
    }
    if (klopt) {
      opties.push(woorden[i + n]);
    }
  }
  return opties;
}

function kiesVolgend(context) {
  let opties = volgendeWoorden(context);
  if (opties.length === 0) {
    return "";
  }
  let plek = floor(random(opties.length));
  return opties[plek];
}

function genereer(zin, aantal) {
  for (let i = 0; i < aantal; i++) {
    let context = laatsteWoorden(zin, n);
    let volgend = kiesVolgend(context);
    if (volgend === "") {
      break;
    }
    zin.push(volgend);
  }
  return zin;
}

function meestVoorkomend(opties, alGekozen) {
  let beste = "";
  let besteAantal = 0;
  for (let i = 0; i < opties.length; i++) {
    let woord = opties[i];
    if (tel(alGekozen, woord) === 0) {
      let aantal = tel(opties, woord);
      if (aantal > besteAantal) {
        beste = woord;
        besteAantal = aantal;
      }
    }
  }
  return beste;
}

function top3(context) {
  let opties = volgendeWoorden(context);
  let gekozen = [];
  for (let i = 0; i < 3; i++) {
    let woord = meestVoorkomend(opties, gekozen);
    if (woord !== "") {
      gekozen.push(woord);
    }
  }
  return gekozen;
}
