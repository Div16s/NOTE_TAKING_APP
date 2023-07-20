import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'

const Footer = () => {
    return (
        <footer
            style={
                {
                    width: "100%",
                    position: "relative",
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                }
            }
        >
        <Container>
            <Row>
                <Col className='text-center py-3'>Copyright &copy; KEEPER</Col>
            </Row>
        </Container>
        </footer>
    )
}

export default Footer