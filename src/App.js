import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Welcome from "./Components/Welcome";
import NavbarComponent from "./Components/NavbarComponent";
import UpdateProfilePage from "./Components/UpdateProfilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route exact path="/" element={<SignUp />}></Route>
          <Route exact path="/welcome" element={<Welcome />}></Route>
          <Route
            exact
            path="/updateProfile"
            element={<UpdateProfilePage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
