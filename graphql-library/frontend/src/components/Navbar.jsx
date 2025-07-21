import { useNavigate } from "react-router-dom";
import { useTokenValue } from "../TokenContext";

const Navbar = ({ logoutUser }) => {
  const navigate = useNavigate();
  const token = useTokenValue();

  let loggedInRoutes;
  if (token) {
    loggedInRoutes = (
      <>
        <button onClick={() => navigate("/addBook")}>Add Book</button>
        <button onClick={logoutUser}>Log out</button>
      </>
    );
  }

  let loggedOffRoutes;
  if (!token) {
    loggedOffRoutes = (
      <button onClick={() => navigate("/login")}>log in</button>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>authors</button>
      <button onClick={() => navigate("/books")}>books</button>
      {loggedInRoutes}
      {loggedOffRoutes}
    </div>
  );
};

export default Navbar;
