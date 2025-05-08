import React, { useEffect, useState } from "react";
import {
  getPaesi,
  createPaese,
  deletePaese,
} from "../Redux/Actions/paeseAction";
import { Container, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaeseComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  const [paesi, setPaesi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPaese, setNewPaese] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paeseToDelete, setPaeseToDelete] = useState(null);

  const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

  const fetchPaesi = async () => {
    setLoading(true);
    try {
      const data = await getPaesi();
      setPaesi(data);
    } catch (err) {
      setErrore(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaesi();
  }, []);

  const handleAddPaese = async () => {
    try {
      await createPaese({ nome: newPaese });
      setShowAddModal(false);
      setNewPaese("");
      fetchPaesi();
    } catch {
      alert("Errore durante la creazione del Paese");
    }
  };

  const handleDeletePaese = async () => {
    try {
      await deletePaese(paeseToDelete);
      setShowDeleteModal(false);
      setPaeseToDelete(null);
      fetchPaesi();
    } catch {
      alert("Errore durante l'eliminazione del Paese");
    }
  };

  const filteredAndSortedPaesi = paesi
    .filter((paese) => {
      const nameLower = paese.nome.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = nameLower.includes(searchLower);
      const matchesLetter = selectedLetter
        ? paese.nome.toUpperCase().startsWith(selectedLetter)
        : true;
      return matchesSearch && matchesLetter;
    })
    .sort((a, b) => a.nome.localeCompare(b.nome));

  if (loading)
    return <div className="text-center mt-5">Caricamento in corso...</div>;
  if (errore)
    return <div className="alert alert-danger mt-5">Errore: {errore}</div>;

  return (
    <Container className="mt-5  pb-5 mb-5 pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-orange">Lista dei Paesi</h2>
        {isAuthenticated && userRole === "Admin" && (
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            + Aggiungi Paese
          </Button>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div className="alphabet-bar d-flex flex-wrap">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`alphabet-button ${
                selectedLetter === letter ? "active" : ""
              }`}
              onClick={() =>
                setSelectedLetter(letter === selectedLetter ? "" : letter)
              }
            >
              {letter}
            </button>
          ))}
        </div>
        {(selectedLetter || searchTerm) && (
          <Button
            variant="outline-warning"
            className="reset-button"
            onClick={() => {
              setSelectedLetter("");
              setSearchTerm("");
            }}
          >
            Tutti i Paesi
          </Button>
        )}
      </div>
      <div className="d-flex justify-content-end align-items-center mt-1 mb-3 ">
        <InputGroup className="search-box" style={{ width: "300px" }}>
          <Form.Control
            placeholder="Cerca paese per nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: "20px",
              border: "2px solid orangered",
              padding: "8px 12px",
            }}
          />
        </InputGroup>
      </div>

      {filteredAndSortedPaesi.length > 0 ? (
        <ul className="list-group">
          {filteredAndSortedPaesi.map((paese) => (
            <li
              id="lista-paesi"
              key={paese.idPaese}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                borderLeft: "5px solid orangered",
                borderRadius: "0.5rem",
                marginBottom: "10px",
              }}
            >
              <span className="fw-bold">{paese.nome}</span>
              <div className="d-flex gap-2 align-items-center">
                {isAuthenticated && userRole === "User" && (
                  <Link
                    to={`/paese/${paese.nome}`}
                    className="btn btn-sm fw-bold"
                    style={{
                      background: "linear-gradient(135deg, orangered, #FF5722)",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                      padding: "0.3rem 1rem",
                    }}
                  >
                    Vai agli itinerari
                  </Link>
                )}
                {isAuthenticated && userRole === "Admin" && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      setPaeseToDelete(paese.idPaese);
                      setShowDeleteModal(true);
                    }}
                    style={{
                      background: "linear-gradient(135deg, orangered, #FF5722)",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                      padding: "0.3rem 1rem",
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-4">Nessun paese trovato.</div>
      )}

      {/* Modale Aggiunta */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        id="itinerario-form"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Aggiungi Paese</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label className="form-label">Nome del Paese</Form.Label>
            <Form.Control
              type="text"
              value={newPaese}
              onChange={(e) => setNewPaese(e.target.value)}
              placeholder="Inserisci il nome"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annulla
          </Button>
          <Button
            variant="success"
            onClick={handleAddPaese}
            disabled={!newPaese.trim()}
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modale Conferma Eliminazione */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        id="itinerario-form"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            Conferma Eliminazione
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questo paese?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDeletePaese}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaeseComponent;
