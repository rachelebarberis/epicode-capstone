import React, { useState, useEffect } from "react";

const RecensioniComponent = () => {
  const [recensioni, setRecensioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [itinerari, setItinerari] = useState([]);
  const [commento, setCommento] = useState("");
  const [valutazione, setValutazione] = useState(5);
  const [imgUser, setImgUser] = useState(null);
  const [idItinerario, setIdItinerario] = useState(1);

  const [showModal, setShowModal] = useState(false); // <-- Stato per aprire/chiudere la modale

  const API_URL = "https://localhost:7007/api/Recensioni";

  useEffect(() => {
    const fetchRecensioni = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok)
          throw new Error("Errore nel recupero delle recensioni");
        const data = await response.json();
        setRecensioni(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchItinerari = async () => {
      try {
        const response = await fetch("https://localhost:7007/api/Itinerario"); // <-- il tuo endpoint corretto
        if (!response.ok)
          throw new Error("Errore nel recupero degli itinerari");
        const data = await response.json();
        console.log("Itinerari caricati:", data); // <-- debug importantissimo
        setItinerari(data);
      } catch (err) {
        console.error("Errore durante il fetch degli itinerari:", err);
      }
    };

    const storedEmail = localStorage.getItem("email");
    setUserEmail(storedEmail);

    fetchItinerari();
    fetchRecensioni();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa recensione?")) {
      try {
        const token = localStorage.getItem("token");
        const email = userEmail;
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
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

      if (imgUser) {
        formData.append("ImgUser", imgUser);
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Errore nella risposta del server:", errorText);
        throw new Error(`Errore durante la creazione: ${errorText}`);
      }

      const nuovaRecensione = await response.json();

      // **Aggiungi direttamente la recensione a 'recensioni' senza ricaricare**
      setRecensioni((prev) => [...prev, nuovaRecensione]);

      setCommento("");
      setValutazione(5);
      setImgUser(null);
      setShowModal(false); // <-- Chiudi la modale dopo aver postato
    } catch (err) {
      alert(err.message);
      console.error("Errore durante l'invio della recensione:", err);
    }
  };

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <div className="mt-5 mb-5 container">
      <h2 className="mb-4 text-center">Recensioni</h2>

      {/* Bottone per aprire la modale */}
      <div className="text-center mb-5">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Aggiungi Recensione
        </button>
      </div>

      {/* MODALE */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={handlePost}>
                <div className="modal-header">
                  <h5 className="modal-title">Nuova Recensione</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Commento</label>
                    <textarea
                      className="form-control"
                      value={commento}
                      onChange={(e) => setCommento(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Valutazione (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="form-control"
                      value={valutazione}
                      onChange={(e) => setValutazione(parseInt(e.target.value))}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Seleziona Itinerario</label>
                    <select
                      className="form-select"
                      value={idItinerario}
                      onChange={(e) =>
                        setIdItinerario(parseInt(e.target.value))
                      }
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
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Annulla
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Invia
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* LISTA RECENSIONI */}
      <div className="row g-4">
        {recensioni.map((recensione) => (
          <div className="col-md-6 col-lg-4" key={recensione.idRecensione}>
            <div className="card h-100 p-3 shadow-sm border-0">
              <div className="d-flex align-items-center mb-3">
                {recensione.imgUserPath ? (
                  <img
                    src={`https://localhost:7007/${recensione.imgUserPath}`}
                    alt={recensione.nomeUtente}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginRight: "15px",
                    }}
                  />
                ) : (
                  <div
                    className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: "15px",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>N/A</span>
                  </div>
                )}
                <div>
                  <h5 className="mb-0">{recensione.nomeUtente}</h5>
                  <small className="text-muted">
                    {recensione.createdAt
                      ? new Date(recensione.createdAt).toLocaleDateString()
                      : "Data non disponibile"}
                  </small>
                </div>
              </div>
              <h6 className="text-primary">{recensione.titoloItinerario}</h6>
              <p className="mb-2">{recensione.commento}</p>
              <p className="mb-1">
                <strong>Valutazione:</strong> {recensione.valutazione} / 5
              </p>
              {userEmail === recensione.email && (
                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-warning btn-sm w-50"
                    onClick={() =>
                      alert("Funzionalità modifica non ancora implementata")
                    }
                  >
                    Modifica
                  </button>
                  <button
                    className="btn btn-danger btn-sm w-50"
                    onClick={() => handleDelete(recensione.idRecensione)}
                  >
                    Elimina
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecensioniComponent;
