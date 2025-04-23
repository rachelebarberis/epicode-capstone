import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterComponent = () => {
  return (
    <Container
      fluid
      id="register-page"
      className="d-flex justify-content-center align-items-center mt-5 pt-5 "
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <div id="register-header" className="text-center ">
            <h1 className="fw-bolder">WanderLOst</h1>
            <p>“Ogni viaggio inizia con un passo… il tuo inizia qui.”</p>
          </div>
          <Form className="register-form">
            {/* Nome e Cognome sulla stessa riga */}
            <Row className="mb-4">
              <Col xs={12} md={6} className="pb-sm-2 pb-md-0">
                <Form.Group controlId="FirstName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crea il tuo nome"
                    className="underline-input"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="LastName">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crea il tuo cognome"
                    className="underline-input"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Email */}
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                className="underline-input"
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Crea una password"
                className="underline-input"
              />
            </Form.Group>

            {/* Conferma Password */}
            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conferma la password"
                className="underline-input"
              />
            </Form.Group>

            {/* Bottone di registrazione */}
            <div className="d-grid mb-4">
              <Button variant="success" type="submit" id="register-button">
                Registrati
              </Button>
            </div>

            {/* Link per il login */}
            <p className="text-center" id="login-link">
              Hai già un account?{" "}
              <Link to="/login" className="navlink">
                Accedi
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterComponent;
