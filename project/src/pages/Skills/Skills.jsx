import { useState } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '../../components/ParticleBackground/ParticleBackground'
import './Skills.scss'

const categories = ['Frontend', 'Backend', 'Tools', 'Other']

const skillsData = {
  Frontend: [
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'JavaScript', level: 95, color: '#F7DF1E' },
    { name: 'HTML5', level: 95, color: '#E34F26' },
    { name: 'CSS3', level: 90, color: '#1572B6' },
    { name: 'SCSS', level: 80, color: '#CC6699' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'Redux', level: 85, color: '#764ABC' },
    { name: 'Framer Motion', level: 70, color: '#0055FF' },
  ],
  Backend: [
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'Express', level: 80, color: '#000000' },
    { name: 'MongoDB', level: 75, color: '#47A248' },
    { name: 'Firebase', level: 70, color: '#FFCA28' },
    { name: 'GraphQL', level: 65, color: '#E10098' },
    { name: 'SQL', level: 60, color: '#4479A1' },
  ],
  Tools: [
    { name: 'Git', level: 90, color: '#F05032' },
    { name: 'Webpack', level: 75, color: '#8DD6F9' },
    { name: 'Docker', level: 65, color: '#2496ED' },
    { name: 'Jest', level: 70, color: '#C21325' },
    { name: 'npm', level: 85, color: '#CB3837' },
  ],
  Other: [
    { name: 'UI/UX Design', level: 80, color: '#FF61F6' },
    { name: 'Responsive Design', level: 90, color: '#38B2AC' },
    { name: 'Performance Optimization', level: 75, color: '#EF4444' },
    { name: 'Agile', level: 70, color: '#10B981' },
  ],
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  
  return (
    <motion.div 
      className="skills-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticleBackground />
      
      <div className="skills-content">
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills & Technologies
        </motion.h1>
        
        <motion.div 
          className="category-navigation hud-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(category => (
            <button 
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
              {activeCategory === category && (
                <motion.div 
                  className="active-indicator"
                  layoutId="categoryIndicator"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>
        
        <motion.div 
          className="skills-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatedSkillCards skills={skillsData[activeCategory]} category={activeCategory} />
        </motion.div>
        
        <motion.div 
          className="skills-summary hud-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3>My Approach</h3>
          <p>I believe in continuous learning and staying updated with the latest technologies. My focus is on creating efficient, scalable, and maintainable code while delivering exceptional user experiences.</p>
          
          <div className="skill-stats">
            <div className="stat">
              <div className="stat-value">2+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            
            <div className="stat">
              <div className="stat-value">25+</div>
              <div className="stat-label">Completed Projects</div>
            </div>
            
            <div className="stat">
              <div className="stat-value">20+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const AnimatedSkillCards = ({ skills, category }) => {
  return (
    <motion.div 
      className="skills-container"
      key={category}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {skills.map((skill, index) => (
        <motion.div 
          key={skill.name}
          className="skill-card hud-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="skill-header">
            <h3 className="skill-name">{skill.name}</h3>
            <div 
              className="skill-icon"
              style={{ backgroundColor: `${skill.color}20`, borderColor: skill.color }}
            >
              <div className="skill-icon-inner" style={{ backgroundColor: skill.color }}></div>
            </div>
          </div>
          
          <div className="skill-level-container">
            <div className="skill-level-bar">
              <motion.div 
                className="skill-level-fill"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                style={{ 
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.color}90)`,
                  boxShadow: `0 0 10px ${skill.color}80` 
                }}
              />
            </div>
            <div className="skill-percentage">{skill.level}%</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Skills