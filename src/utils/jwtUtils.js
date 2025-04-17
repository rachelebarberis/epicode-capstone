export const getRoleFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
  
      return (
        decodedPayload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] || null
      );
    } catch (error) {
      console.error('Errore nella decodifica del token:', error);
      return null;
    }
  };
  export const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      // Decodifica il payload del token (seconda parte del JWT)
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
  
      // Restituisce l'ID dell'utente (assumiamo che sia nel campo 'sub')
      return decodedPayload['sub'] || null;  // 'sub' è un campo comune per l'ID dell'utente
    } catch (error) {
      console.error('Errore nella decodifica del token:', error);
      return null;
    }
  };
  
  