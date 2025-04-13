import { Modal, Button } from "react-bootstrap";
import { deleteItinerario } from "../../Redux/Actions/itinerarioActions";

const DeleteItinerarioModal = ({ show, handleClose, id, onDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteItinerario(id);
      alert("Itinerario eliminato con successo");
      handleClose();
      if (onDeleted) onDeleted(); // callback per refresh
    } catch (error) {
      alert(`Errore: ${error.message}`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Conferma eliminazione</Modal.Title>
      </Modal.Header>
      <Modal.Body>Sei sicuro di voler eliminare questo itinerario?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Elimina
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteItinerarioModal;
