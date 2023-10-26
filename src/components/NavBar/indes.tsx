import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function AppNaveBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Weather App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={(evt) => {
                evt.preventDefault();
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={(evt) => {
                evt.preventDefault();
                navigate("/search-history");
              }}
            >
              History
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNaveBar;
