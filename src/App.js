import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Library from "./Library";
import Book from "./Book";

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/books/get")
      .then((resp) => resp.json())
      .then((resp) => setBooks(resp));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/books/search?searchTerm=${searchTerm}`)
      .then((resp) => resp.json())
      .then((resp) => setSearchResults(resp.items));
  };

  if (!books) return <h1>Loading...</h1>;

  // help with forms: https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
  return (
    <Router>
      <main>
        <nav>
          <ul
            style={{
              listStyleType: "none",
              margin: "0",
              padding: "0",
              overflow: "hidden",
              backgroundColor: "black",
            }}
          >
            <li style={{ float: "left" }}>
              <Link
                style={{
                  display: "block",
                  color: "white",
                  padding: "14px 16px",
                  textDecoration: "none",
                  //backgroundColor: "#aec6cf",
                }}
                to="/"
              >
                🏠
              </Link>
            </li>
            <li style={{ float: "left" }}>
              <Link
                style={{
                  display: "block",
                  color: "white",
                  padding: "14px 16px",
                  textDecoration: "none",
                  //backgroundColor: "#aec6cf",
                }}
                to="/library"
              >
                📚
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ textAlign: "center" }}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input type="submit" value="Search" />
          </form>

          {searchResults && (
            <div>
              {searchResults.map((book, key) => (
                <div>
                  {console.log(book)}
                  <Book book={book.volumeInfo} key={key} searchBook={true} />
                </div>
              ))}
            </div>
          )}
        </div>
        <Switch>
          <Route path="/">
            <Home books={books} exact />
          </Route>
          <Route path="/library">
            <Library books={books} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;

const Home = ({ books }) => (
  <div>
    {books.map((book, key) => (
      <Book book={book} key={key} searchBook={false} />
    ))}
  </div>
);
