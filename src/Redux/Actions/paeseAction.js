const API_URL = 'https://localhost:7007/api/Paese'; 

export const getPaesi = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Errore nel recupero dei Paesi');
  return await response.json();
};

export const createPaese = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Errore nella creazione del Paese');
  return await response.text();
};

export const updatePaese = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Errore nell\'aggiornamento del Paese');
  return await response.text();
};

export const deletePaese = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Errore nell\'eliminazione del Paese');
  return await response.text();
};
