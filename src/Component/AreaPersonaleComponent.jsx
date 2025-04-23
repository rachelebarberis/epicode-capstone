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
    <Container className="mt-5 pt-5  mb-5">
      <h4
        className="text-center pb-4"
        style={{ fontWeight: "bold", letterSpacing: "1px", color: "orangered" }}
      >
        Area Personale - Documento di Viaggio
      </h4>

      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div
            className="border rounded-4 p-4 shadow"
            style={{
              backgroundColor: "#fff5f0",
              borderColor: "orangered",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <Row className="align-items-center mb-4">
              <Col
                xs={12}
                md={4}
                className="d-flex flex-column align-items-center"
              >
                <img
                  src={imageUrl}
                  alt="Foto Profilo"
                  className="rounded border"
                  style={{
                    width: "150px",
                    height: "200px",
                    objectFit: "cover",
                    backgroundColor: "#ffffff",
                    border: "2px solid orangered",
                  }}
                />
                <Form.Group controlId="formFile" className="mt-3">
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    disabled={uploading}
                  />
                </Form.Group>

                {uploading && (
                  <div className="text-muted mt-2">Caricamento...</div>
                )}

                {selectedFile && (
                  <Button
                    variant="outline-warning"
                    onClick={saveProfileImage}
                    disabled={uploading}
                    className="mt-2"
                    size="sm"
                    style={{ borderColor: "orangered", color: "orangered" }}
                  >
                    {uploading ? "Salvataggio..." : "Salva immagine"}
                  </Button>
                )}
              </Col>

              <Col xs={12} md={8} className="pt-4 pt-md-0">
                <div className="mb-3" style={{ color: "#7A3E1F" }}>
                  <strong>Nome:</strong>{" "}
                  <span className="ms-2">{user.firstName}</span>
                </div>
                <div className="mb-3" style={{ color: "#7A3E1F" }}>
                  <strong>Cognome:</strong>{" "}
                  <span className="ms-2">{user.lastName}</span>
                </div>
                <div className="mb-3" style={{ color: "#7A3E1F" }}>
                  <strong>Email:</strong>{" "}
                  <span className="ms-2">{user.email}</span>
                </div>
                <Button
                  variant="outline-warning"
                  onClick={openModal}
                  className="mt-3"
                  style={{ borderColor: "orangered", color: "orangered" }}
                >
                  Modifica Dati
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Modale per modificare i dati */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "orangered" }}>
            Modifica Informazioni
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
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
          <Button
            variant="warning"
            onClick={handleSaveChanges}
            style={{ backgroundColor: "orangered", borderColor: "orangered" }}
          >
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AreaPersonaleComponent;
