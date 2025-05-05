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
    <Container className="pt-5 pb-5 mb-5 mt-5">
      <h2 className="text-center mb-4" style={{ color: "orangered" }}>
        Contattaci
      </h2>
      <p className="text-center text-muted mb-5">
        Hai domande sui nostri itinerari o vuoi ricevere assistenza? Scrivici!
      </p>

      <Row>
        <Col md={6}>
          <Card
            className="mb-4"
            style={{ backgroundColor: "#fff5f0", border: "none" }}
          >
            <Card.Body>
              <h5 style={{ color: "orangered" }}>I nostri contatti</h5>
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
          <Form onSubmit={handleSubmit}>
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
              <Button
                type="submit"
                style={{
                  backgroundColor: "orangered",
                  borderColor: "orangered",
                  fontWeight: "bold",
                }}
              >
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
