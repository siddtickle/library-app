import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/books/get")
      .then((resp) => resp.json())
      .then((resp) => setBooks(resp));
  }, []);

  useEffect(() => {
    const url = new URL(
      `http://localhost:8080/books/search?searchTerm=${searchTerm}`
    );
    // url.searchParams.append("searchTerm", searchTerm);
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  // help with forms: https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>

      {books.map((book, key) => (
        <pre key={key}>{JSON.stringify(book)}</pre>
      ))}
    </div>
  );
}

export default App;
