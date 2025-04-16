import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchCarrello,
  removeCarrelloItem,
} from "../Redux/Actions/carrelloAction";

const CartComponent = () => {
  const [carrello, setCarrello] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadCarrello = async () => {
    setLoading(true);
    setError(null);

    const email = localStorage.getItem("email");
    console.log("Email nel localStorage:", email);

    if (!email) {
      console.error("Email mancante. Impossibile recuperare il carrello.");
      setLoading(false);
      setError("Per visualizzare il carrello, devi essere loggato.");
      navigate("/login");
      return;
    }

    try {
      const carrelloSalvato = await fetchCarrello(email);
      console.log("Carrello recuperato:", carrelloSalvato);

      if (carrelloSalvato && carrelloSalvato.carrelloItems) {
        setCarrello(carrelloSalvato.carrelloItems); // Imposta solo gli articoli del carrello
      } else {
        console.error("Carrello vuoto o errore nel recupero");
        setError("Non è stato possibile recuperare il carrello.");
      }
    } catch (error) {
      console.error("Errore nel recupero del carrello:", error);
      setError("Errore nel recupero del carrello. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCarrello();
  }, []);

  const rimuoviDalCarrello = async (itemId) => {
    const risultato = await removeCarrelloItem(itemId);
    if (risultato) {
      setCarrello(
        (prevCarrello) =>
          prevCarrello.filter((item) => item.idCarrelloItem !== itemId) // Filtra per idCarrelloItem
      );
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Il tuo Carrello</h2>

      {error && (
        <div className="alert alert-danger text-center">
          <strong>{error}</strong>
        </div>
      )}

      <Row>
        <Col>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" />
              <h4>Caricamento...</h4>
            </div>
          ) : carrello.length === 0 ? (
            <div className="text-center">
              <h4>Il tuo carrello è vuoto.</h4>
              <p>Aggiungi un itinerario per continuare.</p>
            </div>
          ) : (
            <ListGroup>
              {carrello.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={8}>
                      <h5>
                        {item.itinerario?.nomeItinerario ||
                          "Nome itinerario non disponibile"}
                      </h5>
                      <p>
                        <strong>Fascia di Prezzo:</strong> {item.fasciadiPrezzo}
                      </p>
                      <p>
                        <strong>Data di Partenza:</strong> {item.datapartenza}
                      </p>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Button
                        variant="danger"
                        onClick={() => rimuoviDalCarrello(item.idCarrelloItem)} // Usa idCarrelloItem
                      >
                        Rimuovi
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>

      {carrello.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="success"
            className="px-4"
            onClick={() => navigate("/checkout")}
          >
            Procedi al pagamento
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CartComponent;
