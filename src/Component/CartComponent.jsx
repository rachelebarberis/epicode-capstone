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
    if (!email) {
      setLoading(false);
      setError("Per visualizzare il carrello, devi essere loggato.");
      navigate("/login");
      return;
    }

    try {
      const carrelloSalvato = await fetchCarrello(email);
      if (carrelloSalvato && carrelloSalvato.carrelloItems) {
        setCarrello(carrelloSalvato.carrelloItems);
      } else {
        setError("Non è stato possibile recuperare il carrello.");
      }
    } catch {
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
    <Container className="mt-5 mb-5 pt-5 pb-5">
      <h4 className="text-center mb-4" style={{ color: "orangered" }}>
        Il Tuo Carrello
      </h4>

      {error && (
        <div className="alert alert-danger text-center">
          <strong>{error}</strong>
        </div>
      )}

      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" />
              <p className="mt-3" style={{ color: "orangered" }}>
                Caricamento...
              </p>
            </div>
          ) : carrello.length === 0 ? (
            <div className="text-center">
              <h5>Il tuo carrello è vuoto.</h5>
              <p style={{ color: "#7A3E1F" }}>
                Aggiungi un itinerario per continuare.
              </p>
            </div>
          ) : (
            <>
              <ListGroup variant="flush">
                {carrello.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="py-3 border-bottom"
                    style={{ backgroundColor: "#fffaf7" }}
                  >
                    <Row className="align-items-center">
                      <Col xs={3} md={2}>
                        <img
                          src={item.immagineUrl}
                          alt="Itinerario"
                          className="img-fluid rounded"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                      </Col>
                      <Col xs={7} md={8}>
                        <h6 style={{ color: "#7A3E1F", marginBottom: "0" }}>
                          {item.nomeItinerario}
                        </h6>
                        <small style={{ color: "gray" }}>
                          Partenza: {item.dataPartenza}
                        </small>
                        <br></br>
                        <small style={{ color: "gray" }}>
                          Prezzo: {item.prezzo}€
                        </small>
                      </Col>
                      <Col xs={2} className="text-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => confermaRimozione(item.idCarrelloItem)}
                        >
                          X
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="mt-5">
                <h5 style={{ color: "orangered" }}>Riepilogo Ordine:</h5>
                <ListGroup variant="flush" className="mb-3">
                  {carrello.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex justify-content-between align-items-center py-2"
                    >
                      <div>
                        <span
                          style={{ fontWeight: "bold", color: "orangered" }}
                        >
                          x {item.quantita}
                        </span>
                        <span style={{ color: "#7A3E1F" }} className="ms-2">
                          {item.nomeItinerario}
                        </span>
                      </div>
                      <span style={{ color: "#7A3E1F" }}>{item.prezzo}€</span>{" "}
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div
                  className="p-3 rounded"
                  style={{ backgroundColor: "#fff0e6", color: "orangered" }}
                >
                  <h5 className="mb-0 text-end" style={{ color: "orangered" }}>
                    Totale da pagare: €{calcolaTotale().toFixed(2)}
                  </h5>
                </div>
              </div>

              {/* Bottone Procedi */}
              <div className="d-flex justify-content-center mt-3">
                <Button
                  variant="warning"
                  onClick={() => setShowModal(true)}
                  style={{
                    backgroundColor: "orangered",
                    borderColor: "orangered",
                    fontWeight: "600",
                    fontSize: "1rem",
                    padding: "0.6rem 2rem",
                    color: "white",
                  }}
                >
                  Procedi al Pagamento
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>

      {/* Modale Conferma Rimozione */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "orangered" }}>
            Conferma Rimozione
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler rimuovere questo itinerario?
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "orangered" }}>
            Inserisci i dati della carta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Pagamento simulato completato!");
              setShowModal(false);
            }}
          >
            <div className="mb-3">
              <label className="form-label">Numero Carta</label>
              <input
                type="text"
                className="form-control"
                maxLength="16"
                required
                placeholder="1234 5678 9876 5432"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nome Intestatario</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Mario Rossi"
              />
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">Scadenza</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength="3"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <Button
                type="submit"
                style={{
                  backgroundColor: "orangered",
                  borderColor: "orangered",
                  fontWeight: "bold",
                }}
              >
                Conferma Pagamento
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CartComponent;
