const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true, })
    .then(response => console.log("Connected to mongodb."))
    .catch(error => console.log(error));

