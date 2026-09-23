const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get('/', (req, res) => {
  let html = '<h2>📋 My To-Do List</h2>';
  html += '<form action="/add" method="post"><input name="task" placeholder="Enter a task"><button>Add</button></form><ul>';
  tasks.forEach((t, i) => {
    html += `<li>${t.done ? '✔️' : '⏳'} ${t.task} <a href="/done/${i}">[done]</a> <a href="/remove/${i}">[remove]</a></li>`;
  });
  html += '</ul>';
  res.send(html);
});

app.post('/add', (req, res) => {
  tasks.push({ task: req.body.task, done: false });
  res.redirect('/');
});

app.get('/done/:index', (req, res) => {
  tasks[req.params.index].done = true;
  res.redirect('/');
});

app.get('/remove/:index', (req, res) => {
  tasks.splice(req.params.index, 1);
  res.redirect('/');
});

const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', () => console.log(`Running on port ${port}`));
