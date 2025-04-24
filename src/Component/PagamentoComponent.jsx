import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const PagamentoComponent = () => {
  const [formData, setFormData] = useState({
    numero: "",
    nome: "",
    scadenza: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pagamento completato!"); // Simulazione di un pagamento completato
  };

  return (
    <Container className="mt-5 pt-5">
      <div className="d-flex justify-content-center mt-5">
        <div
          className="payment-form"
          style={{
            width: "400px",
            backgroundColor: "#fff5f0",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
            fontFamily: "Arial, sans-serif",
            border: "2px solid orangered",
          }}
        >
          {/* Form per i dati della carta */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNumero" className="mb-3">
              <Form.Label>Numero Carta</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                maxLength="16"
                placeholder="1234 5678 9876 5432"
                required
                style={{
                  borderRadius: "10px",
                  borderColor: "orangered",
                  padding: "12px",
                  fontSize: "16px",
                }}
              />
            </Form.Group>

            <Form.Group controlId="formNome" className="mb-3">
              <Form.Label>Nome sulla Carta</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Mario Rossi"
                required
                style={{
                  borderRadius: "10px",
                  borderColor: "orangered",
                  padding: "12px",
                  fontSize: "16px",
                }}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formScadenza" className="mb-3">
                  <Form.Label>Scadenza</Form.Label>
                  <Form.Control
                    type="text"
                    name="scadenza"
                    value={formData.scadenza}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                    style={{
                      borderRadius: "10px",
                      borderColor: "orangered",
                      padding: "12px",
                      fontSize: "16px",
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formCVV" className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="3"
                    placeholder="123"
                    required
                    style={{
                      borderRadius: "10px",
                      borderColor: "orangered",
                      padding: "12px",
                      fontSize: "16px",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Bottone di conferma pagamento */}
            <div className="d-flex justify-content-center mt-4">
              <Button
                type="submit"
                style={{
                  backgroundColor: "orangered",
                  borderColor: "orangered",
                  color: "white",
                  fontWeight: "bold",
                  padding: "12px 40px",
                  fontSize: "18px",
                  borderRadius: "25px",
                }}
              >
                Completa il pagamento
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default PagamentoComponent;
