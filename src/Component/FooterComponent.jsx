import { Container } from "react-bootstrap";

const FooterComponent = () => (
  <Container fluid={true} className="p-0" id="footer">
    <footer className="mt-2">
      <span className="d-flex justify-content-center">
        <strong id="strong-footer">WanderLOst</strong> - Viaggia senza limiti,
        sogna senza confini
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
