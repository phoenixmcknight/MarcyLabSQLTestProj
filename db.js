const pg = require("pg-promise")();

const db = pg({
  host: "localhost",
  port: 5432,
  database: "fake_dropbox",
  user: "moises",
  password: "lol",
});
//

module.exports = db;
