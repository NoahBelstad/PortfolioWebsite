import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex justify-center items-start">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}