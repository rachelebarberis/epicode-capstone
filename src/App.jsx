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
          <Route path="/Paese" element={<PaeseComponent />} />
          <Route path="/Login" element={<LoginComponent />} />
          <Route path="/Register" element={<RegisterComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
};

export default App;
