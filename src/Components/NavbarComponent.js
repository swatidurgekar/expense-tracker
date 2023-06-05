import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
  const logout = () => {
    localStorage.removeItem("idToken");
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
