import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import logoImage from './NP.png';


const Header = ({setSearch}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" variant='dark' bg='dark'>
            <Container fluid>
                <Navbar.Brand>
                    <Link to='/' style={{color:"white",marginLeft:"50px"}}>
                      <img src={logoImage} alt='KEEPER' height='42px'></img>
                      </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className='m-auto'>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e)=>setSearch(e.target.value)}
                            />
                        </Form>
                    </Nav>
                    {userInfo?(<Nav
                        className="my-2 my-lg-0"
                        style={{ maxHeight: '100px', marginRight: "50px" }}
                        navbarScroll
                    >
                        <Nav.Link>
                            <Link to='/myNotes' style={{color:"white"}}>My Notes</Link>
                        </Nav.Link>
                        <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                        </Nav.Link>
                    </Nav>):
                    (<Nav>
                        {" "}
                        {/* <Nav.Link>
                            <Link to='/login' style={{color:'white',marginRight:"50px"}}>LOGIN</Link>
                        </Nav.Link> */}
                        <Button className='btn btn-outline-warning' variant='outline-primary' style={{color:'white',fontFamily:'Courier New',fontWeight:'bold'}}>{Date().substring(0,25)}</Button>
                    </Nav>)}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header