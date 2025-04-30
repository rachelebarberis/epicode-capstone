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

const RecensioniComponent = () => {
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
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      <Container className="mt-5 mb-5 pt-5 pb-5">
        <h2
          className="text-center mb-4"
          style={{ color: "orangered", fontWeight: "bold" }}
        >
          Recensioni
        </h2>

        <div className="text-center mb-4">
          <Button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: "orangered",
              borderColor: "orangered",
              fontWeight: "bold",
            }}
          >
            + Aggiungi Recensione
          </Button>
        </div>

        {/* MODAL */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton style={{ borderBottomColor: "orangered" }}>
            <Modal.Title>Nuova Recensione</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handlePost}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 500 }}>Commento</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={commento}
                  onChange={(e) => setCommento(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 500 }}>
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
                <Form.Label style={{ fontWeight: 500 }}>
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
            <Modal.Footer style={{ borderTopColor: "orangered" }}>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Annulla
              </Button>
              <Button
                type="submit"
                style={{
                  backgroundColor: "orangered",
                  borderColor: "orangered",
                }}
              >
                Invia
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Row className="g-4">
          {recensioni.map((recensione) => (
            <Col key={recensione.idRecensione} md={6} lg={4}>
              <Card
                style={{
                  borderColor: "transparent",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(255, 69, 0, 0.1)",
                }}
              >
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    {recensione.imgUserPath ? (
                      <Image
                        src={`https://localhost:7007/${recensione.imgUserPath}`}
                        roundedCircle
                        style={{
                          width: "60px",
                          height: "60px",
                          marginRight: "15px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          marginRight: "15px",
                          borderRadius: "50%",
                          backgroundColor: "#ffccbc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        N/A
                      </div>
                    )}
                    <div>
                      <h5 className="mb-0" style={{ color: "orangered" }}>
                        {recensione.nomeUtente}
                      </h5>
                      <small className="text-muted">
                        {recensione.createdAt
                          ? new Date(recensione.createdAt).toLocaleDateString()
                          : "Data non disponibile"}
                      </small>
                    </div>
                  </div>

                  <Card.Title style={{ fontWeight: "bold" }}>
                    <Link
                      to={`/itinerario/${recensione.idItinerario}`}
                      style={{ color: "orangered", textDecoration: "none" }}
                    >
                      {recensione.titoloItinerario}
                    </Link>
                  </Card.Title>
                  <Card.Text>{recensione.commento}</Card.Text>
                  <div className="fw-bold">
                    valutazione: {recensione.valutazione} / 5
                  </div>

                  {userEmail === recensione.email && (
                    <div className="d-flex gap-2 mt-3">
                      <Button
                        variant="outline-warning"
                        className="w-50"
                        onClick={() =>
                          alert("Funzionalità modifica non ancora implementata")
                        }
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="w-50"
                        onClick={() => handleDelete(recensione.idRecensione)}
                      >
                        <i className="bi bi-trash"></i>
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
