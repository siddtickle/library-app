import React, { useState, useEffect } from "react";

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

    fetch(url).then((resp) => resp.json());
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
    <div style={{ border: "1px solid black", padding: "20px" }}>
      {/* {console.log(bookInfo)} */}
      <h1>{bookInfo.title}</h1>
      <h2>{bookInfo.authors}</h2>
      {bookInfo.imageLinks && (
        <a href={bookInfo.infoLink} rel="noreferrer" target="_blank">
          <img alt={bookInfo.title} src={bookInfo.imageLinks.thumbnail} />
        </a>
      )}
      {searchBook && (
        <div>
          <form onSubmit={handleAdd}>
            <button type="submit" disabled={btnState}>
              ➕
            </button>
          </form>
        </div>
      )}
      {!searchBook && (
        <div>
          <form onSubmit={handleRemove}>
            <button type="submit" disabled={btnState}>
              🗑
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Book;
