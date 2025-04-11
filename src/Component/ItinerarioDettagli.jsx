import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";

const ItinerarioDettagli = () => {
  const { id } = useParams();
  const [dettagli, setDettagli] = useState(null);

  useEffect(() => {
    const fetchDettagli = async () => {
      try {
        const response = await fetch(
          `https://localhost:7007/api/Itinerario/${id}`
        );
        const data = await response.json();
        setDettagli(data);
      } catch (error) {
        console.error("Errore nel caricamento del dettaglio:", error);
      }
    };

    fetchDettagli();
  }, [id]);

  if (!dettagli) return <div>Caricamento...</div>;

  return (
    <Container className="mt-5 pt-5 mb-5 pb-5">
      <div className="p-4">
        <Row>
          <Col md={6} lg={5}>
            <img
              src={dettagli.immagineUrl}
              alt={dettagli.nomeItinerario}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
          </Col>
          <Col md={6} lg={7}>
            <h2>{dettagli.nomeItinerario}</h2>
            <p>{dettagli.descrizione}</p>
            <p>Durata: {dettagli.durata} giorni</p>

            {/* Prezzi */}
            <h4>Prezzi:</h4>
            <div>
              {dettagli.itinerarioFascePrezzo.map((fascia) => (
                <div
                  key={fascia.idItinerarioFasciaPrezzo}
                  style={{
                    padding: "8px",
                    marginBottom: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <strong>
                    {fascia.idFasciaDiPrezzo === 1 && "Base"}{" "}
                    {fascia.idFasciaDiPrezzo === 2 && "Medio"}{" "}
                    {fascia.idFasciaDiPrezzo === 3 && "Top"}:
                  </strong>{" "}
                  €{fascia.prezzo.toFixed(2)}
                </div>
              ))}
            </div>

            {/* Partenze */}
            <h4>Partenze disponibili:</h4>
            <div>
              {dettagli.partenze.map((partenza) => (
                <div
                  key={partenza.idPartenza}
                  style={{
                    padding: "8px",
                    marginBottom: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <span>
                    <strong>Data:</strong> {partenza.dataPartenza} -{" "}
                    <strong>Stato:</strong>{" "}
                    <span
                      style={{
                        color:
                          partenza.stato === "Disponibile" ? "green" : "red",
                      }}
                    >
                      {partenza.stato}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Dettagli del tour come ListGroup */}
        <h4 className="mt-4">Dettagli del tour:</h4>
        <ListGroup>
          {dettagli.giorni.map((giorno) => (
            <ListGroup.Item key={giorno.idItinerarioGiorno}>
              <h5>
                Giorno {giorno.giorno}: {giorno.titolo}
              </h5>
              <p>{giorno.descrizione}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};

export default ItinerarioDettagli;
