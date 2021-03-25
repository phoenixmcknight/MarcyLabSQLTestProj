const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3030;

app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(PORT);
