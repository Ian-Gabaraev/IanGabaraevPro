import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Quiz from './pages/Quiz';
import Learn from './pages/Learn';
import LearnGuide from './pages/LearnGuide';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:slug" element={<LearnGuide />} />
          <Route path="/learn-full-stack" element={<Navigate to="/learn/full-stack-interview-prep" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
