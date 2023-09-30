import React, { useEffect } from 'react'
import { useState } from 'react';
import MainScreen from '../../Components/MainScreen';
import { Card, Form, Button } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Components/Loading';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateNoteAction } from '../../actions/notesActions';
import { deleteNoteAction } from '../../actions/notesActions';

const SingleNote = () => {
    const { id } = useParams();
    const navigate = useNavigate('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const dispatch = useDispatch();

    const noteUpdate = useSelector(state => state.noteUpdate);
    const { loading, error } = noteUpdate;

    const noteDelete = useSelector(state => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteNoteAction(id));
            navigate('/myNotes');
        }
    }

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`http://localhost:5000/notes/${id}`);
            console.log(id);
            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };

        fetching();
    }, [id, date])

    const resetHandler = () => {
        setTitle('');
        setContent('');
        setCategory('');
    };

    const updateHandler = (e) => {
        e.preventDefault();

        if (!title || !content || !category) return;

        dispatch(updateNoteAction(id, title, content, category));

        resetHandler();
        navigate('/myNotes');
    };

    return (
        <MainScreen title='Edit Note'>
            <Card>
                <Card.Header>Edit your note</Card.Header>

                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
                        {loading && <Loading />}
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        <Form.Group className="mb-3" controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='title'
                                value={title}
                                placeholder='Enter the title'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId='content'>
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as='textarea'
                                value={content}
                                placeholder='Enter the content'
                                rows={4}
                                onChange={(e) => setContent(e.target.value)}
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
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>

                        {loading && <Loading size={50} />}
                        <Button type='submit' className='btn btn-dark' variant='primary'>
                            Update Note
                        </Button>
                        <Button className='mx-2' variant='danger' onClick={() => deleteHandler(id)}>
                            Delete Note
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className='text-muted'>
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default SingleNote