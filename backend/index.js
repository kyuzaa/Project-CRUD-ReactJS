const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

var jsonParser = bodyParser.json()


const port = 3000;

let users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

const generateId = () => {
  return Math.max(...users.map((user) => user.id)) + 1;
};

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", jsonParser, (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).send("Name and age are required");
  }

  const newUser = {
    id: generateId(),
    name: req.body.name,
    age: req.body.age,
  };
  users.push(newUser);
  res.json(newUser);
});

app.put("/api/users/:id", jsonParser, (req, res) => {
    console.log(req.body)
  if (!req.body.name || !req.body.age) {
    return res.status(400).send("Name and age are required");
  }

  const user = users.find((user) => user.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.name = req.body.name;
  user.age = req.body.age;

  res.json(user);
});

app.delete("/api/users/:id", jsonParser, (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).send("User not found");
  }

  users = users.filter((user) => user.id !== parseInt(req.params.id));

  res.send("User deleted successfully");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
