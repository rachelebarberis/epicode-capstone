import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginComponent = () => {
  return (
    <Container fluid id="login-page">
      <Row className="justify-content-center align-items-center ">
        <Col xs={10} sm={8} md={6} lg={4}>
          <div id="login-header" className="text-center mb-4">
            <h1>WanderLOst</h1>
            <p>“Ogni viaggio inizia con un passo… il tuo inizia qui.”</p>
          </div>

          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci la tua email" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <div className="d-grid mb-3">
              <Button variant="primary" type="submit" id="login-button">
                Entra nel mondo
              </Button>
            </div>

            <p className="text-center" id="register-link">
              Non hai un account?{" "}
              <Link to="/Register" className="navlink">
                Registrati!
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
