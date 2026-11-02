function voorspelRegels(x, y) {
  // Eén mogelijke uitwerking voor 1b: N-leerlingen in een rondje rond (5, 5)
  if (x > 3 && x < 7 && y > 3 && y < 7) {
    return 1;
  }
  return -1;
}

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
