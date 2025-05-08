import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RecensioniComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const [recensioni, setRecensioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [itinerari, setItinerari] = useState([]);
  const [commento, setCommento] = useState("");
  const [valutazione, setValutazione] = useState(5);
  const [imgUser, setImgUser] = useState(null);
  const [idItinerario, setIdItinerario] = useState("");
  const [showModal, setShowModal] = useState(false);

  const API_URL = "https://localhost:7007/api/Recensioni";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recRes, itiRes] = await Promise.all([
          fetch(API_URL),
          fetch("https://localhost:7007/api/Itinerario"),
        ]);

        if (!recRes.ok || !itiRes.ok) throw new Error("Errore nei fetch");

        const [recData, itiData] = await Promise.all([
          recRes.json(),
          itiRes.json(),
        ]);

        setRecensioni(recData);
        setItinerari(itiData);
        setUserEmail(localStorage.getItem("email"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa recensione?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });

        if (!response.ok)
          throw new Error("Errore durante l'eliminazione della recensione");

        setRecensioni((prev) => prev.filter((r) => r.idRecensione !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const nomeUtente = localStorage.getItem("nomeUtente") || "";
      const imgUserPath = localStorage.getItem("imgUserPath") || null;

      const formData = new FormData();
      formData.append("Commento", commento);
      formData.append("Valutazione", valutazione);
      formData.append("IdItinerario", idItinerario);
      formData.append("UserId", userId);
      formData.append("NomeUtente", nomeUtente);
      formData.append("ImgUserPath", imgUserPath);

      if (imgUser) formData.append("ImgUser", imgUser);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error(await response.text());

      const nuovaRecensione = await response.json();
      setRecensioni((prev) => [...prev, nuovaRecensione]);
      setCommento("");
      setValutazione(5);
      setImgUser(null);
      setIdItinerario("");
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-center mt-5">Caricamento...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div id="recensioni-wrapper">
      <Container className="mt-5 mb-5 pt-5 pb-5">
        <h2 id="recensioni-titolo">Recensioni</h2>

        {isAuthenticated && userRole === "User" && (
          <div className="text-center mb-4">
            <Button id="aggiungi-btn" onClick={() => setShowModal(true)}>
              + Aggiungi Recensione
            </Button>
          </div>
        )}

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          id="itinerario-form"
        >
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">Nuova Recensione</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handlePost}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Commento</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={commento}
                  onChange={(e) => setCommento(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">
                  Valutazione (1-5)
                </Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={5}
                  value={valutazione}
                  onChange={(e) => setValutazione(parseInt(e.target.value))}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">
                  Seleziona Itinerario
                </Form.Label>
                <Form.Select
                  value={idItinerario}
                  onChange={(e) => setIdItinerario(parseInt(e.target.value))}
                  required
                >
                  <option value="">-- Seleziona un itinerario --</option>
                  {itinerari.map((itinerario) => (
                    <option
                      key={itinerario.idItinerario}
                      value={itinerario.idItinerario}
                    >
                      {itinerario.nomeItinerario}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Annulla
              </Button>
              <Button type="submit" variant="success">
                Invia
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Row className="g-4">
          {recensioni.map((recensione) => (
            <Col key={recensione.idRecensione} md={6} lg={4}>
              <Card className="card-recensione">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    {recensione.imgUserPath ? (
                      <Image
                        src={`https://localhost:7007/${recensione.imgUserPath}`}
                        roundedCircle
                        className="utente-immagine"
                      />
                    ) : (
                      <div className="utente-placeholder">N/A</div>
                    )}
                    <div>
                      <h5 className="mb-0 utente-nome">
                        {recensione.nomeUtente}
                      </h5>
                      <small className="text-muted">
                        {recensione.createdAt
                          ? new Date(recensione.createdAt).toLocaleDateString()
                          : "Data non disponibile"}
                      </small>
                    </div>
                  </div>

                  <Card.Title>
                    <Link
                      to={`/itinerario/${recensione.idItinerario}`}
                      className="itinerario-link"
                    >
                      {recensione.titoloItinerario}
                    </Link>
                  </Card.Title>
                  <Card.Text>{recensione.commento}</Card.Text>
                  <div className="fw-bold">
                    valutazione: {recensione.valutazione} / 5
                  </div>

                  {userEmail === recensione.email && (
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button
                        variant="outline-white"
                        className="w-50"
                        onClick={() => handleDelete(recensione.idRecensione)}
                      >
                        <i className="bi bi-trash text-danger"></i>
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RecensioniComponent;
