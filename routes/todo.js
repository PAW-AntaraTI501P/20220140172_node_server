const express = require("express");
const router = express.Router();

// Data dummy
let todos = [
  { id: 1, task: "Belajar Node.js" },
  { id: 2, task: "Membuat API" },
];

// Halaman tambah todo
router.get("/tambah", (req, res) => {
  res.render("tambah", { todo: null });
});

// Halaman edit todo
router.get("/edit/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Tugas tidak ditemukan");
  res.render("tambah", { todo });
});

// Endpoint: semua todos
router.get("/", (req, res) => {
  res.json(todos);
});

// Endpoint: todo by ID
router.get("/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Tugas tidak ditemukan");
  res.json(todo);
});

// Tambah todo baru
router.post("/tambah", (req, res) => {
  const newTodo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    task: req.body.task,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Edit todo
router.post("/edit/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Tugas tidak ditemukan");

  todo.task = req.body.task;
  res.json(todo);
});

// Hapus todo
router.delete("/delete/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Tugas tidak ditemukan");

  todos.splice(index, 1);
  res.status(204).send();
});

// Export router + data
router.todos = todos;
module.exports = router;
