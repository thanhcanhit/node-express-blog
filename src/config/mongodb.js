const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to database');
  } catch (err) {
    console.log('Error when connect with database ', err);
  }
}

module.exports = {
  connect,
};
