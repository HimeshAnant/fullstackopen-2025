import { useState } from "react";
import Select from "react-select";
import { useTokenValue } from "../TokenContext";

const BirthYearForm = ({ authors, updateAuthor }) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");
  const token = useTokenValue();

  if (!token) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    updateAuthor({ name: name.value, born: Number(born) });
    setName("");
    setBorn("");
  };

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={handleSubmit}>
        <Select onChange={setName} options={options} />

        <div>
          born:{" "}
          <input
            value={born}
            onChange={(event) => setBorn(event.target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
