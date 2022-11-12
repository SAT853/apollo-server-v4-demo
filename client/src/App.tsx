import ListOfBooks from "./components/BookList";
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/books" element={<ListOfBooks />} />
      <Route path="/" element={<>
        <h1>
          React With GraphQL
        </h1>
        <Link to={"/books"}>
          Books
        </Link>
      </>} />
    </Routes>
  );
}

export default App;
