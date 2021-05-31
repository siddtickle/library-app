import React, { useState, createContext } from "react";
const BookContext = createContext();

export default function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
}

export { BookContext };
