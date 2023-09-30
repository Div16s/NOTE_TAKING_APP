import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button';
import './LandingPage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            navigate("/myNotes");
        }
    }, [navigate]);
  return (
    <div className='main'>
        <Container>
            {/* style={{marginBottom:"10%"}} */}
            <Row style={{marginBottom:"45%"}}>
                <div className='intro-text'>
                    <div>
                        <h1 className='title'>Welcome To NOTESPHERE!</h1>
                        <h2 className='subtitle'>Your Universe of Infinite Possibilities in Note-Taking!</h2>
                        <p className='description'>Unleash your creativity, boost your productivity, and capture every brilliant idea effortlessly with NoteSphere.</p>
                    </div>
                    <div className='buttonContainer'>
                        <a href='/login'>
                            <Button size='lg' className='landingButton btn btn-light'>
                                Login
                            </Button>
                        </a>
                        <a href='/register'>
                            <Button size='lg' className='landingButton btn btn-outline-light' variant='outline-primary'>
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