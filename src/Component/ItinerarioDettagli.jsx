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
import { getItinerarioById } from "../Redux/Actions/itinerarioActions";
import { createCarrello } from "../Redux/Actions/carrelloAction";

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
        const data = await getItinerarioById(id);
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

    const itinerarioSelezionato = {
      idItinerario: dettagli.idItinerario,
      idItinerarioFasciaPrezzo: selectedFascia.idItinerarioFasciaPrezzo,
      idPartenza: selectedPartenza.idPartenza,
      prezzo: selectedFascia.prezzo,
      quantita: 1,
    };

    try {
      await createCarrello({
        userEmail,
        carrelloItems: [itinerarioSelezionato],
      });
      navigate("/carrello");
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
      <Card className="border border-0 pb-5 bg-transparent">
        <Row>
          {isAuthenticated && userRole === "Admin" && (
            <div className="d-flex justify-content-end gap-2 mt-2">
              <Button
                id="btn-modifica"
                onClick={() => setShowUpdateModal(true)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button id="btn-elimina" onClick={() => setShowDeleteModal(true)}>
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          )}
          <Col lg={5} className="pt-3 pb-sm-2 pb-lg-0">
            <Card.Img
              id="img-itinerario"
              src={dettagli.immagineUrl || "/images/default-tour.jpg"}
              alt={dettagli.nomeItinerario}
              className="rounded-4 w-100"
            />
          </Col>

          <Col lg={7} className="text-center text-lg-start">
            <h2 className="fw-bold" id="orange">
              {dettagli.nomeItinerario}
            </h2>
            <p className="fw-medium text-center">
              <strong>Durata:</strong> {dettagli.durata} giorni
            </p>

            <h5 className="text-center" id="orange">
              Fasce di Prezzo
            </h5>
            {isAuthenticated && userRole === "User" && (
              <h5 className="mt-4" id="orange">
                Scegli la fascia di prezzo:
              </h5>
            )}
            <ListGroup className="mb-3">
              {dettagli.itinerarioFascePrezzo?.map((fascia) => (
                <ListGroup.Item
                  key={fascia.idItinerarioFasciaPrezzo}
                  onClick={() => setSelectedFascia(fascia)}
                  className={`rounded-3 mb-2 border-2 custom-fascia ${
                    selectedFascia?.idItinerarioFasciaPrezzo ===
                    fascia.idItinerarioFasciaPrezzo
                      ? "selected-fascia"
                      : ""
                  }`}
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

            <h5 className="text-center" id="orange">
              Partenze:
            </h5>
            {isAuthenticated && userRole === "User" && (
              <h5 className="mt-4" id="orange">
                Seleziona una partenza:
              </h5>
            )}
            <Row>
              {dettagli.partenze?.map((partenza) => (
                <Col xs={12} md={6} key={partenza.idPartenza}>
                  <Card
                    onClick={() => setSelectedPartenza(partenza)}
                    className={`rounded-3 mt-2 custom-partenza ${
                      selectedPartenza?.idPartenza === partenza.idPartenza
                        ? "selected-partenza"
                        : ""
                    }`}
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
                  className="rounded-pill mt-4 px-4 fw-bold text-white"
                  id="btn-carrello"
                  onClick={aggiungiAlCarrello}
                >
                  <i className="bi bi-cart-plus me-2"></i> Aggiungi al Carrello
                </Button>
              </div>
            )}
          </Col>
        </Row>

        <hr className="w-100 mt-5 custom-divider" />

        <h4 className="text-center mt-5 fw-bold" id="orange">
          Programma Giornaliero
        </h4>
        <ListGroup className="mt-3">
          {dettagli.giorni?.map((giorno, idx) => (
            <ListGroup.Item key={idx} className="rounded-3 my-2 shadow-sm">
              <h5 className="fw-bold mb-1" id="orange">
                Giorno {giorno.giorno}: {giorno.titolo}
              </h5>
              <p className="text-muted mb-0">{giorno.descrizione}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
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
