function voorspelRegels(wis, netl) {
  // Eén mogelijke uitwerking: wiskunde hoger dan Nederlands
  if (wis > netl) {
    return N_PROFIEL;
  }
  return M_PROFIEL;
}

// Tussenversie STAP 2a (k = 1):
//
// function voorspelKNN(wis, netl) {
//   let kleinsteAfstand = 1000;
//   let beste = 0;
//   for (let i = 0; i < trainWIS.length; i++) {
//     let afstand = dist(wis, netl, trainWIS[i], trainNETL[i]);
//     if (afstand < kleinsteAfstand) {
//       kleinsteAfstand = afstand;
//       beste = i;
//     }
//   }
//   return trainProfiel[beste];
// }
//
// Eindversie STAP 2b (k buren):
function voorspelKNN(wis, netl) {
  let gebruikt = [];
  let som = 0;
  for (let keer = 0; keer < k; keer++) {
    let i = zoekBuur(wis, netl, gebruikt);
    gebruikt[i] = true;
    som = som + trainProfiel[i];
  }
  if (som > 0) {
    return N_PROFIEL;
  }
  return M_PROFIEL;
}

function voorspelPerceptron(wis, netl) {
  let som = gewichtWIS * wis + gewichtNETL * netl + bias;
  if (som > 0) {
    return N_PROFIEL;
  }
  return M_PROFIEL;
}

function leerStap() {
  for (let i = 0; i < trainWIS.length; i++) {
    let voorspelling = voorspelPerceptron(trainWIS[i], trainNETL[i]);
    let fout = trainProfiel[i] - voorspelling;
    gewichtWIS = gewichtWIS + 0.01 * fout * trainWIS[i];
    gewichtNETL = gewichtNETL + 0.01 * fout * trainNETL[i];
    bias = bias + 0.01 * fout;
  }
}

function telGoedEnFout() {
  tp = 0;
  fp = 0;
  tn = 0;
  fn = 0;
  for (let i = 0; i < testWIS.length; i++) {
    let voorspelling = voorspel(testWIS[i], testNETL[i]);
    if (voorspelling === N_PROFIEL && testProfiel[i] === N_PROFIEL) {
      tp = tp + 1;
    }
    if (voorspelling === N_PROFIEL && testProfiel[i] === M_PROFIEL) {
      fp = fp + 1;
    }
    if (voorspelling === M_PROFIEL && testProfiel[i] === M_PROFIEL) {
      tn = tn + 1;
    }
    if (voorspelling === M_PROFIEL && testProfiel[i] === N_PROFIEL) {
      fn = fn + 1;
    }
  }
}

function perceptron(a, b, gewichtA, gewichtB, b0) {
  if (gewichtA * a + gewichtB * b + b0 > 0) {
    return N_PROFIEL;
  }
  return M_PROFIEL;
}

function voorspelTwee(wis, netl) {
  let lijn1 = perceptron(wis, netl, 1, 0, -5);
  let lijn2 = perceptron(wis, netl, 0, -1, 7);
  let baas = perceptron(lijn1, lijn2, 1, 1, -1);
  return baas;
}