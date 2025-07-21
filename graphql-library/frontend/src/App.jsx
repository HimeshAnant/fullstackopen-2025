import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { useEffect, useReducer } from "react";

import TokenContext, { tokenReducer } from "./TokenContext";

import Authors from "./components/Authors";
import Books from "./components/Books";
import Navbar from "./components/Navbar";
import BookForm from "./components/BookForm";
import LoginForm from "./components/loginForm";

import {
  GET_AUTHORS,
  GET_BOOKS,
  POST_BOOK,
  PUT_AUTHOR,
  LOGIN_USER,
} from "./queries";

const App = () => {
  const [token, tokenDispatch] = useReducer(tokenReducer, null);
  const client = useApolloClient();

  useEffect(() => {
    const savedToken = localStorage.getItem("library-app-token");
    if (savedToken) {
      tokenDispatch({
        type: "SET_TOKEN",
        payload: savedToken,
      });
    }
  }, []);

  const authorsResult = useQuery(GET_AUTHORS);
  let authors = [];
  if (!authorsResult.loading) authors = authorsResult.data.allAuthors;

  const [postBook] = useMutation(POST_BOOK, {
    update: (cache, response) => {
      cache.updateQuery({ query: GET_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.find(
            (authorName) => authorName === response.data.addBook.author.name
          )
            ? allAuthors
            : allAuthors.concat(response.data.addBook.author),
        };
      });

      cache.updateQuery(
        { query: GET_BOOKS, variables: { genre: null } },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(response.data.addBook),
          };
        }
      );

      const addedBook = response.data.addBook;
      for (const genre of addedBook.genres) {
        cache.updateQuery(
          { query: GET_BOOKS, variables: { genre } },
          (data) => {
            if (!data || !data.allBooks) return data;

            return {
              allBooks: data.allBooks.concat(addedBook),
            };
          }
        );
      }
    },
  });
  const handleCreateBook = (book) => {
    postBook({ variables: { ...book } });
  };

  const [putAuthor] = useMutation(PUT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });
  const updateAuthor = (author) => {
    putAuthor({ variables: { ...author } });
  };

  const [login, loginResult] = useMutation(LOGIN_USER, {
    onError: (error) => console.error(error),
  });
  const loginUser = async (user) => {
    login({ variables: { ...user } });
  };

  useEffect(() => {
    if (loginResult.data) {
      const obtainedToken = loginResult.data.login.value;
      tokenDispatch({
        type: "SET_TOKEN",
        payload: obtainedToken,
      });

      localStorage.setItem("library-app-token", obtainedToken);
    }
  }, [loginResult.data]);

  const logoutUser = () => {
    tokenDispatch({ type: "RESET_TOKEN" });
    localStorage.removeItem("library-app-token");
    client.resetStore();
  };

  return (
    <TokenContext.Provider value={[token, tokenDispatch]}>
      <div>
        <Navbar logoutUser={logoutUser} />
        <Routes>
          <Route
            path="/"
            element={<Authors authors={authors} updateAuthor={updateAuthor} />}
          />
          <Route path="/books" element={<Books />} />
          <Route
            path="/addBook"
            element={
              token === null ? (
                <Navigate to="/login" />
              ) : (
                <BookForm handleCreateBook={handleCreateBook} />
              )
            }
          />
          <Route
            path="/login"
            element={
              token === null ? (
                <LoginForm loginUser={loginUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </TokenContext.Provider>
  );
};

export default App;
