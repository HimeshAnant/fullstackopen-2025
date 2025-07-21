import { useState } from "react";
import { useQuery } from "@apollo/client";
import Select from "react-select";

import DisplayBooks from "./DisplayBooks";

import { GET_BOOKS } from "../queries";

const Books = () => {
  const [genre, setGenre] = useState(null);

  const genres = [
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Horror",
    "Historical",
    "Dark",
  ];
  const options = [
    ...genres.map((g) => ({ label: g, value: g })),
    { label: "All Genres", value: null },
  ];

  const booksResult = useQuery(GET_BOOKS, {
    variables: { genre: genre ? genre.value : null },
  });

  let books = [];
  if (!booksResult.loading) {
    books = booksResult.data.allBooks;
  }

  return (
    <div>
      <DisplayBooks books={books} />
      <Select onChange={setGenre} options={options} />
    </div>
  );
};

export default Books;
