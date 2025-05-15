import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Loader.scss'

const bootSequenceSteps = [
  'Initializing system...',
  'Loading core modules...',
  'Configuring environment...',
  'Establishing secure connection...',
  'Preparing UI components...',
  'Loading user data...',
  'System ready...'
]

const Loader = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loadingPercent, setLoadingPercent] = useState(0)
  
  useEffect(() => {
    const stepDuration = 3500 / bootSequenceSteps.length
    
    const interval = setInterval(() => {
      setCurrentStep(prevStep => {
        if (prevStep < bootSequenceSteps.length - 1) {
          return prevStep + 1
        }
        clearInterval(interval)
        return prevStep
      })
    }, stepDuration)
    
    const percentInterval = setInterval(() => {
      setLoadingPercent(prev => {
        const newPercent = prev + (100 / (3500 / 50))
        return newPercent >= 100 ? 100 : newPercent
      })
    }, 50)
    
    return () => {
      clearInterval(interval)
      clearInterval(percentInterval)
    }
  }, [])
  
  return (
    <div className="loader">
      <div className="loader-content">
        <motion.div 
          className="loader-circle"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inner-circle"></div>
          <div className="rotating-circle"></div>
        </motion.div>
        
        <motion.div 
          className="boot-sequence"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="terminal">
            {bootSequenceSteps.map((step, index) => (
              <motion.div 
                key={index} 
                className={`terminal-line ${index <= currentStep ? 'active' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= currentStep ? 1 : 0, 
                  x: index <= currentStep ? 0 : -20 
                }}
                transition={{ delay: index * 0.5, duration: 0.3 }}
              >
                <span className="terminal-prompt">{'>'}</span> {step}
              </motion.div>
            ))}
          </div>
          
          <div className="loading-bar-container">
            <div 
              className="loading-bar" 
              style={{ width: `${loadingPercent}%` }}
            ></div>
            <div className="loading-percentage">{Math.round(loadingPercent)}%</div>
          </div>
        </motion.div>
        
        <motion.h1 
          className="loader-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          Mohit<span className="accent">OS</span> <span className="version">v2.0</span>
        </motion.h1>
      </div>
    </div>
  )
}

export default Loader