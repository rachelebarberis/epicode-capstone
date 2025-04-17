import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Spinner,
  Modal,
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
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

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

  const confermaRimozione = (itemId) => {
    setItemToRemove(itemId);
    setShowModal(true);
  };

  const rimuoviDalCarrello = async () => {
    if (!itemToRemove) return;

    const risultato = await removeCarrelloItem(itemToRemove);
    if (risultato) {
      setCarrello((prevCarrello) =>
        prevCarrello.filter((item) => item.idCarrelloItem !== itemToRemove)
      );
    }

    setShowModal(false);
    setItemToRemove(null);
  };
  const calcolaTotale = () => {
    return carrello.reduce((acc, item) => acc + item.prezzo * item.quantita, 0);
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
            <>
              <div className="d-flex justify-content-center mt-4">
                <Button
                  variant="primary"
                  className="px-4"
                  onClick={() => navigate("/Esplora")}
                >
                  Aggiungi Itinerario
                </Button>
              </div>
              <ListGroup>
                {carrello.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={4}>
                        <img
                          src={item.immagineUrl}
                          alt="Itinerario"
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col md={8}>
                        <h5>
                          {item.nomeItinerario ||
                            "Nome itinerario non disponibile"}
                        </h5>
                        <p>
                          <strong>Prezzo:</strong> €{item.prezzo}
                        </p>
                        <p>
                          <strong>Quantità:</strong> {item.quantita}
                        </p>
                        <p>
                          <strong>Data di Partenza:</strong> {item.dataPartenza}
                        </p>
                        <Button
                          variant="danger"
                          onClick={() => confermaRimozione(item.idCarrelloItem)}
                          className="mt-2"
                        >
                          Rimuovi
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="mt-4 p-3 bg-light rounded shadow-sm text-center">
                <h4>Totale Carrello: €{calcolaTotale().toFixed(2)}</h4>
              </div>
            </>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Rimozione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler rimuovere questo itinerario dal carrello?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={rimuoviDalCarrello}>
            Rimuovi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CartComponent;
