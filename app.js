require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const expressLayout = require("express-ejs-layouts");
const db = require("./database/db.js");
const todoDBRoutes = require("./routes/tododb.js"); // untuk DB
const todoRoutes = require("./routes/todo.js"); // untuk dummy
const { todos } = require("./routes/todo.js");

const app = express();
const port = process.env.PORT;

// Set EJS sebagai view engine
app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");

// Middleware
app.use(expressLayout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes 
app.use("/todosdb", todoDBRoutes);  
app.use("/todos", todoRoutes);  

// Halaman Home
app.get("/", (req, res) => {
  res.render("index", {
    layout: "layouts/main-layout",
  });
});

// Halaman Contact
app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layout",
  });
});

// Endpoint JSON todos dummy
app.get("/todos-data", (req, res) => {
  res.json(todos);
});

// Halaman Todos List (dummy)
app.get("/todos-list", (req, res) => {
  res.render("todos-page", {
    todos: todos,
    layout: "layouts/main-layout",
  });
});

// Tambah Todo (dummy)
app.post("/todos-list/add", (req, res) => {
  const { task } = req.body;
  if (!task || task.trim() === "") {
    return res.status(400).send("Task tidak boleh kosong");
  }

  const newTodo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    task: task.trim(),
  };
  todos.push(newTodo);

  res.redirect("/todos-list");
});

// Edit Todo (dummy)
app.put("/todos-list/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).send("Tugas tidak ditemukan");
  }
  if (!task || task.trim() === "") {
    return res.status(400).send("Task tidak boleh kosong");
  }

  todo.task = task.trim();
  res.redirect("/todos-list");
});

// Hapus Todo (dummy)
app.delete("/todos-list/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).send("Tugas tidak ditemukan");
  }

  todos.splice(index, 1);
  res.redirect("/todos-list");
});

// View Todos dari Database
app.get("/todo-view", (req, res) => {
  db.query("SELECT * FROM todos", (err, todos) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.render("todo", {
      todos: todos,
      layout: "layouts/main-layout",
    });
  });
});

// Middleware untuk 404
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
