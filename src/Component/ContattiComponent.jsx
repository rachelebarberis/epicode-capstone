import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const ContattiComponent = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    messaggio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Messaggio inviato! Ti contatteremo presto.");
    setFormData({ nome: "", email: "", messaggio: "" });
  };

  return (
    <Container className="ms-3 my-5 py-5">
      <h2 id="orange" className="text-center fw-bold mb-4">
        Contattaci
      </h2>
      <p className="text-center text-muted mb-5">
        Hai domande sui nostri itinerari o vuoi ricevere assistenza? Scrivici!
      </p>

      <Row>
        <Col md={6}>
          <Card id="contatti-card" className="mb-4">
            <Card.Body>
              <h5 id="orange" className="fw-bold">
                I nostri contatti
              </h5>
              <p>
                <strong>Email:</strong> WanderLost@gmail.com
              </p>
              <p>
                <strong>Telefono:</strong> +39 015-9756558
              </p>
              <p>
                <strong>Indirizzo:</strong> Via Cantono n.34 Biella, Italia
              </p>
              <p className="text-muted mt-4">
                Siamo sempre felici di aiutarti a pianificare la tua prossima
                avventura!
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Form onSubmit={handleSubmit} id="contatti-form">
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Il tuo nome"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="la tua email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Messaggio</Form.Label>
              <Form.Control
                as="textarea"
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                rows={4}
                placeholder="Scrivi qui il tuo messaggio..."
                required
              />
            </Form.Group>

            <div className="text-end">
              <Button type="submit" id="contatti-invia-btn">
                Invia Messaggio
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContattiComponent;
