import { useRef } from 'react'
import { motion } from 'framer-motion'
import TechOrbit from '../TechOrbit/TechOrbit'
import './ProjectCard.scss'

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null)
  
  return (
    <motion.div 
      className="project-card hud-panel glowing-border"
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="project-card-header">
        <div className="project-id">
          <span className="id-label">PROJECT</span>
          <span className="id-number">#00{Math.floor(Math.random() * 90) + 10}</span>
        </div>
        <div className="project-status">
          <span className="status-indicator"></span>
          <span className="status-text">ACTIVE</span>
        </div>
      </div>

      <div className="project-card-content">
        <div className="project-info">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          
          <div className="project-links">
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="futuristic-button"
            >
              View Live
            </a>
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="futuristic-button"
            >
              GitHub Repo
            </a>
          </div>
        </div>
        
        <div className="project-visual">
          <div className="project-image-container">
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-image"
            />
            <div className="image-overlay"></div>
          </div>
          
          <TechOrbit technologies={project.technologies} />
        </div>
      </div>
      
      <div className="card-decorations">
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>
      </div>
    </motion.div>
  )
}

export default ProjectCard