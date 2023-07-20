import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <>
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}

export default App;
