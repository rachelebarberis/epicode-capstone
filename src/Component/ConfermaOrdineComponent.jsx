import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";

const ConfermaOrdineComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const totale = location.state?.totale || "0.00";
  const data = location.state?.data || new Date().toLocaleString();

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center  pt-3 mb-5 pb-5"
      id="conferma-container"
    >
      <Card className="border-0 " id="conferma-card">
        <Card.Body className="text-center">
          <h2 id="conferma-titolo">Grazie per il tuo ordine!</h2>

          <p className="mt-3 fs-5 text-muted">
            Il tuo pagamento è andato a buon fine. Siamo felicissimi di poterti
            accompagnare in questa nuova avventura!
          </p>

          <div className="my-4" id="conferma-info">
            <h5 className="text-success">Totale pagato: €{totale}</h5>
            <p className="text-muted">Data ordine: {data}</p>
          </div>

          <p className="mb-4" id="conferma-dettagli">
            Riceverai a breve una conferma via email con tutti i dettagli. Se
            hai domande o bisogno di supporto, siamo sempre qui per aiutarti.
            Scopri come contattarci nella pagina{" "}
            <span
              id="link-contatti"
              onClick={() => navigate("/Contatti")}
              role="button"
            >
              Contatti
            </span>
            .
          </p>

          <Button
            id="btn-home"
            onClick={() => navigate("/")}
            className="fw-bold px-4 py-2"
          >
            Torna alla Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ConfermaOrdineComponent;
