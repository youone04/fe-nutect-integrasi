import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer style={{backgroundColor:'#2D4356', color:'white', fontWeight:'bold'}}>
            <Container>
                <Row>
                    <Col md={12} lg={12}>
                        <div className="copy-right-admin d-lg-flex mt-3">
                            <p>&copy; PT. Nutech Integrasi 2023| All Righta Reserved</p>
                            <p>Privacy policy | Terms of ervice</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;