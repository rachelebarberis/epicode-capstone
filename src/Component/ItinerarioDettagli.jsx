import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
            {dettagli.itinerarioFascePrezzo.map((fascia) => (
              <Card
                className="mb-2 border-0 bg-transparent"
                key={fascia.idItinerarioFasciaPrezzo}
              >
                <Card.Body className="py-2 px-3">
                  {fascia.idFasciaDiPrezzo === 1 && (
                    <>
                      <strong>Base</strong>: sistemazioni semplici ed
                      economiche, spostamenti con mezzi pubblici e possibilità
                      di voli con scali o più lunghi.
                    </>
                  )}
                  {fascia.idFasciaDiPrezzo === 2 && (
                    <>
                      <strong>Medio</strong>: un buon compromesso tra comfort e
                      prezzo, con hotel di livello medio e spostamenti più
                      agevoli.
                    </>
                  )}
                  {fascia.idFasciaDiPrezzo === 3 && (
                    <>
                      <strong>Top</strong>: alloggi di alta qualità,
                      trasferimenti comodi e voli diretti o brevi per il massimo
                      del comfort.
                    </>
                  )}
                  <div className="mt-1 text-muted">
                    Prezzo: <strong>€{fascia.prezzo.toFixed(2)}</strong>
                  </div>
                </Card.Body>
              </Card>
            ))}

            <h5 className="mt-4"> Partenze disponibili:</h5>
            {dettagli.partenze.map((partenza) => (
              <Card
                className="mb-2 border-0 bg-light"
                key={partenza.idPartenza}
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
                </Card.Body>
              </Card>
            ))}
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
