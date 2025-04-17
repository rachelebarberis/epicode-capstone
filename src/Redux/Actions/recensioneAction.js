const API_URL = "https://localhost:7007/api/Recensioni";

export const getRecensione = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Errore nel recupero delle recensioni");
  return await response.json();
};

export const getRecensioneById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Errore nel recupero della recensione");
  return await response.json();
};

export const createRecensione = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: formData
  });
  if (!response.ok) throw new Error("Errore nella creazione della recensione");
  return await response.json();
};

export const updateRecensione = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData
  });
  if (!response.ok) throw new Error("Errore nell'aggiornamento della recensione");
  return await response.json();
};

export const deleteRecensione = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Errore nella cancellazione della recensione");
  return true;
};



export const postRecensione = async (recensioneDto) => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recensioneDto), // DTO con commento, valutazione, idItinerario e email utente
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Errore nella creazione della recensione");
  }

  return await response.json(); 
};
