const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const db = require("./firebase");

app.use(express.json());
app.use(cors());

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
