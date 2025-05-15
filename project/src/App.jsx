import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar/Navbar'
import Loader from './components/Loader/Loader'
import Chatbot from './components/Chatbot';

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Skills from './pages/Skills/Skills'
import Projects from './pages/Projects/Projects'

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Simulate boot sequence
    const timer = setTimeout(() => {
      setLoading(false)
    }, 4000)
    
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="app">
      <Navbar /> 
      <Chatbot 
      apiEndpoint="/api/chat"
        botName="Jarvis"
        primaryColor="#3b82f6"
        secondaryColor="#1e40af"
        position="bottom-right"
        welcomeMessage="Hello! I'm Jarvis, your AI assistant. How can I help you today?"/>
      <div className="content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App