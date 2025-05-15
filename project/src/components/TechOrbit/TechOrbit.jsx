import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './TechOrbit.scss'

const TechOrbit = ({ technologies }) => {
  const orbitRef = useRef(null)
  
  // Map tech names to icon classes or placeholder color
  const getTechColor = (tech) => {
    const techColors = {
      'React': '#61DAFB',
      'Node.js': '#339933',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'HTML': '#E34F26',
      'CSS': '#1572B6',
      'MongoDB': '#47A248',
      'Firebase': '#FFCA28',
      'Socket.io': '#010101',
      'SCSS': '#CC6699',
      'Framer Motion': '#0055FF',
      'CSS Modules': '#000000',
    }
    
    return techColors[tech] || '#00e5ff'
  }
  
  useEffect(() => {
    const orbit = orbitRef.current
    if (!orbit) return
    
    const setItemPositions = () => {
      const items = orbit.querySelectorAll('.tech-item')
      const total = items.length
      const radius = orbit.offsetWidth / 2
      
      items.forEach((item, index) => {
        const angle = (index / total) * Math.PI * 2
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        
        item.style.transform = `translate(${x}px, ${y}px) scale(1)`
      })
    }
    
    setItemPositions()
    window.addEventListener('resize', setItemPositions)
    
    return () => {
      window.removeEventListener('resize', setItemPositions)
    }
  }, [technologies])
  
  return (
    <div className="tech-orbit-container">
      <motion.div 
        className="tech-orbit"
        ref={orbitRef}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {technologies.map((tech, index) => (
          <div 
            key={index} 
            className="tech-item"
            style={{ 
              animationDelay: `${index * 0.5}s`,
              backgroundColor: getTechColor(tech),
            }}
          >
            <span className="tech-name">{tech}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default TechOrbit