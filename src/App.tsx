import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Booking from './pages/Booking';
import DamesHeren from './pages/DamesHeren';
import Safety from './pages/Safety';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import './App.css';

function App() {
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="grain-overlay"></div>
        <div className="vignette"></div>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evenementen" element={<Events />} />
            <Route path="/boeking" element={<Booking />} />
            <Route path="/boeking/:eventId" element={<Booking />} />
            <Route path="/dames-heren" element={<DamesHeren />} />
            <Route path="/veiligheid" element={<Safety />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/algemene-voorwaarden" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
