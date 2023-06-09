import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/Auth";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("idToken");
    dispatch(authActions.logout());
  };

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#">MyWebLink</Navbar.Brand>
        <NavLink>Home</NavLink>
        <NavLink>Products</NavLink>
        <NavLink>About Us</NavLink>
        <NavLink onClick={logout} to="/">
          Logout
        </NavLink>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
