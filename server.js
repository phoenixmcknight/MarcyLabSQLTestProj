const { render } = require("ejs");
const { response } = require("express");
const express = require("express");
const db = require("./db");

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
    const users = await db.any(`select * from users`);
    return res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/users", async (req, res) => {
  const data = req.body;
  try {
    const info = await db.one(
      `insert into users (user_name) values ($1) returning id`,
      data.username
    );
    res.redirect(`/users/${info.id}/media`);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/users/:id/media", async (req, res) => {
  const id = req.params.id;
  try {
    const media = await db.any(`select * FROM media where user_id = ${id}`);
    return res.json(media);
  } catch (err) {
    res.status(500).json(err);
  }
});

// app.get("/users/:user_id/upload", async (req, res) => {});

app.post("/users/:user_id/upload", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    console.log(req.body.user_id, req.body.file_name, req.body.url);
    await db.none(
      "insert into media (user_id,file_name, url) values ($1, $2, $3)",
      [user_id, req.body.file_name, req.body.url]
    );
    return res.json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
app.listen(PORT);
