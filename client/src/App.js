import './App.css';
import { useState } from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNotes from './pages/MyNotes/MyNotes';
import CreateNote from './pages/CreateNote/CreateNote';
import SingleNote from './pages/SingleNote/SingleNote';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  const [search, setSearch] = useState('')
  console.log(search);
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path='/' Component={LandingPage}></Route>
          <Route path='/login' Component={LoginPage}></Route>
          <Route path='/register' Component={RegisterPage}></Route>
          <Route path='/profile' Component={ProfilePage}></Route>
          <Route path='/myNotes/createNote' Component={CreateNote}></Route>
          <Route path='/note/:id' Component={SingleNote}></Route>
          <Route path='/myNotes' Component={() => <MyNotes search={search}/>}></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
