/////////////////tensor de tensorflow para comprobar el vector/////////
const trainX = [4800,4200];
const trainY = [1,2];

class Chart{
}


const m = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));

function predict(x) {
  return tf.tidy(function() {
    return m.mul(x).add(b);
  });
}

function loss(prediction, labels) {
  //sustrae redondea y media de los 2 arrays
  const error = prediction
    .sub(labels)
    .square()
    .mean();
  return error;
}

//entrena el codigo para optimizarlo
function train() {
  const learningRate = 0.005;
  const optimizer = tf.train.sgd(learningRate);

  optimizer.minimize(function() {
    const predsYs = predict(tf.tensor1d(trainX));
    console.log(predsYs);
    stepLoss = loss(predsYs, tf.tensor1d(trainY));
    console.log(stepLoss.dataSync()[0]);
    return stepLoss;
  });
  plot();
}
const predictionsBefore = predict(tf.tensor1d(trainX));

async function plot() {
  let plotData = [];

  for (let i = 0; i < trainY.length; i++) {
    plotData.push({ x: trainX[i], y: trainY[i] });
  }

  var ctx = document.getElementById("myChart").getContext("2d");

  var scatterChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        { label: "Training Data",
          showLine: false,
          data: plotData,
          fill: false
        },
        { label: "Y = " + m.dataSync()[0] + "X + " + b.dataSync()[0],
          data: [
                  {
                    x: 0,
                    y: b.dataSync()[0]
                  },
                  {
                    x: 11,
                    y: 11 * m.dataSync()[0] + b.dataSync()[0]
                  }
                ],
          type: "line",
          borderColor: "red",
          fill: false
        }
      ]
    },
    options: {
      animation: false,
      scales: {
          yAxes: [
           {
              ticks: {
                max: 5
              }
            }
          ],
        xAxes: [
          {
            type: "linear",
            position: "bottom"
          }
        ]
      }
    }
  });
}
plot();

/////falta definir chatr que seria el modelo de datos de la clase Proyect de la entity
