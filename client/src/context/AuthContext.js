import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "630206042aa6145f2700880c",
    username: "kakou",
    email: "kakou@gmail.com",
    profilePicture: "person/1.jpeg",
    coverPicture: "",
    followers: [],
    followings: [],
    isAdmin: false,
  },

  isFetching: false,
  error: false,
};
const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
