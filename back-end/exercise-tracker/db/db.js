const mongoose = require('mongoose');

function connectToDB() {
  mongoose.connect(
    process.env.MLAB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err) => {
      if (err) {
        throw new Error(err);
      }

      console.log('Connected to Mongo DB!');
    }
  );
}

module.exports = connectToDB;
