import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Welcome from "./Components/Welcome";
import NavbarComponent from "./Components/NavbarComponent";
import UpdateProfilePage from "./Components/UpdateProfilePage";
import ForgotPassword from "./Components/ForgotPassword";
import AddExpenses from "./Components/AddExpenses";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route exact path="/" element={<SignUp />}></Route>
          {isAuthenticated && (
            <Route exact path="/welcome" element={<Welcome />}></Route>
          )}
          <Route
            exact
            path="/updateProfile"
            element={<UpdateProfilePage />}
          ></Route>
          <Route
            exact
            path="forgot-password"
            element={<ForgotPassword />}
          ></Route>
          {isAuthenticated && (
            <Route exact path="add-expenses" element={<AddExpenses />}></Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
