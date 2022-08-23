import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />}></Route>
        <Route
          path="/connexion"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/inscription"
          element={user ? <Navigate to="/" /> : <Register />}
        ></Route>
        <Route path="/:username" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
