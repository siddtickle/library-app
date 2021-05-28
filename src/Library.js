import React from "react";

const Library = ({ books }) => {
  return (
    <div>
      {books.map((book, key) => (
        <pre key={key}>
          {book.title}
          {console.log(book.title)}
        </pre>
      ))}
    </div>
  );
};

export default Library;
