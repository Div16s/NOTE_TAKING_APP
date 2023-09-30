import React, { useEffect, useState } from 'react'
import MainScreen from '../../Components/MainScreen'
import { Form, Button } from 'react-bootstrap';
import { ErrorMessage } from '../../Components/ErrorMessage';
import Loading from '../../Components/Loading';
import axios from 'axios';
import './RegisterPage.css';
import {useSelector, useDispatch} from 'react-redux';
import { register } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg');
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const userRegister = useSelector((state)=>state.userRegister);
    const {loading, error, userInfo} = userRegister;

    useEffect(()=>{
        if(userInfo){
            navigate('/myNotes');
        }
    },[navigate,userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
        }
        else{
            dispatch(register(name,email,password,pic));
        }
        // if (password !== confirmPassword) {
        //     setMessage("Passwords do not match!");
        // }
        // else {
        //     setMessage('');
        //     try {
        //         const config = {
        //             "Content-type": "application/json"
        //         }

        //         setLoading(true);
        //         const { data } = await axios.post(
        //             "http://localhost:8000/user",
        //             { name, email, password, pic },
        //             config
        //         );
        //         setLoading(false);
        //         localStorage.setItem("userInfo", JSON.stringify(data));
        //     } catch (error) {
        //         setError(error.response.data.message);
        //         setLoading(false);
        //     }
        // };
    }

    const postDetails = (pics) => {
        if(!pics){
            return setPicMessage("Please select an image!");
        }
        setPicMessage(null);

        if(pics.type==='image/jpeg' || pics.type==='image/jpg' || pics.type==='image/png'){
            const data = new FormData();
            data.append('file',pics);
            data.append('upload_preset','KEEPER');
            data.append('cloud_name','dutrctlqx');
            fetch('https://api.cloudinary.com/v1_1/dutrctlqx/image/upload',{
                mode: 'no-cors',
                method:"post",
                body:data
            }).then((res)=>res.json()).then((data)=>{
                console.log(data);
                setPic(data.url.toString())
            }).catch((error)=>{
                console.log(error);
            })
        }
        else{
            return setPicMessage("Please select an image!");
        }
    }

    return (
        <MainScreen title='REGISTER'>
            <div className='registerContainer'>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='inputName'>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
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
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            onChange={(e)=>postDetails(e.target.files[0])}
                            type="file"
                        />
                    </Form.Group>

                    <Button variant="primary" className='btn btn-dark' type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </MainScreen>
    );
};

export default RegisterPage;