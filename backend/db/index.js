const { Pool } = require("pg");

const pool = new Pool();

// const pool = new Pool({
//   user: "labber",
//   host: "localhost",
//   database: "klipboard",
//   port: 5432,
// });
// PGUSER=labber
// PGHOST=localhost
// PGDATABASE=klipboard
// PGPORT=5432

module.exports = {
  query: (text, params) => pool.query(text, params),
};
