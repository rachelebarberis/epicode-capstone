import { Container, Row, Col, Card } from "react-bootstrap";

const AboutUsComponent = () => {
  return (
    <Container fluid className="my-5">
      <div className="text-center mb-5">
        <h2>Chi Siamo</h2>
        <p className="lead text-muted">
          Scopri la nostra missione e come ti aiuteremo a vivere esperienze
          uniche in ogni angolo del mondo.
        </p>
      </div>

      <Row>
        {/* Colonna di sinistra con l'immagine */}
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center mb-4 mb-md-0"
        >
          <Card className="border-0 shadow-lg">
            <Card.Img
              variant="top"
              src="/public/images/travel_about_us.jpg" // Aggiungi il percorso della tua immagine
              className="rounded-circle"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                margin: "20px auto",
              }}
            />
          </Card>
        </Col>

        {/* Colonna di destra con il testo */}
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <div>
            <h3>La nostra Missione</h3>
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
