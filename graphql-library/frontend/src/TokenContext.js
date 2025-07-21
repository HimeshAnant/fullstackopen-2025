import { useContext, createContext } from "react";

const TokenContext = createContext();

export const tokenReducer = (state, action) => {
  if (action.type === "SET_TOKEN") return action.payload;
  else if (action.type === "RESET_TOKEN") return null;

  return state;
};

export const useTokenValue = () => {
  const tokenAndDispatch = useContext(TokenContext);
  return tokenAndDispatch[0];
};

export const useTokenDispatch = () => {
  const tokenAndDispatch = useContext(TokenContext);
  return tokenAndDispatch[1];
};

export default TokenContext;
