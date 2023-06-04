import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Welcome from "./Components/Welcome";
import NavbarComponent from "./Components/NavbarComponent";
import UpdateProfilePage from "./Components/UpdateProfilePage";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/updateProfile" element={<UpdateProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
