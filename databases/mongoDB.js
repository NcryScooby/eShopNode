const mongoose = require("mongoose");

// Configura o arquivo .env
require("dotenv").config();

//Conexão com o banco de dados MONGO
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
