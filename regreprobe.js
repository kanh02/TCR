// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
// Generate some synthetic data for training.
const xs = tf.tensor1d([5, 5, 5, 5]);
const ys = tf.tensor1d([5, 5, 5, 10]);

// Train the model using the data.
model.fit(xs, ys, {
  epochs: 50,
  callbacks: {
      onEpochEnd: (epoch, log) => {
        console.log(epoch, log.loss);
      }
    }}).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:
  // Open the browser devtools to see the output
  const output = model.predict(tf.tensor2d([4800,4200], [2,1]));
  output.print();
});
