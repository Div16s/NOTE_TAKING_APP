import React from 'react'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MainScreen from '../../Components/MainScreen';
import {Button, Card,Form} from 'react-bootstrap';
import Loading from '../../Components/Loading';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createNoteAction } from '../../actions/notesActions';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const dispatch = useDispatch();

    const noteCreate = useSelector(state=>state.noteCreate);
    const {loading, error, note} = noteCreate;

    console.log(note);

    const resetHandler = () => {
        setTitle('');
        setContent('');
        setCategory('');
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if(!title || !content || !category){
            return;
        }

        dispatch(createNoteAction(title,content,category));

        resetHandler();
        navigate('/myNotes');
    }


  return (
    <MainScreen title='Create a Note'>
        <Card>
            <Card.Header>Create a new note</Card.Header>

            <Card.Body>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                        type='text'
                        value={title}
                        placeholder='Enter the title'
                        onChange={(e)=>setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='content'>
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                        as='textarea'
                        value={content}
                        placeholder='Enter the content'
                        rows={4}
                        onChange={(e)=>setContent(e.target.value)}
                        />
                    </Form.Group>

                    {content && (
                        <Card>
                            <Card.Header>Note Preview</Card.Header>
                            <Card.Body>
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </Card.Body>
                        </Card>
                    )}

                    <Form.Group className="mb-3" controlId='content'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                        type='content'
                        value={category}
                        placeholder='Enter the category'
                        onChange={(e)=>setCategory(e.target.value)}
                        />
                    </Form.Group>
                    
                    {loading && <Loading size={50} />}
                    <Button type='submit' variant='primary'>
                        Create Note
                    </Button>
                    <Button className='mx-2' onClick={resetHandler} variant='danger'>
                        Reset Fields
                    </Button>
                </Form>
            </Card.Body>

            <Card.Footer className='text-muted'>
                Creating on - {new Date().toLocaleDateString()}
            </Card.Footer>
        </Card>
    </MainScreen>
  )
}

export default CreateNote