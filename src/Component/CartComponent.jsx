import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchCarrello,
  removeCarrelloItem,
} from "../Redux/Actions/carrelloAction";

const CartComponent = () => {
  const [carrello, setCarrello] = useState([]);
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const navigate = useNavigate();

  // Funzione per recuperare il carrello dall'API
  const loadCarrello = async () => {
    setLoading(true);

    // Ottieni l'email dell'utente dal localStorage o dallo stato
    const email = localStorage.getItem("email"); // Assicurati che l'email sia memorizzata al login

    if (!email) {
      console.error("Email mancante. Impossibile recuperare il carrello.");
      setLoading(false);
      return;
    }

    try {
      const carrelloSalvato = await fetchCarrello(email); // Passa l'email invece dell'ID

      if (carrelloSalvato) {
        setCarrello(carrelloSalvato);
      } else {
        console.error("Carrello vuoto o errore nel recupero");
      }
    } catch (error) {
      console.error("Errore nel recupero del carrello:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCarrello(); // Carica il carrello all'inizio
  }, []);

  // Funzione per rimuovere un item dal carrello
  const rimuoviDalCarrello = async (itemId) => {
    const risultato = await removeCarrelloItem(itemId); // Rimuovi l'item tramite API
    if (risultato) {
      setCarrello((prevCarrello) =>
        prevCarrello.filter((item) => item.id !== itemId)
      );
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Il tuo Carrello</h2>

      <Row>
        <Col>
          {loading ? (
            <div className="text-center">
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
                      <h5>{item.itinerario.nomeItinerario}</h5>
                      <p>
                        <strong>Fascia di Prezzo:</strong> {item.fascia}
                      </p>
                      <p>
                        <strong>Data di Partenza:</strong> {item.partenza}
                      </p>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Button
                        variant="danger"
                        onClick={() => rimuoviDalCarrello(item.id)} // Passa l'ID dell'item
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
