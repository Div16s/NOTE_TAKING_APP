import React from 'react'
import MainScreen from '../../Components/MainScreen'
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../actions/userActions';
import Loading from '../../Components/Loading';
import './ProfilePage.css';

const ProfilePage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pic, setPic] = useState('')
    const [picMessage, setPicMessage] = useState('')

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, error, success } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
        else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);
        }
    }, [navigate, userInfo])


    const postDetails = (pics) => {
        if (!pics) {
            return setPicMessage("Please select an image!");
        }
        setPicMessage(null);

        if (pics.type === 'image/jpeg' || pics.type === 'image/jpg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'KEEPER');
            data.append('cloud_name', 'dutrctlqx');
            fetch('https://api.cloudinary.com/v1_1/dutrctlqx/image/upload', {
                //mode: 'no-cors',
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPic(data.url.toString());
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            return setPicMessage("Please select an image!");
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch(updateProfile({ name, email, password, pic }));
        }
    };


    return (
        <MainScreen title='EDIT PROFILE'>
            <div>
                <Row className='profileContainer'>
                    <Col md={6}>
                        {loading && <Loading />}
                        {success && <ErrorMessage variant='success'>Profile Updated Successfully!</ErrorMessage>}
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    placeholder="Enter name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>

                            {picMessage && <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>}
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label>Change Profile Picture</Form.Label>
                                <Form.Control
                                    onChange={(e) => postDetails(e.target.files[0])}
                                    type="file"
                                />
                            </Form.Group>

                            <Button variant="primary" className='btn btn-dark' type="submit">
                                Update
                            </Button>
                        </Form>
                    </Col>

                    <Col md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={pic} alt={name} className='profilePic' ></img>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
};

export default ProfilePage