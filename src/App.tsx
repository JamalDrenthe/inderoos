import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteNavigation from './components/SiteNavigation';
import SiteFooterV2 from './components/SiteFooterV2';
import ScrollToTop from './components/ScrollToTop';
import AgeVerification from './components/AgeVerification';
import HomeV3 from './pages/HomeV3';
import EventsV3 from './pages/EventsV3';
import Prices from './pages/Prices';
import Vacatures from './pages/Vacatures';
import Booking from './pages/BookingV2';
import DamesHeren from './pages/DamesHeren';
import SafetyV2 from './pages/SafetyV2';
import ContactV2 from './pages/ContactV2';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import ThankYou from './pages/ThankYou';
import CommunityV2 from './pages/CommunityV2';
import Blog from './pages/Blog';
import Shop from './pages/Shop';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import MissionVision from './pages/MissionVision';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <AgeVerification />
          <div className="grain-overlay"></div>
          <div className="vignette"></div>
          <SiteNavigation />
          {/* Scroll to top on route change */}
          <ScrollToTop />
          <main>
            <Routes>
              <Route path="/" element={<HomeV3 />} />
              <Route path="/evenementen" element={<EventsV3 />} />
              <Route path="/prijzen" element={<Prices />} />
              <Route path="/boeking" element={<Booking />} />
              <Route path="/boeking/:eventId" element={<Booking />} />
              <Route path="/bedankt" element={<ThankYou />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/community" element={<CommunityV2 />} />
              <Route path="/member-login" element={<CommunityV2 />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/over-ons" element={<AboutUs />} />
              <Route path="/missie-visie" element={<MissionVision />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/diensten" element={<Services />} />
              <Route path="/dames-heren" element={<DamesHeren />} />
              <Route path="/veiligheid" element={<SafetyV2 />} />
              <Route path="/huisregels" element={<SafetyV2 />} />
              <Route path="/vacatures" element={<Vacatures />} />
              <Route path="/contact" element={<ContactV2 />} />
              <Route path="/algemene-voorwaarden" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
            </Routes>
          </main>
          <SiteFooterV2 />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
