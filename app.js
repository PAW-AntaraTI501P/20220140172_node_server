require("dotenv").config();
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo.js");
const { todos } = require("./routes/todo.js"); // Menambahkan ini untuk mengimpor data dummy
const port = process.env.PORT;

app.use(express.json());
app.use("/todos", todoRoutes);

// Atur EJS sebagai view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index"); // render file index.ejs
});

app.get("/contact", (req, res) => {
  res.render("contact"); // Render file contact.ejs
});

// Endpoint untuk mendapatkan data todos
app.get("/todos-data", (req, res) => {
  res.json(todos); // Mengembalikan data todos dalam format JSON
});

app.get("/todos-list", (req, res) => {
  res.render("todos-page", { todos: todos }); // Merender todos-page.ejs dan meneruskan data todos
});

// Middleware untuk menangani 404 Not Found
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
