import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import {
  getUserInfo,
  uploadProfileImage,
  updateUserInfo,
} from "../Redux/Actions/userAction";

const AreaPersonaleComponent = () => {
  const [user, setUser] = useState(null);
  const [errore, setErrore] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imgUserPath: "",
  });

  // Recupera i dati utente
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Inizio fetch dei dati utente...");
        const userData = await getUserInfo();
        console.log("Dati utente ricevuti:", userData);
        setUser(userData);
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          imgUserPath: userData.imgUserPath,
        });
      } catch (err) {
        setErrore("Errore nel recupero dati utente.");
        console.error("Errore nel recupero dati utente:", err);
      }
    };

    fetchUser();
  }, []);

  // Gestisce la selezione dell'immagine
  const handleImageUpload = (file) => {
    console.log("File selezionato:", file);
    if (!file) return;
    setSelectedFile(file);
  };

  // Salva l'immagine di profilo
  const saveProfileImage = async () => {
    if (!selectedFile) {
      console.log("Nessun file selezionato, uscita dalla funzione...");
      return;
    }

    try {
      console.log("Inizio caricamento immagine...");
      setUploading(true);
      const updatedUser = await uploadProfileImage(selectedFile);
      console.log("Risposta dal backend:", updatedUser);

      if (updatedUser && updatedUser.imgUserPath) {
        console.log("Immagine aggiornata, aggiorno stato utente.");
        setUser(updatedUser);
        setSelectedFile(null);
      } else {
        console.error("Errore: imgUserPath non presente nella risposta.");
        setErrore("Errore nel recupero dell'immagine aggiornata.");
      }
    } catch (err) {
      console.error("Errore nel caricamento immagine:", err);
      setErrore("Errore nel caricamento immagine.");
    } finally {
      setUploading(false);
    }
  };

  // Apre la modale per modificare i dati
  const openModal = () => {
    setShowModal(true);
  };

  // Chiude la modale
  const closeModal = () => {
    setShowModal(false);
  };

  // Gestisce il cambiamento dei dati nel form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Aggiorna le informazioni dell'utente
  const handleSaveChanges = async () => {
    try {
      const updatedUser = await updateUserInfo(formData);
      setUser(updatedUser);
      closeModal();
    } catch (err) {
      console.error("Errore nell'aggiornamento delle informazioni:", err);
      setErrore("Errore nell'aggiornamento delle informazioni.");
    }
  };

  if (errore) {
    return <div className="text-danger text-center mt-5">{errore}</div>;
  }

  if (!user) {
    console.log("Dati utente non ancora disponibili, mostra caricamento...");
    return <div className="text-center mt-5">Caricamento dati...</div>;
  }

  // Se c'è un percorso immagine nel backend, lo compone con l'host
  const imageUrl = user.imgUserPath
    ? `https://localhost:7007${user.imgUserPath}`
    : "/images/default-avatar.jpg";

  return (
    <Container className="mt-5 pt-5">
      <h4 className="text-center pb-5">
        Benvenuto {user.firstName} nella tua Area Personale!
      </h4>

      <Row className="mb-4">
        <Col className="text-end">
          <Button
            variant="outline-secondary"
            onClick={openModal}
            className="custom-btn"
          >
            Modifica
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col xs={12} md={4} className="d-flex flex-column align-items-center">
          <img
            src={imageUrl}
            alt="Profilo"
            className="rounded-circle profile-img mb-3"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <Form.Group controlId="formFile">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              disabled={uploading}
            />
          </Form.Group>

          {uploading && <div className="text-muted mt-2">Caricamento...</div>}

          {selectedFile && (
            <Button
              variant="primary"
              onClick={saveProfileImage}
              disabled={uploading}
              className="mt-3"
            >
              {uploading ? "Salvataggio..." : "Salva immagine"}
            </Button>
          )}
        </Col>

        <Col xs={12} md={8} className="pt-3">
          <h4>Informazioni personali</h4>
          <p>
            <strong>Nome:</strong> {user.firstName}
          </p>
          <p>
            <strong>Cognome:</strong> {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <hr className="w-100 my-4" style={{ color: "#7A3E1F" }} />

          <h5 className="text-center">
            <i className="bi bi-heart"></i> Lista preferiti
          </h5>
        </Col>
      </Row>

      {/* Modale per modificare i dati dell'utente */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Informazioni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AreaPersonaleComponent;
