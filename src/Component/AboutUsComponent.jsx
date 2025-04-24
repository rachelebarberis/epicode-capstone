import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AboutUsComponent = () => {
  return (
    <Container fluid className="about-container">
      <div className="text-center about-header">
        <h2 className="about-title">Chi Siamo?</h2>
        <p className="about-subtitle">
          Scopri la nostra missione e come ti aiuteremo a vivere esperienze
          uniche in ogni angolo del mondo.
        </p>
      </div>

      <Row>
        {/* Immagine */}
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Card className="about-card">
            <Card.Img
              variant="top"
              src="/images/about.jpg"
              className="about-image"
            />
          </Card>
        </Col>

        {/* Testo */}
        <Col xs={12} md={6} className="d-flex align-items-center">
          <div className="about-text">
            <h3 className="text-orangered">La nostra Missione</h3>
            <p>
              Siamo un team di appassionati di viaggi, pronti ad aiutarti a
              scoprire il mondo con facilità e autenticità. La nostra app ti
              offre un'esperienza personalizzata, facendoti scoprire
              destinazioni straordinarie e opportunità uniche. Dalle mete più
              famose ai luoghi nascosti, siamo qui per rendere ogni tuo viaggio
              un'avventura indimenticabile.
            </p>
            <p>
              <strong>Perché sceglierci?</strong>
              <br />
              Offriamo un'interfaccia intuitiva, consigli basati su recensioni
              autentiche e suggerimenti personalizzati in base ai tuoi
              interessi. Viaggiare con noi è semplice, sicuro e divertente.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsComponent;
