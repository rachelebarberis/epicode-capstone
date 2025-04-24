import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBarComponent from "./Component/NavBarComponent";

import HomeComponent from "./Component/HomeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUsComponent from "./Component/AboutUsComponent";
import LoginComponent from "./Component/LoginComponent";
import RegisterComponent from "./Component/RegisterComponent";
import AreaPersonaleComponent from "./Component/AreaPersonaleComponent";
import FooterComponent from "./Component/FooterComponent";
import EsploraComponent from "./Component/EsploraComponent";
import ItinerarioDettagli from "./Component/ItinerarioDettagli";
import PaeseComponent from "./Component/PaeseComponent";
import RecensioneComponent from "./Component/RecensioneComponent";
import CartComponent from "./Component/CartComponent";
import ContattiComponent from "./Component/ContattiComponent";
import ItinerariPaese from "./Component/ItinerariPaese";
import ConfermaOrdineComponent from "./Component/ConfermaOrdineComponent";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBarComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/Esplora" element={<EsploraComponent />} />
          <Route path="/itinerario/:id" element={<ItinerarioDettagli />} />

          <Route path="/AreaPersonale" element={<AreaPersonaleComponent />} />
          <Route path="/AboutUs" element={<AboutUsComponent />} />
          <Route path="/Recensioni" element={<RecensioneComponent />} />
          <Route path="/Paese" element={<PaeseComponent />} />
          <Route path="/Login" element={<LoginComponent />} />
          <Route path="/Carrello" element={<CartComponent />} />
          <Route path="/Contatti" element={<ContattiComponent />} />
          <Route path="/Register" element={<RegisterComponent />} />
          <Route path="/paese/:nomePaese" element={<ItinerariPaese />} />
          <Route
            path="/conferma-ordine"
            element={<ConfermaOrdineComponent />}
          />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
};

export default App;
