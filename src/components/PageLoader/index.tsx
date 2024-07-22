import React from "react";
import { Spinner, Container } from "react-bootstrap";

const PageLoader = () => {
  return (
    <div className="fullscreen-loader">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    </div>
  );
};

export default PageLoader;
