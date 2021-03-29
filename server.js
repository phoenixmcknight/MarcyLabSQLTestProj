const { render } = require("ejs");
const { response } = require("express");
const express = require("express");
const db = require("./db");
const DropBox = require("./DropBox");
const dropBox = new DropBox();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3030;

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("views");
});
app.get("/users", async (req, res) => {
  try {
    const users = await dropBox.showUsers();
    return res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/users", async (req, res) => {
  const data = req.body;
  try {
    const info = await dropBox.createUser(data);
    res.redirect(`/users/${info.id}/media`);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/users/:id/media", async (req, res) => {
  const id = req.params.id;
  try {
    const media = await dropBox.showUserMedia(id);
    return res.json(media);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/users/:user_id/upload", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    await dropBox.uploadMedia(user_id, req.body.file_name, req.body.url);
    res.redirect(`users/${user_id}/media`);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/users/:user_id/media/delete/:id", async (req, res) => {
  const user_id = req.params.user_id;
  const file_id = req.params.id;
  try {
    await dropBox.deleteMedia(file_id);
    res.redirect(`users/${user_id}/media`);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT);
