const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const db = require("./firebase");

const fetch = require("node-fetch");
const { response } = require("express");

app.use(express.json());
app.use(cors());

app.get("/books/search", async (req, res) => {
  const api_url = `https://www.googleapis.com/books/v1/volumes?q=${req.query.searchTerm}`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  res.json(json);
});

app.get("/books/get", async (req, res) => {
  const snapshot = await db.collection("books").get();

  let bookList = [];

  snapshot.forEach((doc) => {
    bookList.push({ ...doc.data(), id: doc.id });
  });

  res.send(bookList);
});

app.post("/books/add", async (req, res) => {
  const { title, author } = req.body;

  const resp = await db.collection("books").add({
    title,
    author,
  });

  console.log(`Added element with id: ${resp.id}`);
  res.sendStatus(200);
});

app.post("/book/delete", async (req, res) => {
  const resp = await db.collection("cities").doc(req.id).delete();

  console.log(`Deleted element with id: ${req.id}`);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
