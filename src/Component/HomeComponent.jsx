import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { getRecensione } from "../Redux/Actions/recensioneAction";
import ReactPageFlip from "react-pageflip";

const HomeComponent = () => {
  const [itinerari, setItinerari] = useState([]);
  const [recensioni, setRecensioni] = useState([]);
  const bookRef = useRef();

  useEffect(() => {
    const fetchItinerari = async () => {
      try {
        const response = await fetch("https://localhost:7007/api/Itinerario");
        if (!response.ok) {
          throw new Error("Errore durante il recupero degli itinerari");
        }
        const data = await response.json();
        setItinerari(data);
      } catch (error) {
        console.error("Errore:", error.message);
      }
    };

    const fetchRecensioni = async () => {
      try {
        const data = await getRecensione();
        setRecensioni(data);
      } catch (error) {
        console.error("Errore nel recupero delle recensioni:", error.message);
      }
    };

    fetchItinerari();
    fetchRecensioni();
  }, []);

  const handleNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const handlePrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <Container className="mt-5 pt-5 mb-5 pb-5">
      <div id="hero-div">
        <div id="hero-p"></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 id="h1-home">WanderLOst</h1>
          <h2 id="h2-home">Perditi nelle meraviglie del mondo!</h2>
          <button id="btn-hero">Inizia a Sognare!</button>
        </div>
      </div>

      <section className="mt-5">
        <h4 className="text-center fw-bold text-black">Guarda i tour</h4>

        <div id="tour-div">
          <ReactPageFlip
            ref={bookRef}
            width={800}
            height={550}
            size="stretch"
            showCover={true}
            flippingTime={800}
          >
            {itinerari.map((itinerario) => (
              <div id="itinerario" key={itinerario.idItinerario}>
                <img
                  id="itinerario-img"
                  src={itinerario.immagineUrl || "/public/images/default.jpg"}
                  alt={itinerario.nomeItinerario}
                />
                <h3 id="itinerario-nome">{itinerario.nomeItinerario}</h3>
              </div>
            ))}
          </ReactPageFlip>
        </div>

        <div className=" d-flex justify-content-between mt-1">
          <button id="itinerario-btn" onClick={handlePrevPage}>
            <i class="bi bi-arrow-left"></i>
          </button>
          <button id="itinerario-btn" onClick={handleNextPage}>
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </section>

      {/* SEZIONE RECENSIONI */}
      <section className="mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4 style={{ color: "#05264a", fontWeight: "bold" }}>Recensioni</h4>
          <div id="link-home">
            <Link to="/Recensioni" className="text-decoration-none">
              <span>Scopri di più</span>
              <i className="bi bi-chevron-right"></i>
            </Link>
          </div>
        </div>

        <div>
          {recensioni.map((recensione, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h5>{recensione.nomeUtente}</h5>
              <p>{recensione.commento}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEPARATORE */}
      <hr className="w-100 my-4" style={{ borderTop: "3px solid #033d10" }} />

      {/* SEZIONE ABOUT US */}
      <section id="about-us" className="mt-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h4 className="mb-4" style={{ color: "#05264a", fontWeight: "bold" }}>
            About Us
          </h4>
          <p
            className="text-center"
            style={{
              color: "#033d10",
              fontSize: "1.1rem",
              maxWidth: "700px",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            Siamo un team di appassionati viaggiatori pronti a guidarti verso le
            migliori esperienze del mondo.
            <br />
            Scopri di più sulla nostra missione e sul nostro team!
          </p>
          <Link
            to="/AboutUs"
            className="nav-link"
            style={{ textDecoration: "none" }}
          >
            <div
              className="custom-btn"
              style={{
                padding: "12px 30px",
                borderRadius: "30px",
                backgroundColor: "#033d10",
                color: "white",
                fontWeight: "600",
                transition: "background-color 0.3s ease",
              }}
            >
              Scopri di più
              <i className="bi bi-chevron-right ms-2"></i>
            </div>
          </Link>
        </div>
      </section>

      {/* SEPARATORE */}
      <hr className="w-100 my-4" style={{ borderTop: "3px solid #033d10" }} />
    </Container>
  );
};

export default HomeComponent;
