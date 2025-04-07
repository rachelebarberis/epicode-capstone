import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <Container>
      <div className="d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="mb-3 mt-5">WanderLOst</h1>
        <h2>Perderti nelle meraviglie del mondo!</h2>

        <hr className="w-50 my-4" />

        <blockquote className="blockquote text-center">
          <p className="mb-0">
            "Viaggiare ti lascia senza parole, poi ti trasforma in un
            narratore."
          </p>
          <footer
            className="blockquote-footer pt-3"
            style={{ color: "#532c09" }}
          >
            Ibn Battun
          </footer>
        </blockquote>

        <hr className="w-100 my-4" style={{ color: "#7A3E1F" }} />
      </div>
      <div>
        <section className="mt-5">
          <div className="d-flex justify-content-between align-content-center">
            <h4>Esplora</h4>
            <div>
              <a>Scopri di più</a>
              <i class="bi bi-chevron-right"></i>
            </div>
          </div>

          <Row>
            <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Card.Img variant="top" src="/public/images/thai.jpg" />
                <Card.Body>
                  <Card.Title className="text-center">Thailandia</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Card.Img variant="top" src="/public/images/thai.jpg" />
                <Card.Body>
                  <Card.Title className="text-center">Thailandia</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Card.Img variant="top" src="/public/images/thai.jpg" />
                <Card.Body>
                  <Card.Title className="text-center">Thailandia</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Card.Img variant="top" src="/public/images/thai.jpg" />
                <Card.Body>
                  <Card.Title className="text-center">Thailandia</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
        <section className="mt-5">
          <div className="d-flex justify-content-between align-content-center">
            <h4>Recensioni</h4>
            <div>
              <a>Scopri di più</a>
              <i class="bi bi-chevron-right"></i>
            </div>
          </div>
          <Row>
            <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
              <Card className="border-0" id="recensioni">
                <Card.Img
                  variant="top"
                  src="/public/images/thai.jpg"
                  id="imgrecensioni"
                />
                <Card.Body>
                  <Card.Title className="text-center">Rachele</Card.Title>
                  <Card.Text className="text-center">
                    Viaggio stupendo
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
              <Card className="border-0" id="recensioni">
                <Card.Img
                  variant="top"
                  src="/public/images/thai.jpg"
                  id="imgrecensioni"
                />
                <Card.Body>
                  <Card.Title className="text-center">Rachele</Card.Title>
                  <Card.Text className="text-center">
                    Viaggio stupendo
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
              <Card className="border-0" id="recensioni">
                <Card.Img
                  variant="top"
                  src="/public/images/thai.jpg"
                  id="imgrecensioni"
                />
                <Card.Body>
                  <Card.Title className="text-center">Rachele</Card.Title>
                  <Card.Text className="text-center">
                    Viaggio stupendo
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
              <Card className="border-0" id="recensioni">
                <Card.Img
                  variant="top"
                  src="/public/images/thai.jpg"
                  id="imgrecensioni"
                />
                <Card.Body>
                  <Card.Title className="text-center">Rachele</Card.Title>
                  <Card.Text className="text-center">
                    Viaggio stupendo
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
        <section className="mt-5">
          <div className="d-flex flex-column justify-content-center align-items-center border border-1">
            {" "}
            <h4>AboutUs</h4>
            <p>
              Siamo un team di appassionati viaggiatori pronti a guidarti verso
              le migliori esperienze del mondo.
              <br />
              Scopri di più sulla nostra missione e sul nostro team!
            </p>
            <Link to="/AboutUs">
              <p>Scopri di più</p>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
};
export default HomeComponent;
