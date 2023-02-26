const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const dbpath = path.join(__dirname, "goodreads.db");
let db = null;
const InitializeDBandServer = async () => {
  try {
    db = await open({ filename: dbpath, driver: sqlite3.Database });
    app.listen(8800, () => {
      console.log("server is running at http://localhost:8800");
    });
  } catch (e) {
    `Db error:${e.message}`;
    process.exit(1);
  }
};
InitializeDBandServer();
//API for get books
app.get("/books/", async (request, response) => {
  const getBookQuary = `SELECT * FROM book ORDER BY book_id`;
  const bookArray = await db.all(getBookQuary);
  response.send(bookArray);
});
