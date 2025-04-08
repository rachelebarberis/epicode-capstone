import { Container, Row, Col, Button } from "react-bootstrap";

const AreaPersonaleComponent = () => {
  return (
    <Container className="mt-5">
      <h4 className="text-center pb-5">Benvenuto nella tua Area Personale!</h4>

      <Row className="mb-4">
        <Col className="text-end">
          <Button variant="outline-secondary" className="custom-btn">
            Modifica
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col xs={12} md={4} className="d-flex justify-content-center">
          <img
            src="/public/images/logosito.jpg"
            alt="Profilo"
            id="imgrecensioni"
            className="rounded-circle profile-img"
          />
        </Col>

        <Col xs={12} md={8} className="pt-3">
          <h4>Informazioni personali</h4>
          <p>
            <strong>Nome:</strong> Rachele
          </p>
          <p>
            <strong>Cognome:</strong> Barberis
          </p>

          <hr className="w-100 my-4" style={{ color: "#7A3E1F" }} />

          <h5 className="text-center">
            <i className="bi bi-heart"></i> Lista preferiti
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default AreaPersonaleComponent;
