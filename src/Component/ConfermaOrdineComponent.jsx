import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";

const ConfermaOrdineComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const totale = location.state?.totale || "0.00";
  const data = location.state?.data || new Date().toLocaleString();

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 pt-5 mb-5 pb-5">
      <Card className="border border-0">
        <Card.Body className="text-center">
          <h2 style={{ color: "orangered", fontWeight: "bold" }}>
            🎉 Grazie per il tuo ordine!
          </h2>
          <p className="mt-3 fs-5 text-muted">
            Il tuo pagamento è andato a buon fine. Siamo felicissimi di poterti
            accompagnare in questa nuova avventura!
          </p>

          <div className="my-4">
            <h5 className="text-success">Totale pagato: €{totale}</h5>
            <p className="text-muted">Data ordine: {data}</p>
          </div>

          <p style={{ color: "#7A3E1F" }} className="mb-4">
            Riceverai a breve una conferma via email con tutti i dettagli. Se
            hai domande o bisogno di supporto, siamo sempre qui per aiutarti.
            Scopri come contattarci nella pagina{" "}
            <span
              style={{ color: "orangered", cursor: "pointer", fontWeight: 600 }}
              onClick={() => navigate("/Contatti")}
            >
              Contatti
            </span>
            .
          </p>

          <Button
            variant="warning"
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "orangered",
              borderColor: "orangered",
              fontWeight: "bold",
              padding: "0.6rem 2rem",
              fontSize: "1.1rem",
              color: "white",
            }}
          >
            Torna alla Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ConfermaOrdineComponent;
