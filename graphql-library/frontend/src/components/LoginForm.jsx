import { useState } from "react";

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    loginUser({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div>
        password:
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button type="submit">log in</button>
    </form>
  );
};

export default LoginForm;
