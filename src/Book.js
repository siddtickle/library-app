import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

const Book = ({ book, searchBook }) => {
  const [bookInfo, setBookInfo] = useState(null);
  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    const url = new URL(
      `http://localhost:8080/books/search?searchTerm=${book.title}`
    );
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setBookInfo(resp.items[0].volumeInfo));
  }, [book]);

  if (!bookInfo) {
    return <h1>Loading...</h1>;
  }

  const handleAdd = (e) => {
    e.preventDefault();
    // console.log(bookInfo.title, ", ", bookInfo.authors[0]);
    setBtnState(true);

    let url = new URL("http://localhost:8080/books/add");
    url.searchParams.append("title", bookInfo.title);
    url.searchParams.append("author", bookInfo.authors);

    fetch(url, { method: "POST" }).then((resp) => resp.json());
  };

  const handleRemove = (e) => {
    e.preventDefault();
    // console.log(bookInfo.title, ", ", bookInfo.authors[0]);
    setBtnState(true);

    let url = new URL("http://localhost:8080/books/delete");
    url.searchParams.append("id", book.id);

    fetch(url).then((resp) => resp.json());
  };

  return (
    <div
      style={{
        display: "flex",
        // border: "1px solid black",
        padding: "20px",
        height: "285px",
        width: "400px",
        boxShadow:
          "0px 0px 3px rgba(0, 0, 0, 0.1), 0px 100px 200px rgba(92, 103, 153, 0.3)",
        backgroundColor: "white",
        borderRadius: "20px",
        alignItems: "center",
        alignContent: "center",
        justifySelf: "center",
      }}
    >
      {/* {console.log(bookInfo)} */}
      <div
        style={{
          paddingRight: "50px",
        }}
      >
        {bookInfo.imageLinks && (
          <a
            href={bookInfo.infoLink}
            rel="noreferrer"
            target="_blank"
            // style={{
            //   height: "400px",
            // }}
          >
            <img alt={bookInfo.title} src={bookInfo.imageLinks.thumbnail} />
          </a>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <div>
          <h1>{bookInfo.title}</h1>
          <h3>{bookInfo.authors}</h3>
        </div>
        {searchBook && (
          <div>
            <form onSubmit={handleAdd}>
              <Button type="submit" disabled={btnState} variant="outlined">
                ➕
              </Button>
            </form>
          </div>
        )}
        {!searchBook && (
          <div>
            <form onSubmit={handleRemove}>
              <Button type="submit" disabled={btnState} variant="outlined">
                🗑
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
