import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        {/* Navbar */}
        <nav className="flex gap-6 p-6 border-b border-zinc-800 justify-center">
          <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-purple-400 transition-colors">About</Link>
        </nav>

        {/* Page Content Container */}
        <main className="flex-1 flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;