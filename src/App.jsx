import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBarComponent from "./Component/NavBarComponent";
import FooterComponent from "./Component/FooterComponent";
import HomeComponent from "./Component/HomeComponent";

const App = () => {
  return (
    <>
      <NavBarComponent />
      <HomeComponent />
      <FooterComponent />
    </>
  );
};

export default App;
