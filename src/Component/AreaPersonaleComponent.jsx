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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData);
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          imgUserPath: userData.imgUserPath,
        });
      } catch {
        setErrore("Errore nel recupero dati utente.");
      }
    };

    fetchUser();
  }, []);

  const handleImageUpload = (file) => {
    if (!file) return;
    setSelectedFile(file);
  };

  const saveProfileImage = async () => {
    if (!selectedFile) return;
    try {
      setUploading(true);
      const updatedUser = await uploadProfileImage(selectedFile);
      if (updatedUser && updatedUser.imgUserPath) {
        setUser(updatedUser);
        setSelectedFile(null);
      } else {
        setErrore("Errore nel recupero dell'immagine aggiornata.");
      }
    } catch {
      setErrore("Errore nel caricamento immagine.");
    } finally {
      setUploading(false);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatedUser = await updateUserInfo(formData);
      setUser(updatedUser);
      closeModal();
    } catch {
      setErrore("Errore nell'aggiornamento delle informazioni.");
    }
  };

  if (errore) {
    return <div className="text-danger text-center mt-5">{errore}</div>;
  }

  if (!user) {
    return <div className="text-center mt-5">Caricamento dati...</div>;
  }

  const imageUrl = user.imgUserPath
    ? `https://localhost:7007${user.imgUserPath}`
    : "/images/default-avatar.jpg";

  return (
    <Container id="area-personale" className="mt-5 pt-5 mb-5">
      <h4 id="orange" className="text-center fw-bold pb-4">
        Area Personale - Documento di Viaggio
      </h4>

      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <div id="area-card" className="border rounded-4 p-4 shadow">
            <Row className="align-items-center mb-4">
              <Col
                xs={12}
                lg={4}
                className="d-flex flex-column align-items-center"
              >
                <img
                  src={imageUrl}
                  alt="Foto Profilo"
                  id="profile-img"
                  className="profile-img rounded"
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
                    className="mt-2 custom-btn btn-sm"
                    id="save-img-btn"
                  >
                    {uploading ? "Salvataggio..." : "Salva immagine"}
                  </Button>
                )}
              </Col>

              <Col xs={12} md={8} className="pt-4 pt-md-0" id="orange">
                <div className="mb-3">
                  <strong>Nome:</strong>{" "}
                  <span className="ms-2">{user.firstName}</span>
                </div>
                <div className="mb-3">
                  <strong>Cognome:</strong>{" "}
                  <span className="ms-2">{user.lastName}</span>
                </div>
                <div className="mb-3">
                  <strong>Email:</strong>{" "}
                  <span className="ms-2">{user.email}</span>
                </div>
                <Button
                  variant="outline-warning"
                  onClick={openModal}
                  className="mt-3 custom-btn"
                  id="edit-data-btn"
                >
                  Modifica Dati
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title id="orange">Modifica Informazioni</Modal.Title>
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
            className="custom-btn"
            id="save-changes-btn"
          >
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AreaPersonaleComponent;
