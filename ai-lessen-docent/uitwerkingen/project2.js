function drempel(beeld, grens) {
  let nieuw = maakLeegBeeld(beeld[0].length, beeld.length);
  for (let rij = 0; rij < beeld.length; rij++) {
    for (let kolom = 0; kolom < beeld[0].length; kolom++) {
      if (beeld[rij][kolom] < grens) {
        nieuw[rij][kolom] = WIT;
      } else {
        nieuw[rij][kolom] = ZWART;
      }
    }
  }
  return nieuw;
}

// Tussenversie STAP 2a (alleen het midden):
//
//   let som = beeld[rij][kolom] * kernel[1][1];
//
// Eindversie STAP 2b:
function convolutie(beeld, kernel) {
  let nieuw = maakLeegBeeld(beeld[0].length, beeld.length);
  for (let rij = 1; rij < beeld.length - 1; rij++) {
    for (let kolom = 1; kolom < beeld[0].length - 1; kolom++) {
      let som = 0;
      for (let kRij = 0; kRij < 3; kRij++) {
        for (let kKolom = 0; kKolom < 3; kKolom++) {
          som = som + beeld[rij + kRij - 1][kolom + kKolom - 1] * kernel[kRij][kKolom];
        }
      }
      nieuw[rij][kolom] = abs(som);
    }
  }
  return nieuw;
}

// Tussenversie STAP 3a (linksboven):
//
//   klein[rij][kolom] = beeld[rij * blok][kolom * blok];
//
// Eindversie STAP 3b:
function pooling(beeld, blok) {
  let klein = maakLeegBeeld(floor(beeld[0].length / blok), floor(beeld.length / blok));
  for (let rij = 0; rij < klein.length; rij++) {
    for (let kolom = 0; kolom < klein[0].length; kolom++) {
      let grootste = ZWART;
      for (let bRij = 0; bRij < blok; bRij++) {
        for (let bKolom = 0; bKolom < blok; bKolom++) {
          let waarde = beeld[rij * blok + bRij][kolom * blok + bKolom];
          if (waarde > grootste) {
            grootste = waarde;
          }
        }
      }
      klein[rij][kolom] = grootste;
    }
  }
  return klein;
}

// STAP 4a: alleen plat + uitvoer
// STAP 4b: plat + voegNeuronenLaagToe(model, 32) + uitvoer
// STAP 4c: een CNN
function maakModel() {
  let model = nieuwModel();
  voegConvolutieLaagToe(model, 8);
  voegPoolingLaagToe(model);
  voegPlatLaagToe(model);
  voegNeuronenLaagToe(model, 32);
  voegUitvoerLaagToe(model);
  return model;
}

function telPerCijfer() {
  for (let i = 0; i < testCijfers.length; i++) {
    let cijfer = testCijfers[i];
    totaalPerCijfer[cijfer] = totaalPerCijfer[cijfer] + 1;
    if (testVoorspellingen[i] === cijfer) {
      goedPerCijfer[cijfer] = goedPerCijfer[cijfer] + 1;
    }
  }
}

// 6a blur, 6b drempel, 6c centreer (na drempel: het zoekt naar witte
// pixels), 6d pooling (blok 196 / 28 = 7), 6e gemiddeldePooling
// in plaats van pooling
function voorbewerking(img) {
  let beeld = naarGrijs(img);
  beeld = convolutie(beeld, BLUR);
  beeld = drempel(beeld, INKT_GRENS);
  beeld = centreer(beeld);
  beeld = gemiddeldePooling(beeld, WEBCAM_PIXELS / CIJFER_PIXELS);
  return beeld;
}

function gemiddeldePooling(beeld, blok) {
  let klein = maakLeegBeeld(floor(beeld[0].length / blok), floor(beeld.length / blok));
  for (let rij = 0; rij < klein.length; rij++) {
    for (let kolom = 0; kolom < klein[0].length; kolom++) {
      let som = 0;
      for (let bRij = 0; bRij < blok; bRij++) {
        for (let bKolom = 0; bKolom < blok; bKolom++) {
          som = som + beeld[rij * blok + bRij][kolom * blok + bKolom];
        }
      }
      klein[rij][kolom] = som / (blok * blok);
    }
  }
  return klein;
}