const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3030;

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/users", async (req, res) => {
  try {
    const users = await db.any(`select * from users`);
    return res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT);
