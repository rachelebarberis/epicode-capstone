import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const userEmail = useSelector((state) => state.auth.user); // email da Redux
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDettagli = async () => {
      try {
        const res = await fetch(`https://localhost:7007/api/Itinerario/${id}`);
        const data = await res.json();
        data.id = data.id ?? data.idItinerario; // fallback
        setDettagli(data);
      } catch (error) {
        console.error("Errore nel caricamento del dettaglio:", error);
      }
    };
    fetchDettagli();
  }, [id]);
  const auth = useSelector((state) => state.auth);
  console.log("Stato auth:", auth);
  const aggiungiAlCarrello = async () => {
    if (!selectedFascia || !selectedPartenza) {
      alert("Seleziona fascia di prezzo e data di partenza");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Devi essere loggato per aggiungere l'itinerario al carrello.");
      return;
    }

    const itinerarioSelezionato = {
      idItinerario: dettagli.idItinerario,
      idItinerarioFasciaPrezzo: selectedFascia.idItinerarioFasciaPrezzo,
      idPartenza: selectedPartenza.idPartenza,
      prezzo: selectedFascia.prezzo,
      quantita: 1,
    };

    // Qui inizializziamo la variabile request
    const request = JSON.stringify({
      userEmail, // L'email dell'utente deve essere correttamente valorizzata
      carrelloItems: [itinerarioSelezionato],
    });

    console.log("Dati inviati:", {
      userEmail,
      carrelloItems: [itinerarioSelezionato],
    });

    console.log("Richiesta JSON:", request); // Ora viene loggato dopo che è stato inizializzato

    try {
      const response = await fetch("https://localhost:7007/api/carrello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: request,
      });

      if (response.ok) {
        navigate("/carrello");
      } else {
        alert("Errore nell'aggiungere l'itinerario al carrello.");
      }
    } catch (error) {
      console.error("Errore nell'invio della richiesta:", error);
      alert("Errore nell'invio della richiesta.");
    }
  };

  if (!dettagli) return <div className="text-center mt-5">Caricamento...</div>;

  return (
    <Container className="mt-5 pt-5 pb-5">
      <Card className="p-4 mb-5 bg-transparent border-0">
        <Row>
          <Col md={5}>
            <Card.Img
              src={dettagli.immagineUrl}
              alt={dettagli.nomeItinerario}
              className="rounded w-100"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </Col>

          <Col md={7}>
            <h2 className="mb-3">{dettagli.nomeItinerario}</h2>
            <p className="text-muted">{dettagli.descrizione}</p>
            <p>
              <strong>Durata:</strong> {dettagli.durata} giorni
            </p>

            <h5 className="mt-4">Prezzi:</h5>
            <p className="text-danger">
              {!selectedFascia && "Seleziona una fascia di prezzo"}
            </p>
            <ListGroup>
              {dettagli.itinerarioFascePrezzo?.map((fascia) => (
                <ListGroup.Item
                  key={fascia.idItinerarioFasciaPrezzo}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedFascia?.idItinerarioFasciaPrezzo ===
                      fascia.idItinerarioFasciaPrezzo
                        ? "#e7f1ff"
                        : "transparent",
                    border:
                      selectedFascia?.idItinerarioFasciaPrezzo ===
                      fascia.idItinerarioFasciaPrezzo
                        ? "2px solid #007bff"
                        : "1px solid #ccc",
                  }}
                  onClick={() => setSelectedFascia(fascia)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>
                        {fascia.idFasciaDiPrezzo === 1
                          ? "Base"
                          : fascia.idFasciaDiPrezzo === 2
                          ? "Medio"
                          : "Top"}
                      </strong>
                      : {fascia.prezzo.toFixed(2)}€
                    </div>
                    {selectedFascia?.idItinerarioFasciaPrezzo ===
                      fascia.idItinerarioFasciaPrezzo && (
                      <i className="bi bi-check" />
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <h5 className="mt-4">Partenze disponibili:</h5>
            <p className="text-danger">
              {!selectedPartenza && "Seleziona una data di partenza"}
            </p>
            {dettagli.partenze?.map((partenza) => (
              <Card
                key={partenza.idPartenza}
                className={`mb-2 border-0 bg-light ${
                  selectedPartenza?.idPartenza === partenza.idPartenza
                    ? "border-primary"
                    : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedPartenza(partenza)}
              >
                <Card.Body className="py-2 px-3 d-flex justify-content-between">
                  <span>
                    <strong>Data:</strong> {partenza.dataPartenza}
                  </span>
                  <Badge
                    bg={partenza.stato === "Disponibile" ? "success" : "danger"}
                  >
                    {partenza.stato}
                  </Badge>
                  {selectedPartenza?.idPartenza === partenza.idPartenza && (
                    <i className="bi bi-check" />
                  )}
                </Card.Body>
              </Card>
            ))}

            <Button
              variant="primary"
              className="mt-3"
              onClick={aggiungiAlCarrello}
            >
              Aggiungi al carrello
            </Button>
          </Col>
        </Row>

        <h4 className="mt-5 mb-3 text-center">Dettagli del tour:</h4>
        <ListGroup className="mb-4">
          {dettagli.giorni?.map((giorno, index) => (
            <ListGroup.Item key={index} className="mt-1 mb-1">
              <h5 className="mb-1">
                Giorno {giorno.giorno}: {giorno.titolo}
              </h5>
              <p className="mb-0 text-muted">{giorno.descrizione}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {isAuthenticated && userRole === "Admin" && (
          <div className="d-flex gap-3">
            <Button variant="warning" onClick={() => setShowUpdateModal(true)}>
              Modifica
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Elimina
            </Button>
          </div>
        )}
      </Card>

      {/* Modali */}
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
