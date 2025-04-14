const API = "https://localhost:7007/api/Itinerario";

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "Errore durante la richiesta",
    }));
    throw new Error(error.message || "Errore generico");
  }

  return response.json();
};

// POST - Crea un nuovo itinerario
export const createItinerario = async (itinerarioData) => {
  return fetchWithAuth(`${API}`, {
    method: "POST",
    body: JSON.stringify(itinerarioData),
  });
};

// PUT - Aggiorna un itinerario
export const updateItinerario = async (id, payload) => {
  const response = await fetch(`https://localhost:7007/api/Itinerario/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Errore nella richiesta PUT: ${errText}`);
  }

  return response.json();
};


export const deleteItinerario = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Errore durante la cancellazione",
      }));
      throw new Error(error.message || "Errore generico");
    }

    return { success: true, id };
  } catch (error) {
    console.error(`Errore nella cancellazione dell'itinerario ${id}:`, error);
    throw error;
  }
};
