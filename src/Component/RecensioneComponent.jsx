import React, { useState, useEffect } from "react";

const API_URL = "https://localhost:7007/api/Recensioni";

export const getRecensione = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Errore nel recupero delle recensioni");
  return await response.json();
};

const RecensioneComponent = () => {
  const [recensioni, setRecensioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Chiamata della funzione getRecensione per recuperare le recensioni
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

    fetchRecensioni();
  }, []);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div>Errore: {error}</div>;
  }

  return (
    <div className="mt-5 pt-5">
      <h2>Recensioni</h2>
      <ul>
        {recensioni.map((recensione) => (
          <li key={recensione.idRecensione}>
            <h3>{recensione.titoloItinerario}</h3>
            <p>
              <strong>Recensito da:</strong> {recensione.nomeUtente}
            </p>
            <p>{recensione.commento}</p>
            <p>
              <strong>Valutazione: </strong>
              {recensione.valutazione} / 5
            </p>
            {recensione.imgUserPath ? (
              <img src={recensione.imgUserPath} alt={recensione.nomeUtente} />
            ) : (
              <p>No profile image</p>
            )}
            <p>
              <strong>Data della recensione: </strong>
              {new Date(recensione.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecensioneComponent;
