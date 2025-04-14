import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { createItinerario } from "../../Redux/Actions/itinerarioActions";

const CreateItinerarioModal = ({ show, handleClose, onCreated }) => {
  const [formData, setFormData] = useState({
    nomeItinerario: "",
    durata: 1,
    immagineUrl: "",
    paese: { idPaese: 1, nome: "Giappone" }, // Imposta un valore predefinito
  });

  const [paesi, setPaesi] = useState([]); // Stato per memorizzare i paesi
  const [giorni, setGiorni] = useState([]);
  const [partenze, setPartenze] = useState([]);
  const [fascePrezzo, setFascePrezzo] = useState([
    { idFasciaDiPrezzo: 1, prezzo: "" },
    { idFasciaDiPrezzo: 2, prezzo: "" },
    { idFasciaDiPrezzo: 3, prezzo: "" },
  ]);

  // Funzione per caricare i paesi dal back-end
  const fetchPaesi = async () => {
    try {
      const response = await fetch("https://localhost:7007/api/Paese"); // Assicurati di sostituire l'URL con quello corretto
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei paesi");
      }
      const data = await response.json();
      setPaesi(data); // Memorizza i paesi
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };

  useEffect(() => {
    fetchPaesi(); // Carica i paesi quando il componente è montato
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "paeseId") {
      setFormData((prev) => ({
        ...prev,
        paese: { ...prev.paese, idPaese: parseInt(value) },
      }));
    } else if (name === "paeseNome") {
      setFormData((prev) => ({
        ...prev,
        paese: { ...prev.paese, nome: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleGiorniChange = (index, field, value) => {
    const updated = [...giorni];
    updated[index][field] = value;
    setGiorni(updated);
  };

  const handlePartenzeChange = (index, field, value) => {
    const updated = [...partenze];
    updated[index][field] = value;
    setPartenze(updated);
  };

  const handleFascePrezzoChange = (index, value) => {
    const updated = [...fascePrezzo];
    updated[index].prezzo = value;
    setFascePrezzo(updated);
  };

  const addGiorno = () => {
    setGiorni((prev) => [
      ...prev,
      { giorno: prev.length + 1, titolo: "", descrizione: "" },
    ]);
  };

  const addPartenza = () => {
    setPartenze((prev) => [
      ...prev,
      { dataPartenza: "", stato: "Disponibile" },
    ]);
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      durata: parseInt(formData.durata),
      itinerarioGiorni: giorni,
      partenze: partenze.map((p) => ({
        ...p,
      })),
      itinerarioFascePrezzo: fascePrezzo.map((f) => ({
        ...f,
        prezzo: parseFloat(f.prezzo),
      })),
      paese: formData.paese, // Usa l'oggetto paese completo nel payload
    };

    try {
      await createItinerario(payload);
      alert("Itinerario creato con successo!");
      handleClose();
      if (onCreated) onCreated();
    } catch (error) {
      alert(`Errore nella creazione: ${error.message}`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Crea nuovo Itinerario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* INFO BASE */}
          <Form.Group>
            <Form.Label>Nome Itinerario</Form.Label>
            <Form.Control
              type="text"
              name="nomeItinerario"
              value={formData.nomeItinerario}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Durata (giorni)</Form.Label>
                <Form.Control
                  type="number"
                  name="durata"
                  value={formData.durata}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Immagine URL</Form.Label>
                <Form.Control
                  type="text"
                  name="immagineUrl"
                  value={formData.immagineUrl}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Selezione Paese */}
          <Form.Group className="mt-3">
            <Form.Label>Seleziona Paese</Form.Label>
            <Form.Control
              as="select"
              name="paeseId"
              value={formData.paese.idPaese}
              onChange={handleChange}
            >
              {paesi.map((paese) => (
                <option key={paese.idPaese} value={paese.idPaese}>
                  {paese.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* GIORNI */}
          <h5 className="mt-4">Giorni del Tour</h5>
          {giorni.map((giorno, index) => (
            <div key={index} className="border p-2 mb-2 rounded">
              <Form.Label>Giorno {index + 1}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Titolo"
                value={giorno.titolo}
                onChange={(e) =>
                  handleGiorniChange(index, "titolo", e.target.value)
                }
              />
              <Form.Control
                as="textarea"
                placeholder="Descrizione"
                className="mt-2"
                value={giorno.descrizione}
                onChange={(e) =>
                  handleGiorniChange(index, "descrizione", e.target.value)
                }
              />
            </div>
          ))}
          <Button variant="outline-secondary" size="sm" onClick={addGiorno}>
            + Aggiungi Giorno
          </Button>

          {/* PARTENZE */}
          <h5 className="mt-4">Partenze</h5>
          {partenze.map((p, index) => (
            <div key={index} className="border p-2 mb-2 rounded">
              <Form.Control
                type="date"
                value={p.dataPartenza}
                onChange={(e) =>
                  handlePartenzeChange(index, "dataPartenza", e.target.value)
                }
              />
              <Form.Select
                className="mt-2"
                value={p.stato}
                onChange={(e) =>
                  handlePartenzeChange(index, "stato", e.target.value)
                }
              >
                <option value="Disponibile">Disponibile</option>
                <option value="Sold Out">Sold Out</option>
              </Form.Select>
            </div>
          ))}
          <Button variant="outline-secondary" size="sm" onClick={addPartenza}>
            + Aggiungi Partenza
          </Button>

          {/* FASCE DI PREZZO */}
          <h5 className="mt-4">Prezzi per Fascia</h5>
          {fascePrezzo.map((fascia, index) => (
            <Form.Group key={index} className="mb-2">
              <Form.Label>
                {fascia.idFasciaDiPrezzo === 1 && "Economica"}
                {fascia.idFasciaDiPrezzo === 2 && "Standard"}
                {fascia.idFasciaDiPrezzo === 3 && "Lusso"}
              </Form.Label>
              <Form.Control
                type="number"
                value={fascia.prezzo}
                onChange={(e) => handleFascePrezzoChange(index, e.target.value)}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Crea Itinerario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateItinerarioModal;
