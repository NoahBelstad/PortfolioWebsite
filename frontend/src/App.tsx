import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Activity from './pages/Activity';
import Blog from './pages/Blog';
import Uses from './pages/Uses';

export default function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
          <div>
            <Navbar />
            <main className="flex justify-center items-start">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/uses" element={<Uses />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </PortfolioProvider>
  );
}