import { Container } from "react-bootstrap";

const FooterComponent = () => (
  <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
    <footer className="mt-5 mb-0" id="footer">
      <span className="d-flex justify-content-center">
        <strong>WanderLOst</strong> - Viaggia senza limiti, sogna senza confini
      </span>

      <div className="d-flex justify-content-center pb-2">
        <i className="bi bi-facebook me-2"></i>

        <i className="bi bi-instagram me-2"></i>

        <i className="bi bi-youtube me-2"></i>
      </div>
    </footer>
  </Container>
);

export default FooterComponent;
