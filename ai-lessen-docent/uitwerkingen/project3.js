function tel(lijst, woord) {
  let aantal = 0;
  for (let i = 0; i < lijst.length; i++) {
    if (lijst[i] === woord) {
      aantal = aantal + 1;
    }
  }
  return aantal;
}

function volgendeWoorden(context) {
  let opties = [];
  for (let plek = 0; plek < woorden.length - contextLengte; plek++) {
    if (pastOpPlek(plek, context)) {
      opties.push(woorden[plek + contextLengte]);
    }
  }
  return opties;
}

function kiesVolgend(context) {
  let opties = volgendeWoorden(context);
  if (opties.length === 0) {
    return GEEN_WOORD;
  }
  let plek = floor(random(opties.length));
  return opties[plek];
}

function voegWoordToe(tekst) {
  let context = laatsteWoorden(tekst, contextLengte);
  let woord = kiesVolgend(context);
  if (woord !== GEEN_WOORD) {
    tekst.push(woord);
  }
}