const API_USER = "https://localhost:7007/Api/Account/userinfo";

// Funzione generica per fare fetch con token JWT
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

// GET - Recupera le informazioni utente
export const getUserInfo = async () => {
  try {
    const userData = await fetchWithAuth(API_USER, {
      method: "GET",
    });

    // Verifica che userData non sia null e fornisce un valore di default per l'immagine
    if (userData) {
      // Assegna un'immagine di default se mancante
      userData.imgUserPath = userData.imgUserPath || "/images/default-avatar.jpg";
      return userData;
    }

    throw new Error("Dati utente non trovati");

  } catch (err) {
    console.error("Errore nel recupero dei dati utente:", err);
    throw new Error("Errore nel recupero dei dati utente");
  }
};

export const uploadProfileImage = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("imageFile", file);

  const response = await fetch("https://localhost:7007/api/Account/uploadprofileimage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "Errore durante l'upload dell'immagine",
    }));
    throw new Error(error.message || "Errore generico");
  }

  // Assicurati che venga restituito l'oggetto utente aggiornato
  const updatedUser = await response.json();

  // Assegna un'immagine di default se mancante
  updatedUser.imgUserPath = updatedUser.imgUserPath || "/images/default-avatar.jpg";

  return updatedUser;

};
export const updateUserInfo = async (updatedUserData) => {
    try {
      const updatedUser = await fetchWithAuth("https://localhost:7007/api/Account/updateuserinfo", {
        method: "POST",
        body: JSON.stringify(updatedUserData),
      });
  
      updatedUser.imgUserPath = updatedUser.imgUserPath || "/images/default-avatar.jpg";
      return updatedUser;
    } catch (err) {
      console.error("Errore nell'aggiornamento delle info utente:", err);
      throw err;
    }
  };