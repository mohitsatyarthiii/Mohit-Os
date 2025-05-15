import { useEffect, useRef } from 'react'
import './ParticleBackground.scss'

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    // Handle resize
    window.addEventListener('resize', setCanvasSize)
    setCanvasSize()
    
    // Particle class
    class Particle {
      constructor() {
        this.reset()
      }
      
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.6 + 0.2
        this.color = this.getRandomColor()
      }
      
      getRandomColor() {
        const colors = ['#00e5ff', '#7b68ee', '#4d5dfb', '#00a2ff']
        return colors[Math.floor(Math.random() * colors.length)]
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }
      
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }
    
    // Create particles
    const particles = []
    const numParticles = Math.min(Math.floor(window.innerWidth * window.innerHeight / 10000), 100)
    
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle())
    }
    
    // Draw grid lines
    const drawGrid = () => {
      const gridSize = 50
      const opacity = 0.07
      
      ctx.strokeStyle = '#ffffff'
      ctx.globalAlpha = opacity
      ctx.beginPath()
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
      }
      
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw grid
      drawGrid()
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      // Connect close particles
      ctx.strokeStyle = '#4d5dfb'
      ctx.lineWidth = 0.3
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.globalAlpha = 0.2 * (1 - distance / 100)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      
      ctx.globalAlpha = 1
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="particle-background" />
}

export default ParticleBackground