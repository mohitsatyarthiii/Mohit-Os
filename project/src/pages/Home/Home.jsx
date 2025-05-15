import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ParticleBackground from '../../components/ParticleBackground/ParticleBackground'
import './Home.scss'

const Home = () => {
  const containerRef = useRef(null)
  const [showContactSuccess, setShowContactSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true })
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true })
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowContactSuccess(true)
    setTimeout(() => {
      setShowContactSuccess(false)
      setFormData({ name: '', email: '', message: '' })
    }, 5000)
  }
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      
      const elements = containerRef.current.querySelectorAll('.parallax')
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const moveX = (e.clientX - centerX) / 50
      const moveY = (e.clientY - centerY) / 50
      
      elements.forEach(el => {
        const depth = parseFloat(el.getAttribute('data-depth'))
        el.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`
      })
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <motion.div 
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticleBackground />
      
      <div className="home-content" ref={containerRef}>
        {/* Hero Section */}
        <div className="welcome-container">
          <motion.div 
            className="welcome-text parallax"
            data-depth="1.5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="welcome">
              <span className="greeting">Welcome to</span>
              <h1 className="name glowing-text">Mohit<span className="accent">OS</span></h1>
              <p className="subtitle">Developer • Designer • Innovator</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="hud-stats parallax"
            data-depth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="stat-item">
              <div className="stat-label">Experience</div>
              <div className="stat-value">2+ Years</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-label">Projects</div>
              <div className="stat-value">25+</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-label">Technologies</div>
              <div className="stat-value">20+</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '90%' }}></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="decorative-elements"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="circle-element parallax" data-depth="2"></div>
            <div className="square-element parallax" data-depth="1.2"></div>
            <div className="triangle-element parallax" data-depth="2.5"></div>
          </motion.div>
          
          <motion.div 
            className="home-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link to="/projects" className="cta-button">
              <span>View Projects</span>
              <div className="button-glow"></div>
            </Link>
            
            <Link to="/about" className="cta-button secondary">
              <span>About Me</span>
              <div className="button-glow"></div>
            </Link>
          </motion.div>
        </div>

        {/* Featured Work Section */}
        <motion.section 
  className="featured-work hud-panel"
  ref={ref1}
  initial={{ opacity: 0, y: 50 }}
  animate={inView1 ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
  <h2>Featured Work</h2>
  <div className="work-grid">
    {[
      {
        title: "Couturio",
        description: "A modern fashion e-commerce platform with AI-driven personalization.",
        image: "/images/couturio.png",
        link: "#"
      },
      {
        title: "SkillScape",
        description: "A sleek LMS that makes learning interactive, accessible, and smart.",
        image: "/images/skillscape.png",
        link: "#"
      },
      {
        title: "PingMe",
        description: "A real-time chat app with smooth UI and lightning-fast messaging.",
        image: "/images/pingme.png",
        link: "#"
      }
    ].map((project, index) => (
      <motion.div 
        key={index}
        className="work-item"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="work-image">
          <img src={project.image} alt={project.title} />
          <div className="work-overlay">
            <span className="view-project">View Project</span>
          </div>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </motion.div>
    ))}
  </div>
</motion.section>

        {/* Services Section */}
        <motion.section 
          className="services hud-panel"
          ref={ref2}
          initial={{ opacity: 0, y: 50 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Services</h2>
          <div className="services-grid">
            {[
              { title: "Web Development", icon: "🌐" },
              { title: "Mobile Apps", icon: "📱" },
              { title: "UI/UX Design", icon: "🎨" },
              { title: "Cloud Solutions", icon: "☁️" }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="service-item"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>Delivering exceptional solutions with modern technology</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section 
          className="contact-section hud-panel"
          ref={ref3}
          initial={{ opacity: 0, y: 50 }}
          animate={inView3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Contact Me</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
              <div className="button-glow"></div>
            </button>
          </form>
        </motion.section>

        {/* Success Message */}
        <AnimatePresence>
          {showContactSuccess && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <div className="success-content">
                <div className="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>I'll get back to you soon.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="site-footer hud-panel">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Connect</h3>
              <div className="social-links">
                <a href="https://github.com/mohitsatyarthiii" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/mohitsatyarthii" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://instagram.com/mohitsatyarthii" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Navigation</h3>
              <nav className="footer-nav">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/skills">Skills</Link>
                <Link to="/projects">Projects</Link>
              </nav>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: mohitsatyarthi11@gmail.com</p>
              <p>Phone: +91-7486079506</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 MohitOS. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </motion.div>
  )
}

export default Home