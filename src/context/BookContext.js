import React, { useState, createContext, useEffect } from "react";
const BookContext = createContext();

export default function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/books/get")
      .then((resp) => resp.json())
      .then((resp) => setBooks(resp));
  }, [setBooks]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
}

export { BookContext };
