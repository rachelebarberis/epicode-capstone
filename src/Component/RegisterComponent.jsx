import { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    message: "",
    onClose: null,
  });

  const navigate = useNavigate();

  const showModal = (title, message, onClose = null) => {
    setModalInfo({ show: true, title, message, onClose });
  };

  const closeModal = () => {
    setModalInfo((prev) => {
      if (prev.onClose) prev.onClose();
      return { ...prev, show: false };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showModal("Errore", "Le password non coincidono!");
      return;
    }

    const payload = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch(
        "https://localhost:7007/api/Account/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        showModal(
          "Registrazione completata",
          "Registrazione avvenuta con successo!",
          () => navigate("/login")
        );
      } else {
        showModal("Errore", "Errore durante la registrazione.");
      }
    } catch (error) {
      console.error("Errore:", error);
      showModal(
        "Errore di rete",
        "Si è verificato un errore di rete durante la registrazione."
      );
    }
  };

  return (
    <>
      <Container
        fluid
        id="register-page"
        className="d-flex justify-content-center align-items-center mt-5 pt-5"
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div id="register-header" className="text-center">
              <h1 className="fw-bolder">WanderLOst</h1>
              <p>“Ogni viaggio inizia con un passo… il tuo inizia qui.”</p>
            </div>
            <Form className="register-form" onSubmit={handleRegister}>
              <Row className="mb-4">
                <Col xs={12} md={6} className="pb-sm-2 pb-md-0">
                  <Form.Group controlId="FirstName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Crea il tuo nome"
                      className="underline-input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
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
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Inserisci la tua email"
                  className="underline-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Crea una password"
                  className="underline-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formConfirmPassword">
                <Form.Label>Conferma Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Conferma la password"
                  className="underline-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid mb-4">
                <Button variant="success" type="submit" id="register-button">
                  Registrati
                </Button>
              </div>

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

      {/* Modale */}
      <Modal show={modalInfo.show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalInfo.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterComponent;
