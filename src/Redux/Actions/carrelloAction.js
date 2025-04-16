// Funzione per ottenere il token JWT da localStorage o sessionStorage


// Funzione di fetch per ottenere il carrello
export const fetchCarrello = async (email) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token mancante. Impossibile recuperare il carrello.");
      return null;
    }
  
    try {
      // Passa l'email invece dell'ID nell'endpoint
      const response = await fetch(`/api/Carrello/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Aggiungi un controllo per il tipo di contenuto della risposta
      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Risposta non JSON:", text);
        return null; // Restituisce null in caso di errore
      }
  
      if (!response.ok) {
        throw new Error("Errore nel recupero del carrello");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore nel recupero del carrello", error);
      return null;
    }
  };

// Funzione per aggiungere un item al carrello
export const addCarrelloItem = async (carrelloItem) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token mancante. Impossibile aggiungere l'item al carrello.");
        return null;
    }

    try {
        const response = await fetch('/api/carrello/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Aggiungi il token nell'intestazione
            },
            body: JSON.stringify(carrelloItem),
        });

        if (!response.ok) {
            throw new Error('Errore nell\'aggiunta dell\'item al carrello');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Errore nell'aggiunta dell'item al carrello", error);
        return null; // Gestisci l'errore come preferisci
    }
};

// Funzione per rimuovere un item dal carrello
export const removeCarrelloItem = async (itemId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token mancante. Impossibile rimuovere l'item dal carrello.");
        return null;
    }

    try {
        const response = await fetch(`/api/carrello/item/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Aggiungi il token nell'intestazione
            },
        });

        if (!response.ok) {
            throw new Error('Errore nella rimozione dell\'item dal carrello');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Errore nella rimozione dell'item dal carrello", error);
        return null;
    }
};
