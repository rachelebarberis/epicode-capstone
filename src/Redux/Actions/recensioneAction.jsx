const API_URL = "https://localhost:7007/api/Recensioni";

export const getRecensione = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Errore nel recupero dei Paesi");
  return await response.json();
};
