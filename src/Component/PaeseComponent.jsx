import React, { useEffect, useState } from "react";
import {
  getPaesi,
  createPaese,
  deletePaese,
} from "../Redux/Actions/paeseAction";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const PaeseComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const [paesi, setPaesi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPaese, setNewPaese] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paeseToDelete, setPaeseToDelete] = useState(null);

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

  if (loading)
    return <div className="text-center mt-5">Caricamento in corso...</div>;
  if (errore)
    return <div className="alert alert-danger mt-5">Errore: {errore}</div>;

  return (
    <Container className="mt-5 pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista dei Paesi</h2>
        {isAuthenticated && userRole === "Admin" && (
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            + Aggiungi Paese
          </Button>
        )}
      </div>

      <ul className="list-group">
        {paesi.map((paese) => (
          <li
            key={paese.idPaese}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{paese.nome}</span>
            <div>
              {isAuthenticated && userRole === "Admin" && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    setPaeseToDelete(paese.idPaese);
                    setShowDeleteModal(true);
                  }}
                >
                  Elimina
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Modale Aggiunta */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Paese</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome del Paese</Form.Label>
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
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
