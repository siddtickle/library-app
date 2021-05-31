import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Book from "./components/Book";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import BookProvider, { BookContext } from "./context/BookContext";

function App() {
  // help with forms: https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
  return (
    <BookProvider>
      <Router>
        <main>
          <nav>
            <ul
              style={{
                listStyleType: "none",
                margin: "0",
                padding: "10px",
                // borderRadius: "30",
                overflow: "hidden",
                // backgroundColor: "black",
              }}
            >
              <li style={{ float: "left" }}>
                <div
                  style={{
                    // border: "3px solid pink",
                    textAlign: "center",
                    padding: "5px",
                    backgroundColor: "white",
                    borderRadius: "50px",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
                  }}
                >
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
                    📚
                  </Link>
                </div>
              </li>
              <li
                style={{
                  float: "left",
                  // border: "3px solid pink",
                  paddingLeft: "15px",
                }}
              >
                <div
                  style={{
                    // border: "3px solid pink",
                    textAlign: "center",
                    padding: "5px",
                    backgroundColor: "white",
                    borderRadius: "50px",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Link
                    style={{
                      display: "block",
                      color: "white",
                      padding: "14px 16px",
                      textDecoration: "none",
                      //backgroundColor: "#aec6cf",
                    }}
                    to="/search"
                  >
                    🔍
                  </Link>
                </div>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
        </main>
      </Router>
    </BookProvider>
  );
}

export default App;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/books/search?searchTerm=${searchTerm}`)
      .then((resp) => resp.json())
      .then((resp) => setSearchResults(resp.items));
  };

  return (
    <div
      style={{
        textAlign: "center",
        // border: "3px solid green"
      }}
    >
      <h1 style={{ fontSize: "50px", fontWeight: "normal" }}>Search 🔍</h1>
      <div style={{ paddingTop: "0px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" value="Search">
            🔎
          </Button>
        </form>
        {searchResults === null && (
          <h1
            style={{
              paddingTop: "10vh",
              color: "rgba(0, 0, 0, 0.3)",
              fontWeight: "normal",
            }}
          >
            Search for your desired book!
          </h1>
        )}
      </div>

      {searchResults && (
        <div
          style={{
            // border: "3px solid black",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "50px",
            margin: "auto",
            justifyContent: "center",
          }}
        >
          {searchResults.map((book, key) => (
            <div style={{ padding: "20px" }}>
              <div>
                {console.log(book)}
                <Book book={book.volumeInfo} key={key} searchBook={true} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const { books } = useContext(BookContext);
  // const { setBooks } = useContext(BookContext);
  const refresh = () => {
    window.location.reload();
  };

  if (!books) return <h1>Loading...</h1>;

  return (
    <div
      style={{
        textAlign: "center",
        // border: "3px solid green"
      }}
    >
      <h1 style={{ fontSize: "50px", fontWeight: "normal" }}>Library 📚</h1>

      <Button onClick={refresh}>Update Library</Button>

      <div
        style={{
          // border: "3px solid black",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "50px",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        {books.map((book, key) => (
          <div
            style={{
              padding: "20px",
              // border: "3px solid pink"
            }}
          >
            <Book book={book} key={key} searchBook={false} />
          </div>
        ))}
      </div>
    </div>
  );
};
