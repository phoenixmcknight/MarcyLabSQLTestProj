const pg = require("pg-promise");

const db = pg({
  host: "localhost",
  port: 5432,
  database: "fake_dropbox",
  user: "moises",
});

module.exports = db;
