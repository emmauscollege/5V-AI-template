let blur = [
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
];

let randenVerticaal = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1],
];

let randenHorizontaal = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1],
];

let eigenFilter = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0],
];

function convolutie(b, k) {
  let hoogte = b.length;
  let breedte = b[0].length;
  let uit = maakLeegBeeld(breedte, hoogte);
  for (let y = 1; y < hoogte - 1; y++) {
    for (let x = 1; x < breedte - 1; x++) {
      let som = 0;
      for (let ky = 0; ky < 3; ky++) {
        for (let kx = 0; kx < 3; kx++) {
          som = som + b[y + ky - 1][x + kx - 1] * k[ky][kx];
        }
      }
      uit[y][x] = abs(som);
    }
  }
  return uit;
}

function pooling(b, g) {
  let hoogte = floor(b.length / g);
  let breedte = floor(b[0].length / g);
  let uit = maakLeegBeeld(breedte, hoogte);
  for (let y = 0; y < hoogte; y++) {
    for (let x = 0; x < breedte; x++) {
      let grootste = 0;
      for (let dy = 0; dy < g; dy++) {
        for (let dx = 0; dx < g; dx++) {
          let waarde = b[y * g + dy][x * g + dx];
          if (waarde > grootste) {
            grootste = waarde;
          }
        }
      }
      uit[y][x] = grootste;
    }
  }
  return uit;
}

function drempel(b, grens) {
  let hoogte = b.length;
  let breedte = b[0].length;
  let uit = maakLeegBeeld(breedte, hoogte);
  for (let y = 0; y < hoogte; y++) {
    for (let x = 0; x < breedte; x++) {
      if (b[y][x] < grens) {
        uit[y][x] = 255;
      } else {
        uit[y][x] = 0;
      }
    }
  }
  return uit;
}

function maakModel() {
  let model = tf.sequential();
  model.add(tf.layers.conv2d({ inputShape: [28, 28, 1], filters: 8, kernelSize: 3, activation: "relu" }));
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 32, activation: "relu" }));
  model.add(tf.layers.dense({ units: 10, activation: "softmax" }));
  return model;
}

function voorbewerking(img) {
  let b = naarGrijs(img);
  b = convolutie(b, blur);
  b = drempel(b, 100);
  b = pooling(b, 7);
  return centreer(b);
}
