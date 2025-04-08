import { Container, Row, Col, Form, Button } from "react-bootstrap";

const RegisterComponent = () => {
  return (
    <Container fluid id="register-page">
      <Row className="justify-content-center align-items-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <div id="register-header" className="text-center mb-4">
            <h1>WanderLOst</h1>
            <p>“Un nuovo viaggio inizia con il tuo primo passo.”</p>
          </div>

          <Form>
            {/* Nome Utente */}
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Nome Utente</Form.Label>
              <Form.Control type="text" placeholder="Crea il tuo nome utente" />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci la tua email" />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Crea una password" />
            </Form.Group>

            {/* Conferma Password */}
            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conferma la password"
              />
            </Form.Group>

            {/* Bottone di registrazione */}
            <div className="d-grid mb-3">
              <Button variant="primary" type="submit" id="register-button">
                Registrati
              </Button>
            </div>

            {/* Link per il login */}
            <p className="text-center" id="login-link">
              Hai già un account? <a href="/login">Accedi</a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterComponent;
