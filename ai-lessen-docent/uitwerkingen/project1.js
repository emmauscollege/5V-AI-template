function voorspelRegels(x, y) {
  // Eén mogelijke uitwerking: veel wiskunde en niet heel goed in Nederlands
  if (x > 5.5 && y < 7) {
    return 1;
  }
  return -1;
}

// Tussenversie STAP 2a (k = 1):
//
// function voorspelKNN(x, y) {
//   let kleinsteAfstand = 1000;
//   let beste = 0;
//   for (let i = 0; i < trainX.length; i++) {
//     let afstand = dist(x, y, trainX[i], trainY[i]);
//     if (afstand < kleinsteAfstand) {
//       kleinsteAfstand = afstand;
//       beste = i;
//     }
//   }
//   return trainLabel[beste];
// }
//
// Eindversie STAP 2b (k buren):
function voorspelKNN(x, y) {
  let gebruikt = [];
  let som = 0;
  for (let keer = 0; keer < k; keer++) {
    let i = zoekBuur(x, y, gebruikt);
    gebruikt[i] = true;
    som = som + trainLabel[i];
  }
  if (som > 0) {
    return 1;
  }
  return -1;
}

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

function perceptron(a, b, gewichtA, gewichtB, b0) {
  if (gewichtA * a + gewichtB * b + b0 > 0) {
    return 1;
  }
  return -1;
}

function voorspelTwee(x, y) {
  let lijn1 = perceptron(x, y, 1, 0, -5);
  let lijn2 = perceptron(x, y, 0, -1, 7);
  let baas = perceptron(lijn1, lijn2, 1, 1, -1);
  return baas;
}