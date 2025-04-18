import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../Redux/Actions/authActions";
import { useDispatch } from "react-redux";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLoggedIn = await dispatch(login(email, password));

    if (isLoggedIn) {
      navigate("/");
    } else {
      alert("Login fallito");
    }
  };

  return (
    <>
      <Container
        fluid
        id="login-page"
        className="d-flex justify-content-center align-items-center mt-5 pt-5"
      >
        <Row className="w-100 justify-content-center">
          <Col xs={10} sm={8} md={6} lg={4}>
            <div id="login-header" className="text-center mb-5">
              <h1 className="text-primary  fw-bolder">WanderLOst</h1>
              <p className="text-success">
                “Ogni viaggio inizia con un passo… il tuo inizia qui.”
              </p>
            </div>

            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Inserisci la tua email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="underline-input"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Inserisci la tua password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="underline-input"
                />
              </Form.Group>

              <div className="d-grid mb-4">
                <Button variant="success" type="submit" id="login-button">
                  Entra nel mondo
                </Button>
              </div>

              <p className="text-center" id="register-link">
                Non hai un account?{" "}
                <Link to="/Register" className="navlink text-primary">
                  Registrati!
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
      <div
        style={{
          backgroundImage: "url('/images/heroimg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          minHeight: "130px",
          width: "100%",
        }}
      ></div>
    </>
  );
};

export default LoginComponent;
