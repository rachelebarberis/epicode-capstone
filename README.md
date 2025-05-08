# 🌍 WanderLost — Perditi nelle meraviglie del mondo! ✈️🧳

**WanderLost** è un'applicazione web dove puoi esplorare, selezionare e acquistare tour organizzati in tutto il mondo.  
Ogni itinerario è pensato per adattarsi alle tue esigenze con **diverse fasce di prezzo** e **date flessibili di partenza**.

Autenticati, sfoglia le destinazioni, scegli il tuo viaggio e preparati a partire! 🌟

---

## 🗺️ Funzionalità Principali

### 🏠 Home
- Esplora tutti i tour disponibili in anteprima tramite un catalogo
- Scopri le recensioni più recenti ⭐
- Dai uno sguardo alla sezione *About Us*

---

### 🌐 Pagina Registrazione / Login
- Autenticazione tramite email e password 🔐
- Accesso all'area personale e al carrello personale 🛍️

---

### 📂 Catalogo Itinerari per Paese
- Filtra e visualizza itinerari divisi per destinazione
- Accedi alla pagina dettagli di ogni itinerario 🌄

---

### 📝 Pagina Dettaglio Itinerario
- Visualizza programma giornaliero dettagliato 🗓️
- Scegli tra **tre fasce di prezzo** in base al comfort 💼
- Seleziona la data di partenza
- Aggiungi l’itinerario al tuo carrello 🛒

---

### 🗺️ Lista Paesi
- Visualizza tutte le nazioni disponibili
- Accedi rapidamente agli itinerari per ogni Paese 🌍

---

### 💬 Sezione Recensioni
- Leggi tutte le recensioni scritte dagli utenti 📖
- Se autenticato:
  - Aggiungi una recensione a un itinerario selezionandolo da una lista ✍️
  - Cancella le tue recensioni in qualsiasi momento ❌

---

### 📞 Contatti
- Invia un messaggio per essere ricontattato ✉️
- Compila un modulo per assistenza clienti 📬

---

### 👤 Area Utente
- Visualizza il tuo carrello
- Procedi all’inserimento dei dati della carta per il pagamento 💳
- Gestisci i tuoi itinerari salvati
---
## 🔐 Funzionalità Admin

Se ti registri con le seguenti credenziali:

- 📧 **Email:** `ep@email.com`  
- 🔑 **Password:** `adminadmin`

avrai accesso a una sezione riservata con funzionalità avanzate per la gestione del sito.

### ✈️ Itinerari

- 🔘 **Aggiungi Itinerario:**  
  Nella sezione *Itinerari*, apparirà un pulsante **"Aggiungi Itinerario"**.  
  Cliccandolo, si aprirà una **modale** che permette di inserire un nuovo itinerario completo di tutte le informazioni necessarie.

- ✏️ **Modifica Itinerario:**  
  Accedendo alla **pagina di dettaglio** di un itinerario, l'admin potrà modificarne i dati o sostituirlo tramite una **modale di modifica**.
  
- ❌ **Elimina Itinerario:**
-   Accedendo alla **pagina di dettaglio** di un itinerario, l'admin potrà tramite una modale eliminare un itinerario.

### 🌍 Paesi

- ➕ **Aggiungi Paese:**  
  Nella sezione *Paesi* è possibile aggiungere nuovi paesi da associare agli itinerari.

- ❌ **Elimina Paese:**  
  Sempre dalla sezione *Paesi*, l'admin può eliminare quelli esistenti.

---
## 🛠️ Tecnologie Utilizzate

### 💻 Frontend
- ⚛️ **React** con **Redux** e **React Router DOM**

### 🎨 Estetica
- 🎀 **Bootstrap**
- 📖 **React Page Flip**: per l’effetto sfogliabile nel catalogo della pagina Home

### ⚙️ Backend
- 🧩**ASP.NET Core Web API** con C#, Identity e Serilog [Link Repo BackEnd](https://github.com/rachelebarberis/Capstone): per la creazione degli endpoint REST che comunicano con il frontend React

### 🗄️ Database
- 🛢️ **SQL Server Management Studio (SSMS)**

---
## 🧪 Come eseguire il progetto in locale
Per eseguire correttamente il **BACKEND** in locale, segui questi passaggi 👇

### 📦 Prerequisiti
- ✅ Visual Studio installato
- ✅ SQL Server Management Studio (SSMS) installato e configurato


### 🛠️ Istruzioni per l'installazione

1. 📁 **Scarica o clona il progetto**
   ```bash
   https://github.com/rachelebarberis/Capstone
2. 🛠️ **Modifica e sostuire la stringa di connessione nell' appsettings.json**
   "ConnectionStrings": {
  "DefaultConnection": "Server=TUO_SERVER;Database=NomeDatabase;Trusted_Connection=True;MultipleActiveResultSets=true"
}
3. 💽**Nella Console dei pacchetti Nuget**
   Eseguire i seguenti comandi:
   1. Add-Migration Initial
   2. Update-database

4. ▶️**Avviare il progetto**

Per eseguire il **FRONTED**

1.📂**Accedere al frontend tramite questa repository** (segue nuovamente il link):
[Link:](https://github.com/rachelebarberis/Capstone)

2.🧑‍💻**Aprire il progetto in visual studio code**

3.📦**Nel terminale eseguire i seguenti comandi**:
   1. npm install
   2. npm install @reduxjs/toolkit react-redux
   3. npm install react-router-dom
   4. npm install bootstrap react-bootstrap
   5. npm install react-pageflip
   6. npm run dev

      
4.🚀 **Avvia l’app React in locale**

---
## 📬 Contatti

- 📧 Email: rachele.barberis.12@gmail.com
- 💼 LinkedIn: (https://www.linkedin.com/in/rachele-barberis/)


