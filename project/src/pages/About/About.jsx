import { useRef } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '../../components/ParticleBackground/ParticleBackground'
import './About.scss'

const About = () => {
  const containerRef = useRef(null)
  
  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
    >
      <ParticleBackground />
      
      <div className="about-content">
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h1>
        
        <div className="about-grid">
          <motion.div 
            className="about-image-container hud-panel glowing-border"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="about-image">
              <img src="/images/mohit.jpeg" alt="Mohit" />
              <div className="image-overlay"></div>
            </div>
            
            <div className="scan-effect"></div>
            
            <div className="image-data">
              <div className="data-item">
                <span className="data-label">NAME</span>
                <span className="data-value">Mohit Satyarthi</span>
              </div>
              <div className="data-item">
                <span className="data-label">STATUS</span>
                <span className="data-value">ACTIVE</span>
              </div>
              <div className="data-item">
                <span className="data-label">LOCATION</span>
                <span className="data-value">Pune, India</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-text hud-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="panel-header">
              <div className="header-title">PROFILE</div>
              <div className="header-decoration"></div>
            </div>
            
            <div className="panel-content">
              <p>Hi! I'm <span className="highlight">Mohit Satyarthi</span>, a passionate full-stack developer with expertise in creating modern web applications using cutting-edge technologies.</p>
              
              <p>With 2+ years of experience in web development, I specialize in building scalable and performant applications with React, Node.js, and other modern frameworks. My approach combines technical excellence with creative problem-solving.</p>
              
              <p>When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers.</p>
            </div>
            
            <div className="quote-container">
              <blockquote>
                "The future belongs to those who believe in the beauty of their dreams."
              </blockquote>
              <div className="quote-author">— Eleanor Roosevelt</div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-connect hud-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="panel-header">
              <div className="header-title">CONNECT</div>
              <div className="header-decoration"></div>
            </div>
            
            <div className="connect-grid">
              <a href="https://github.com/mohitsatyarthiii" className="connect-item">
                <div className="connect-icon github"></div>
                <div className="connect-text">GitHub</div>
              </a>
              
              <a href="https://linkedin.com/in/mohitsatyarthii" className="connect-item">
                <div className="connect-icon linkedin"></div>
                <div className="connect-text">LinkedIn</div>
              </a>
              
              <a href="https://instagram.com/mohitsatyarthii" className="connect-item">
                <div className="connect-icon twitter"></div>
                <div className="connect-text">Instagram</div>
              </a>
              
              <a href="mohitsatyarthi11@gmail.com" className="connect-item">
                <div className="connect-icon email"></div>
                <div className="connect-text">Email</div>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-interests hud-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="panel-header">
              <div className="header-title">INTERESTS</div>
              <div className="header-decoration"></div>
            </div>
            
            <div className="interests-container">
              <div className="interest-item">
                <div className="interest-icon web"></div>
                <div className="interest-text">Web Development</div>
              </div>
              
              <div className="interest-item">
                <div className="interest-icon ai"></div>
                <div className="interest-text">AI & Machine Learning</div>
              </div>
              
              <div className="interest-item">
                <div className="interest-icon design"></div>
                <div className="interest-text">UI/UX Design</div>
              </div>
              
              <div className="interest-item">
                <div className="interest-icon gaming"></div>
                <div className="interest-text">Gaming</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default About