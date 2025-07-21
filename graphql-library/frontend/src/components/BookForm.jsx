import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const BookForm = ({ handleCreateBook }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const book = {
      title,
      author,
      published: Number(published),
      genres,
    };

    handleCreateBook(book);
    navigate("/books");
  };

  const handleInput = (setVar) => {
    return ({ target }) => setVar(target.value);
  };

  const handleGenreClick = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title <input onChange={handleInput(setTitle)} value={title} />
        </div>

        <div>
          author <input onChange={handleInput(setAuthor)} value={author} />
        </div>

        <div>
          published
          <input onChange={handleInput(setPublished)} value={published} />
        </div>

        <div>
          <input value={genre} onChange={handleInput(setGenre)} />
          <button type="button" onClick={handleGenreClick}>
            add genre
          </button>
        </div>

        <div>
          genres:
          {genres.map((g) => (
            <span key={g}>{g} </span>
          ))}
        </div>

        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default BookForm;
