import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBarComponent from "./Component/NavBarComponent";

import HomeComponent from "./Component/HomeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUsComponent from "./Component/AboutUsComponent";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBarComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/AboutUs" element={<AboutUsComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
