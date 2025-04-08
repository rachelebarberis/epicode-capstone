import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Card,
  Tab,
  Nav,
} from "react-bootstrap";
const EsploraComponent = () => {
  return (
    <Container fluid className="mt-4">
      <Row className="justify-content-end">
        <Col xs={12} md={6} lg={4}>
          <Form>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Cerca..."
                aria-label="Cerca"
                className="search-input"
              />
              <Button variant="outline-secondary" id="button-addon2">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <div className="d-flex justify-content-between align-content-center">
          <h4>Thailandia</h4>
          <div>
            <a>Scopri di più</a>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
        <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
          <Card>
            <Tab.Container id="card-tabs-1" defaultActiveKey="first">
              <Nav variant="pills" className="flex-row justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="first">£</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">££</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">£££</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card.Img variant="top" src="/public/images/thai.jpg" />
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Informazioni generali sulla Thailandia.</p>
                  </Card.Body>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Cultura thailandese, tradizioni e storia.</p>
                  </Card.Body>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Le principali attrazioni turistiche della Thailandia.</p>
                  </Card.Body>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card>
        </Col>

        <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
          <Card>
            <Tab.Container id="card-tabs-2" defaultActiveKey="first">
              <Nav variant="pills" className="flex-row justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="first">Info</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Cultura</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Attrazioni</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card.Img variant="top" src="/public/images/thai.jpg" />
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Informazioni generali sulla Thailandia.</p>
                  </Card.Body>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Cultura thailandese, tradizioni e storia.</p>
                  </Card.Body>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Le principali attrazioni turistiche della Thailandia.</p>
                  </Card.Body>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card>
        </Col>

        <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
          <Card>
            <Tab.Container id="card-tabs-3" defaultActiveKey="first">
              <Nav variant="pills" className="flex-row justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="first">Info</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Cultura</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Attrazioni</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card.Img variant="top" src="/public/images/thai.jpg" />
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Informazioni generali sulla Thailandia.</p>
                  </Card.Body>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Cultura thailandese, tradizioni e storia.</p>
                  </Card.Body>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Le principali attrazioni turistiche della Thailandia.</p>
                  </Card.Body>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card>
        </Col>

        <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
          <Card>
            <Tab.Container id="card-tabs-4" defaultActiveKey="first">
              <Nav variant="pills" className="flex-row justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="first">Info</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Cultura</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Attrazioni</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card.Img variant="top" src="/public/images/thai.jpg" />
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Informazioni generali sulla Thailandia.</p>
                  </Card.Body>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Cultura thailandese, tradizioni e storia.</p>
                  </Card.Body>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Card.Body>
                    <Card.Title className="text-center">Thailandia</Card.Title>
                    <p>Le principali attrazioni turistiche della Thailandia.</p>
                  </Card.Body>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default EsploraComponent;
