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
  const [selectedFascia, setSelectedFascia] = useState(null); // Fascia selezionata
  const [selectedPartenza, setSelectedPartenza] = useState(null); // Partenza selezionata
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate(); // Navigazione

  useEffect(() => {
    const fetchDettagli = async () => {
      try {
        const response = await fetch(
          `https://localhost:7007/api/Itinerario/${id}`
        );
        const data = await response.json();
        if (data.idItinerario && !data.id) data.id = data.idItinerario;
        setDettagli(data);
      } catch (error) {
        console.error("Errore nel caricamento del dettaglio:", error);
      }
    };
    fetchDettagli();
  }, [id]);

  if (!dettagli) return <div className="text-center mt-5">Caricamento...</div>;

  // Funzione per aggiungere al carrello
  const aggiungiAlCarrello = () => {
    if (selectedFascia && selectedPartenza) {
      const itinerarioSelezionato = {
        nomeItinerario: dettagli.nomeItinerario,
        immagineUrl: dettagli.immagineUrl,
        durata: dettagli.durata,
      };

      const carrelloItem = {
        itinerario: itinerarioSelezionato,
        fascia: selectedFascia,
        partenza: selectedPartenza,
      };

      // Aggiungi al carrello (localStorage)
      const carrelloSalvato =
        JSON.parse(localStorage.getItem("carrello")) || [];
      carrelloSalvato.push(carrelloItem);
      localStorage.setItem("carrello", JSON.stringify(carrelloSalvato));

      navigate("/carrello/"); //erroreeeeeeee da vedere
    } else {
      alert("Seleziona fascia di prezzo e data di partenza");
    }
  };

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

            <h5 className="mt-4"> Prezzi:</h5>
            <p className="text-danger">
              {selectedFascia ? "" : "Seleziona una fascia di prezzo"}{" "}
              {/* Messaggio di selezione fascia */}
            </p>
            <ListGroup>
              {dettagli.itinerarioFascePrezzo.map((fascia) => (
                <ListGroup.Item
                  key={fascia.idItinerarioFasciaPrezzo}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedFascia?.idItinerarioFasciaPrezzo ===
                      fascia.idItinerarioFasciaPrezzo
                        ? "#e7f1ff" // Evidenzia la fascia selezionata
                        : "transparent",
                    border:
                      selectedFascia?.idItinerarioFasciaPrezzo ===
                      fascia.idItinerarioFasciaPrezzo
                        ? "2px solid #007bff" // Aggiungi bordo alla fascia selezionata
                        : "1px solid #ccc",
                  }}
                  onClick={() => setSelectedFascia(fascia)} // Seleziona fascia
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {fascia.idFasciaDiPrezzo === 1 && <strong>Base</strong>}
                      {fascia.idFasciaDiPrezzo === 2 && <strong>Medio</strong>}
                      {fascia.idFasciaDiPrezzo === 3 && (
                        <strong>Top</strong>
                      )}: {fascia.prezzo.toFixed(2)}€
                    </div>
                    {selectedFascia?.idItinerarioFasciaPrezzo ===
                      fascia.idItinerarioFasciaPrezzo && (
                      <i className="bi bi-check" />
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            {/* Selezione Partenza */}
            <h5 className="mt-4"> Partenze disponibili:</h5>
            <p className="text-danger">
              {selectedPartenza ? "" : "Seleziona una data di partenza"}{" "}
              {/* Messaggio di selezione partenza */}
            </p>
            {dettagli.partenze.map((partenza) => (
              <Card
                className={`mb-2 border-0 bg-light ${
                  selectedPartenza === partenza.dataPartenza
                    ? "border-primary"
                    : ""
                }`}
                key={partenza.idPartenza}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedPartenza(partenza.dataPartenza)} // Seleziona partenza
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
                  {selectedPartenza === partenza.dataPartenza && (
                    <i className="bi bi-check" />
                  )}
                </Card.Body>
              </Card>
            ))}

            <Button
              variant="primary"
              className="mt-3"
              onClick={aggiungiAlCarrello}
              // Aggiungi al carrello
            >
              Aggiungi al carrello
            </Button>
          </Col>
        </Row>

        <h4 className="mt-5 mb-3 text-center"> Dettagli del tour:</h4>
        <ListGroup className="mb-4">
          {dettagli.giorni.map((giorno, index) => (
            <ListGroup.Item
              key={`${giorno.idItinerarioGiorno}-${index}`}
              className="mt-1 mb-1"
            >
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
        onDeleted={() => (window.location.href = "/Esplora")}
      />

      <UpdateItinerarioModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        itinerario={dettagli}
        onUpdated={() => (window.location.href = "/Esplora")}
      />
    </Container>
  );
};

export default ItinerarioDettagli;
