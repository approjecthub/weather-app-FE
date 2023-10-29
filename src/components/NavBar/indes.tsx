import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { ROUTES } from "../../constants";

function AppNaveBar() {
  const navigate = useNavigate();
  const { isAuthenticated, resetToken } = useContext(AuthContext);
  if (!isAuthenticated) return null;

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
                navigate(ROUTES.HOME);
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={(evt) => {
                evt.preventDefault();
                navigate(ROUTES.SEARCH_HISTORY);
              }}
            >
              History
            </Nav.Link>
          </Nav>
          <button className=" btn btn-outline-light" onClick={resetToken}>
            Logout
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNaveBar;
