const DisplayBooks = ({ books }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id.toString()}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayBooks;
