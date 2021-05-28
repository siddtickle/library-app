import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/books/get")
      .then((resp) => resp.json())
      .then((resp) => setBooks(resp));
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <form>
        <input type="text" />
        <input type="submit" value="Search" />
      </form>

      {books.map((book) => (
        <pre>{JSON.stringify(book)}</pre>
      ))}
    </div>
  );
}

export default App;
