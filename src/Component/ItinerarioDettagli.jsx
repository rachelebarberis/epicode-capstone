import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import DeleteItinerarioModal from "./ItinerarioAdmin/DeleteItinerarioModal";
import UpdateItinerarioModal from "./ItinerarioAdmin/UpdateItinerarioModal";

const ItinerarioDettagli = () => {
  const { id } = useParams();
  const [dettagli, setDettagli] = useState(null);
  const [selectedFascia, setSelectedFascia] = useState(null);
  const [selectedPartenza, setSelectedPartenza] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const userEmail = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDettagli = async () => {
      try {
        const res = await fetch(`https://localhost:7007/api/Itinerario/${id}`);
        const data = await res.json();
        setDettagli(data);
      } catch (error) {
        console.error("Errore nel caricamento del dettaglio:", error);
      }
    };
    fetchDettagli();
  }, [id]);

  const aggiungiAlCarrello = async () => {
    if (!selectedFascia || !selectedPartenza) {
      alert("Seleziona fascia di prezzo e data di partenza");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Devi essere loggato per aggiungere al carrello.");
      return;
    }
    const itinerarioSelezionato = {
      idItinerario: dettagli.idItinerario,
      idItinerarioFasciaPrezzo: selectedFascia.idItinerarioFasciaPrezzo,
      idPartenza: selectedPartenza.idPartenza,
      prezzo: selectedFascia.prezzo,
      quantita: 1,
    };
    try {
      const response = await fetch("https://localhost:7007/api/carrello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail,
          carrelloItems: [itinerarioSelezionato],
        }),
      });
      if (response.ok) navigate("/carrello");
      else alert("Errore nell'aggiungere al carrello.");
    } catch (error) {
      console.error("Errore:", error);
      alert("Errore nell'invio della richiesta.");
    }
  };

  if (!dettagli) return <div className="text-center mt-5">Caricamento...</div>;

  return (
    <Container className="mt-5 pt-5 pb-5">
      <div>
        <Link to="/Esplora">
          <i className="bi bi-arrow-left fs-4 text-black"></i>
        </Link>
      </div>
      <Card className="border border-0 pb-5">
        <Row>
          {isAuthenticated && userRole === "Admin" && (
            <div className="d-flex justify-content-end gap-1 mt-2">
              <Button
                variant="outline-warning"
                onClick={() => setShowUpdateModal(true)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          )}
          <Col lg={5} className="pt-3 pb-sm-2 pb-lg-0">
            <Card.Img
              src={dettagli.immagineUrl || "/images/default-tour.jpg"}
              alt={dettagli.nomeItinerario}
              className="rounded-4 w-100"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </Col>

          <Col lg={7} className="text-center text-lg-start">
            <h2 className="fw-bold" style={{ color: "#FF4500" }}>
              {dettagli.nomeItinerario}
            </h2>

            <p className="fw-medium text-center">
              <strong>Durata:</strong> {dettagli.durata} giorni
            </p>
            <h5 className="text-center" style={{ color: "#FF4500" }}>
              Fasce di Prezzo
            </h5>
            {isAuthenticated && userRole === "User" && (
              <h5 className="mt-4" style={{ color: "#FF5722" }}>
                Scegli la fascia di prezzo:
              </h5>
            )}
            <ListGroup className="mb-3">
              {dettagli.itinerarioFascePrezzo?.map((fascia) => (
                <ListGroup.Item
                  key={fascia.idItinerarioFasciaPrezzo}
                  onClick={() => setSelectedFascia(fascia)}
                  className={`rounded-3 mb-2 border-2 ${
                    selectedFascia?.idItinerarioFasciaPrezzo ===
                    fascia.idItinerarioFasciaPrezzo
                      ? "border-warning"
                      : "border-light"
                  }`}
                  style={{ cursor: "pointer", backgroundColor: "#fff7f0" }}
                >
                  <div className="d-flex flex-column mb-3">
                    <small className="text-muted mb-1">
                      {fascia.idFasciaDiPrezzo === 1
                        ? "Sistemazioni economiche. Pernottamenti presso ostelli o hotel economici, voli con possibili scali lunghi e spostamenti durante il viaggio tramite mezzi di trasporto pubblico"
                        : fascia.idFasciaDiPrezzo === 2
                        ? "Hotel 3 stelle, voli discreti, comfort moderato per rapporto qualità prezzo"
                        : "Hotel premium, voli diretti o ottimali, transfer inclusi"}
                    </small>

                    <div className="d-flex justify-content-between">
                      <span>
                        <strong>
                          {fascia.idFasciaDiPrezzo === 1
                            ? "Base"
                            : fascia.idFasciaDiPrezzo === 2
                            ? "Medio"
                            : "Top"}
                        </strong>
                        : {fascia.prezzo.toFixed(2)}€
                      </span>
                      {selectedFascia?.idItinerarioFasciaPrezzo ===
                        fascia.idItinerarioFasciaPrezzo && (
                        <i className="bi bi-check-circle-fill text-success" />
                      )}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <h5 className="text-center" style={{ color: "#FF4500" }}>
              Partenze:
            </h5>
            {isAuthenticated && userRole === "User" && (
              <h5 className="mt-4" style={{ color: "#FF5722" }}>
                Seleziona una partenza:
              </h5>
            )}
            <Row>
              {dettagli.partenze?.map((partenza) => (
                <Col xs={12} md={6} key={partenza.idPartenza}>
                  <Card
                    onClick={() => setSelectedPartenza(partenza)}
                    className={`rounded-3 mt-2   ${
                      selectedPartenza?.idPartenza === partenza.idPartenza
                        ? "border-warning border-2"
                        : "border-light"
                    }`}
                    style={{ cursor: "pointer", backgroundColor: "#fff7f0" }}
                  >
                    <Card.Body className="d-flex justify-content-between align-items-center p-1">
                      <span>
                        <strong>{partenza.dataPartenza}</strong>
                      </span>
                      <Badge
                        bg={
                          partenza.stato === "Disponibile"
                            ? "success"
                            : "danger"
                        }
                      >
                        {partenza.stato}
                      </Badge>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            {isAuthenticated && userRole === "User" && (
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="rounded-pill mt-4 px-4 fw-bold text-white"
                  onClick={aggiungiAlCarrello}
                  style={{ backgroundColor: "#FF4500", border: "none" }}
                >
                  <i className="bi bi-cart-plus me-2"></i> Aggiungi al Carrello
                </Button>
              </div>
            )}
          </Col>
        </Row>
        <hr
          className="w-100 mt-5"
          style={{ color: "#FF5722", border: "2px solid" }}
        ></hr>
        <h4 className="text-center mt-5 fw-bold" style={{ color: "#FF5722" }}>
          Programma Giornaliero
        </h4>
        <ListGroup className="mt-3">
          {dettagli.giorni?.map((giorno, idx) => (
            <ListGroup.Item key={idx} className="rounded-3 my-2 shadow-sm">
              <h5 className="fw-bold mb-1" style={{ color: "#FF4500" }}>
                Giorno {giorno.giorno}: {giorno.titolo}
              </h5>
              <p className="text-muted mb-0">{giorno.descrizione}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {isAuthenticated && userRole === "Admin" && (
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button
              variant="outline-warning"
              onClick={() => setShowUpdateModal(true)}
            >
              Modifica
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Elimina
            </Button>
          </div>
        )}
      </Card>

      <DeleteItinerarioModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        id={id}
        onDeleted={() => navigate("/Esplora")}
      />

      <UpdateItinerarioModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        itinerario={dettagli}
        onUpdated={() => navigate("/Esplora")}
      />
    </Container>
  );
};

export default ItinerarioDettagli;
