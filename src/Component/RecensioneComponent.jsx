import React, { useState, useEffect } from "react";

const API_URL = "https://localhost:7007/api/Recensioni";

// Funzione per recuperare le recensioni
const getRecensione = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Errore nel recupero delle recensioni");
  return await response.json();
};

// Funzione per eliminare una recensione
const deleteRecensione = async (id, email, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }), // Invia l'email al backend
  });

  if (!response.ok)
    throw new Error("Errore durante l'eliminazione della recensione");
};

const postRecensione = async (nuovaRecensione, token) => {
  // Log per visualizzare i dati della recensione prima di inviarli
  console.log("Dati della nuova recensione:", nuovaRecensione);

  const formData = new FormData();
  formData.append("Commento", nuovaRecensione.commento);
  formData.append("Valutazione", nuovaRecensione.valutazione);
  formData.append("IdItinerario", nuovaRecensione.idItinerario);

  // Log per vedere se l'UserId è recuperato correttamente
  const userId = localStorage.getItem("userId") || "";
  console.log("UserId recuperato:", userId);
  formData.append("UserId", userId);

  if (nuovaRecensione.imgUser) {
    formData.append("ImgUser", nuovaRecensione.imgUser);
    console.log("Immagine utente aggiunta:", nuovaRecensione.imgUser);
  }

  // Log prima di inviare la richiesta
  console.log("Invio richiesta POST a:", API_URL);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  // Log per la risposta del server
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Errore nella risposta del server:", errorText);
    throw new Error(`Errore durante la creazione: ${errorText}`);
  }

  const responseData = await response.json();
  console.log("Risposta del server:", responseData);
  return responseData;
};

const RecensioniComponent = () => {
  const [recensioni, setRecensioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // Stati per la nuova recensione
  const [commento, setCommento] = useState("");
  const [valutazione, setValutazione] = useState(5);
  const [imgUser, setImgUser] = useState(null);
  const [idItinerario, setIdItinerario] = useState(1); // Metti l'ID itinerario che ti serve

  useEffect(() => {
    const fetchRecensioni = async () => {
      try {
        const data = await getRecensione();
        setRecensioni(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const storedEmail = localStorage.getItem("email");
    setUserEmail(storedEmail);

    fetchRecensioni();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa recensione?")) {
      try {
        const token = localStorage.getItem("token");
        await deleteRecensione(id, userEmail, token);
        setRecensioni((prev) => prev.filter((r) => r.idRecensione !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      console.log("Invio recensione...");
      const token = localStorage.getItem("token");
      const nuovaRecensione = {
        commento,
        valutazione,
        idItinerario,
        imgUser,
      };
      console.log("Recensione da inviare:", nuovaRecensione);
      const nuova = await postRecensione(nuovaRecensione, token);
      setRecensioni((prev) => [...prev, nuova]);
      // Pulisci il form
      setCommento("");
      setValutazione(5);
      setImgUser(null);
    } catch (err) {
      alert(err.message);
      console.error("Errore durante l'invio della recensione:", err);
    }
  };

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <div className="mt-5 mb-5 pb-5 pt-5 container">
      <h2 className="mb-4">Recensioni</h2>

      {/* FORM PER NUOVA RECENSIONE */}
      <form onSubmit={handlePost} className="mb-5">
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
          <label className="form-label">Immagine Profilo (opzionale)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImgUser(e.target.files[0])}
          />
        </div>
        {/* ID Itinerario - puoi anche toglierlo se lo gestisci in altro modo */}
        <div className="mb-3">
          <label className="form-label">ID Itinerario</label>
          <input
            type="number"
            className="form-control"
            value={idItinerario}
            onChange={(e) => setIdItinerario(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Invia Recensione
        </button>
      </form>

      {/* LISTA RECENSIONI */}
      <div className="row">
        {recensioni.map((recensione) => (
          <div className="col-md-6 col-lg-4 mb-4" key={recensione.idRecensione}>
            <div className="card h-100 shadow-sm">
              {recensione.imgUserPath ? (
                <img
                  src={`https://localhost:7007/${recensione.imgUserPath}`}
                  className="card-img-top"
                  alt={recensione.nomeUtente}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-light"
                  style={{ height: "200px" }}
                >
                  <span>No profile image</span>
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{recensione.titoloItinerario}</h5>
                <p className="card-text">
                  <strong>Recensito da:</strong> {recensione.nomeUtente}
                </p>
                <p className="card-text">{recensione.commento}</p>
                <p className="card-text">
                  <strong>Valutazione: </strong>
                  {recensione.valutazione} / 5
                </p>
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "0.9rem" }}
                >
                  {recensione.createdAt
                    ? new Date(recensione.createdAt).toLocaleDateString()
                    : "Data non disponibile"}
                </p>
                {userEmail === recensione.email && (
                  <div className="mt-2">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        alert("Funzionalità modifica non ancora implementata")
                      }
                    >
                      Modifica
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(recensione.idRecensione)}
                    >
                      Elimina
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecensioniComponent;
