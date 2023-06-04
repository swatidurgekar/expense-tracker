import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/NavLink";

const NavbarComponent = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#">MyWebLink</Navbar.Brand>
        <NavLink>Home</NavLink>
        <NavLink>Products</NavLink>
        <NavLink>About Us</NavLink>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
