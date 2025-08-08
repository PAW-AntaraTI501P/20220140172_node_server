// server.js
const express = require("express");
const app = express();
const todoRoutes = require("./src/todo"); 

// Middleware untuk parsing JSON
app.use(express.json());

// Route default untuk root
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Gunakan route dari todo.js
app.use("/todos", todoRoutes);

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
