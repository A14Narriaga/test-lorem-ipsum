const mongoose = require("mongoose");
const env = process.env;

const dbConnection = async () => {
  try {
    await mongoose.connect(env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Online");
  } catch (error) {
    throw new Error("Error a la hora de inicializar la BD");
  }
};

module.exports = {
  dbConnection,
};
