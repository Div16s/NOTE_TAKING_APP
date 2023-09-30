import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MainScreen from '../../Components/MainScreen'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import { Accordion, Badge } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/esm/Card';
import { useDispatch, useSelector } from 'react-redux';
import { listNotes } from '../../actions/notesActions';
import Loading from '../../Components/Loading';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { deleteNoteAction } from '../../actions/notesActions';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <button
            type="button"
            style={{ backgroundColor: 'yellow',border:'none' }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}

const MyNotes = ({search}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const noteList = useSelector(state=>state.noteList);
    const {loading, notes, error} = noteList;


    //const [notes, setNotes] = useState([])

    const userLogin = useSelector(state=>state.userLogin);
    const {userInfo} = userLogin;

    const noteCreate = useSelector(state=>state.noteCreate);
    const {success: successCreate} = noteCreate;

    const noteUpdate = useSelector(state => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector(state => state.noteDelete);
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = noteDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteNoteAction(id));
        }
    }

    // const fetchNotes = async () => {
    //     const {data} = await axios.get("http://localhost:8000/notes");
    //     setNotes(data);
    // }

    useEffect(() => {
        // fetchNotes();
        dispatch(listNotes());
        if(!userInfo){
            navigate('/');
        }
    }, [dispatch,successCreate,navigate,userInfo,successUpdate,successDelete])
    
    return (
        <MainScreen title={`Welcome back ${userInfo.name}....`}>
            <Link to='createNote'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} className='btn btn-dark' size='lg'>
                    Create New Note
                </Button>
            </Link>
            {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading />}
            {
                notes?.reverse().filter(filteredNote => (
                    filteredNote.title.toLowerCase().includes(search.toLowerCase())
                )).map(note => (
                    <Accordion defaultActiveKey='1' flush>
                        {/* <Accordion.Item eventKey='0'> */}
                            <Card key={note.id} style={{ margin: 10 }}>
                                <Card.Header style={{ display: "flex" }}>
                                    <span style={{ color: 'black', textDecoration: 'none', flex: 1, cursor: PointerEvent, alignSelf: 'center', fontSize: 18 }}>
                                        <CustomToggle>
                                            {note.title}
                                        </CustomToggle>

                                    </span>
                                    <div>
                                        <Button className='btn btn-dark'  href={`/note/${note._id}`}>Edit</Button>
                                        <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note._id)}>Delete</Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse>
                                    <Card.Body>
                                        <h4>
                                            <Badge pill bg="success">
                                                Category - {note.category}
                                            </Badge>
                                        </h4>
                                        <blockquote className="blockquote mb-0">
                                            <p>
                                                {note.content}
                                            </p>
                                            <footer className="blockquote-footer">
                                                Created On {" "}
                                                <cite title='Source Title'>
                                                    {note.createdAt.substring(0,10)};
                                                </cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Accordion.Collapse>

                            </Card>
                        {/* </Accordion.Item> */}

                    </Accordion>

                ))
            }
        </MainScreen>
    )
}

export default MyNotes