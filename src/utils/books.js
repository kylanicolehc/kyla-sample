export const add = ({ title, isbn, author, year, publisher }) => {
    const dbBooks = JSON.parse(localStorage.getItem("books")) || [];
    const book = { title, isbn, author, year, publisher };
    const books = [...dbBooks, book];
    return localStorage.setItem("books", JSON.stringify(books));
  };
  export const getAll = () => {
    const dbBooks = JSON.parse(localStorage.getItem("books")) || [];
    return dbBooks;
  };
  export const deleteAll = () => {
   
 
    return localStorage.removeItem('title');
  };