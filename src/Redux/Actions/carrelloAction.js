
export const fetchCarrello = async (email) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token)
    const response = await fetch(`https://localhost:7007/api/Carrello/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Aggiungi qui eventualmente il token di autorizzazione
         Authorization: `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Carrello non trovato');
    }

    const data = await response.json();
    return data; // Restituisci i dati del carrello
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const createCarrello = async (carrelloData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch('https://localhost:7007/api/Carrello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Aggiungi il token di autenticazione se necessario
      },
      body: JSON.stringify(carrelloData),
    });

    if (!response.ok) {
      throw new Error('Errore nella creazione del carrello');
    }

    const data = await response.json();
    return data; // Restituisci i dati del carrello appena creato
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const updateCarrelloItem = async (itemId, itemData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7007/api/Carrello/item/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Aggiungi il token di autenticazione se necessario
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error('Errore nell\'aggiornamento dell\'item');
    }

    const data = await response.json();
    return data; // Restituisci i dati aggiornati
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const removeCarrelloItem = async (itemId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7007/api/Carrello/item/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Aggiungi il token di autenticazione se necessario
      },
    });

    if (!response.ok) {
      throw new Error('Errore nella rimozione dell\'item');
    }

    return true; // Ritorna true se l'item è stato rimosso correttamente
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const clearCarrello = async (email) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7007/api/Carrello/clear/${email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Aggiungi il token di autenticazione se necessario
      },
    });

    if (!response.ok) {
      throw new Error('Errore nella pulizia del carrello');
    }

    return true; // Ritorna true se il carrello è stato pulito correttamente
  } catch (error) {
    console.error(error);
    return false;
  }
};
