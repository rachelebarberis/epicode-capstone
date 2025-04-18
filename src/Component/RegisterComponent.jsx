import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterComponent = () => {
  return (
    <>
      {" "}
      <div
        style={{
          backgroundImage: "url('/images/heroimg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          minHeight: "180px",
          width: "100%",
        }}
      ></div>
      <Container
        fluid
        id="register-page"
        className="d-flex justify-content-center align-items-center mt-5 pt-5 mb-5"
      >
        <Row className="w-100 justify-content-center">
          <Col xs={10} sm={8} md={6} lg={4}>
            <div id="register-header" className="text-center mb-5">
              <h1 className="text-primary fw-bolder">WanderLOst</h1>
              <p className="text-success fw-bold">
                “Un nuovo viaggio inizia con il tuo primo passo.”
              </p>
            </div>

            <Form className="register-form">
              {/* Nome Utente */}
              <Form.Group className="mb-4" controlId="formUsername">
                <Form.Label>Nome Utente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Crea il tuo nome utente"
                  className="underline-input"
                />
              </Form.Group>

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
                <Link to="/login" className="navlink text-primary">
                  Accedi
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterComponent;
