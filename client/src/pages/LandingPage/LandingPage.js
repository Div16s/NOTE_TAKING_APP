import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className='main'>
        <Container>
            <Row style={{marginBottom:"50%"}}>
                <div className='intro-text'>
                    <div>
                        <h1 className='title'>Welcome To Keeper!</h1>
                        <p className='subtitle'>One safe place to keep all your notes.</p>
                    </div>
                    <div className='buttonContainer'>
                        <a href='/login'>
                            <Button size='lg' className='landingButton'>
                                Login
                            </Button>
                        </a>
                        <a href='/register'>
                            <Button size='lg' className='landingButton' variant='outline-primary'>
                                Signup
                            </Button>
                        </a>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
  )
}

export default LandingPage