import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { updateItinerario } from "../../Redux/Actions/itinerarioActions";

const UpdateItinerarioModal = ({
  show,
  handleClose,
  itinerario,
  onUpdated,
}) => {
  const [formData, setFormData] = useState({
    idItinerario: 1,
    nomeItinerario: "",
    durata: 1,
    immagineUrl: "",
    paeseId: 1,
    paeseNome: "", // Aggiungiamo anche il nome del paese
  });

  const [giorni, setGiorni] = useState([]);
  const [partenze, setPartenze] = useState([]);
  const [fascePrezzo, setFascePrezzo] = useState([
    { idFasciaDiPrezzo: 1, prezzo: "" },
    { idFasciaDiPrezzo: 2, prezzo: "" },
    { idFasciaDiPrezzo: 3, prezzo: "" },
  ]);

  // Quando l'itinerario viene passato, imposta i valori nei campi
  useEffect(() => {
    console.log("Itinerario passato:", itinerario); // Log per verificare il valore di itinerario
    if (itinerario) {
      setFormData({
        idItinerario: itinerario.idItinerario || "",
        nomeItinerario: itinerario.nomeItinerario || "",
        durata: itinerario.durata || 1,
        immagineUrl: itinerario.immagineUrl || "",
        paeseId: itinerario.paese.idPaese || 1, // Assicurati che paeseId venga passato correttamente
        paeseNome: itinerario.paese.nome || "", // Assicurati che nome venga passato correttamente
      });

      const giorniFormattati = (itinerario.giorni || []).map((g, i) => ({
        giorno: g.giorno ?? i + 1,
        titolo: g.titolo ?? "",
        descrizione: g.descrizione ?? "",
      }));

      setGiorni(giorniFormattati);
      setPartenze(itinerario.partenze || []);
      setFascePrezzo(
        itinerario.itinerarioFascePrezzo || [
          { idFasciaDiPrezzo: 1, prezzo: "" },
          { idFasciaDiPrezzo: 2, prezzo: "" },
          { idFasciaDiPrezzo: 3, prezzo: "" },
        ]
      );
    }
  }, [itinerario]);

  // Gestisce il cambiamento di valore dei campi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  // Quando l'utente invia il modulo, creiamo il payload
  const handleSubmit = async () => {
    const { idItinerario, ...restFormData } = formData;
    const payload = {
      idItinerario,
      ...restFormData,

      durata: parseInt(formData.durata), // Assicurati che la durata sia un numero
      giorni: giorni, // Usa il campo "giorni"
      partenze: partenze.map((p) => ({
        ...p,
        // "postiDisponibili" non è incluso, quindi non lo passiamo
      })),
      itinerarioFascePrezzo: fascePrezzo.map((f) => ({
        ...f,
        prezzo: parseFloat(f.prezzo), // Assicurati che il prezzo sia un numero
      })),
      paese: { idPaese: formData.paeseId, nome: formData.paeseNome }, // Passiamo correttamente l'oggetto paese
    };

    try {
      await updateItinerario(itinerario.idItinerario, payload);
      alert("Itinerario aggiornato con successo!");
      handleClose();
      if (onUpdated) onUpdated();
    } catch (error) {
      alert(`Errore durante l'aggiornamento: ${error.message}`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Modifica Itinerario</Modal.Title>
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

          <Form.Group className="mt-3">
            <Form.Label>ID Paese</Form.Label>
            <Form.Control
              type="number"
              name="paeseId"
              value={formData.paeseId} // Usa formData.paeseId
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Nome Paese</Form.Label>
            <Form.Control
              type="text"
              name="paeseNome"
              value={formData.paeseNome} // Usa formData.paeseNome
              onChange={handleChange}
            />
          </Form.Group>

          {/* GIORNI */}
          <h5 className="mt-4">Giorni del Tour</h5>
          {giorni.map((g, index) => (
            <div key={index} className="border p-2 mb-2 rounded">
              <Form.Label>Giorno {index + 1}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Titolo"
                value={g.titolo}
                onChange={(e) =>
                  handleGiorniChange(index, "titolo", e.target.value)
                }
              />
              <Form.Control
                as="textarea"
                placeholder="Descrizione"
                className="mt-2"
                value={g.descrizione}
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
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateItinerarioModal;
