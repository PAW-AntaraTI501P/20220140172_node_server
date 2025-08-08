// app.js
const express = require("express");
const app = express();
const todoRoutes = require("./todo"); // import router

app.use(express.json()); // biar bisa baca JSON body
app.use("/todos", todoRoutes); // prefix endpoint

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});

module.exports = app;