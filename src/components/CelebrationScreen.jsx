import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import AIChat from './AIChat'

const CelebrationScreen = () => {
  const [showAI, setShowAI] = useState(false)
  const [particles, setParticles] = useState([])
  const [fireworks, setFireworks] = useState([])

  useEffect(() => {
    setTimeout(() => setShowAI(true), 3000)
    
    // Create magical particles
    const newParticles = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      color: ['#ff1744', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'][Math.floor(Math.random() * 16)],
      delay: Math.random() * 4
    }))
    setParticles(newParticles)

    // Create spectacular fireworks
    const newFireworks = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 80 + 10,
      emoji: ['🎆', '✨', '💫', '🌟', '💥', '🎊', '🎉', '⚡', '🔥', '🌈', '💎', '🎭', '🎪', '🎨', '🎯'][Math.floor(Math.random() * 15)],
      delay: Math.random() * 5
    }))
    setFireworks(newFireworks)
  }, [])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* ULTRA SPECTACULAR ANIMATED BACKGROUND */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, #ff0040 0%, #ff4081 10%, #e91e63 20%, #9c27b0 30%, #673ab7 40%, #3f51b5 50%, #2196f3 60%, #03a9f4 70%, #00bcd4 80%, #009688 90%, #00ffff 100%)',
            'radial-gradient(circle at 80% 20%, #00ffff 0%, #00bcd4 10%, #009688 20%, #4caf50 30%, #8bc34a 40%, #cddc39 50%, #ffeb3b 60%, #ffc107 70%, #ff9800 80%, #ff5722 90%, #ffff00 100%)',
            'radial-gradient(circle at 80% 80%, #ffff00 0%, #ff5722 10%, #ff9800 20%, #ffc107 30%, #ffeb3b 40%, #cddc39 50%, #8bc34a 60%, #4caf50 70%, #009688 80%, #e91e63 90%, #ff00ff 100%)',
            'radial-gradient(circle at 20% 80%, #ff00ff 0%, #e91e63 10%, #9c27b0 20%, #673ab7 30%, #3f51b5 40%, #2196f3 50%, #03a9f4 60%, #00bcd4 70%, #009688 80%, #4caf50 90%, #00ff00 100%)',
            'radial-gradient(circle at 50% 10%, #00ff00 0%, #4caf50 15%, #009688 30%, #00bcd4 45%, #03a9f4 60%, #2196f3 75%, #9c27b0 90%, #ff0040 100%)',
            'radial-gradient(circle at 10% 50%, #ff0040 0%, #ff1744 15%, #e91e63 30%, #9c27b0 45%, #673ab7 60%, #ffeb3b 75%, #4caf50 90%, #00ffff 100%)',
            'radial-gradient(circle at 90% 50%, #00ffff 0%, #03a9f4 15%, #2196f3 30%, #9c27b0 45%, #ff1744 60%, #ff9800 75%, #ffff00 90%, #ff00ff 100%)',
            'radial-gradient(circle at 50% 90%, #ff00ff 0%, #9c27b0 15%, #673ab7 30%, #cddc39 45%, #4caf50 60%, #00bcd4 75%, #ff0040 90%, #ffff00 100%)'
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* ADDITIONAL COLORFUL LAYERS */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(45deg, rgba(255,0,64,0.4), rgba(255,64,129,0.4), rgba(156,39,176,0.4), rgba(63,81,181,0.4))',
            'linear-gradient(135deg, rgba(33,150,243,0.4), rgba(0,188,212,0.4), rgba(76,175,80,0.4), rgba(255,235,59,0.4))',
            'linear-gradient(225deg, rgba(255,193,7,0.4), rgba(255,152,0,0.4), rgba(255,87,34,0.4), rgba(233,30,99,0.4))',
            'linear-gradient(315deg, rgba(156,39,176,0.4), rgba(103,58,183,0.4), rgba(63,81,181,0.4), rgba(33,150,243,0.4))'
          ]
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* PULSATING ENERGY RINGS */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`energy-ring-${i}`}
          className="absolute rounded-full border-4"
          style={{
            left: '50%',
            top: '50%',
            width: `${100 + i * 80}px`,
            height: `${100 + i * 80}px`,
            marginLeft: `${-50 - i * 40}px`,
            marginTop: `${-50 - i * 40}px`,
            borderColor: `hsl(${i * 30}, 100%, 60%)`,
            boxShadow: `0 0 30px hsl(${i * 30}, 100%, 60%)`
          }}
          animate={{
            scale: [0.5, 2, 0.5],
            opacity: [0, 0.8, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* MULTI-LAYERED RAINBOW OVERLAYS */}
      <motion.div
        animate={{
          opacity: [0.4, 0.8, 0.4],
          background: [
            'conic-gradient(from 0deg at 50% 50%, #ff0040, #ff4081, #e91e63, #9c27b0, #673ab7, #3f51b5, #2196f3, #03a9f4, #00bcd4, #009688, #4caf50, #8bc34a, #cddc39, #ffeb3b, #ffc107, #ff9800, #ff5722, #ff0040)',
            'conic-gradient(from 90deg at 50% 50%, #ff5722, #ff9800, #ffc107, #ffeb3b, #cddc39, #8bc34a, #4caf50, #009688, #00bcd4, #03a9f4, #2196f3, #3f51b5, #673ab7, #9c27b0, #e91e63, #ff4081, #ff0040, #ff5722)',
            'conic-gradient(from 180deg at 50% 50%, #ff0040, #ff5722, #ff9800, #ffc107, #ffeb3b, #cddc39, #8bc34a, #4caf50, #009688, #00bcd4, #03a9f4, #2196f3, #3f51b5, #673ab7, #9c27b0, #e91e63, #ff4081, #ff0040)',
            'conic-gradient(from 270deg at 50% 50%, #ff4081, #e91e63, #9c27b0, #673ab7, #3f51b5, #2196f3, #03a9f4, #00bcd4, #009688, #4caf50, #8bc34a, #cddc39, #ffeb3b, #ffc107, #ff9800, #ff5722, #ff0040, #ff4081)'
          ]
        }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* KALEIDOSCOPE EFFECT */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{
          background: 'repeating-conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.1) 15deg, transparent 30deg)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* SUPER ENHANCED CRACKERS WITH MORE COLORS */}
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={`mega-cracker-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            scale: [0, 6, 0],
            rotate: [0, 720]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.02,
            repeatDelay: 0.3
          }}
        >
          {/* Multi-layered explosive rays with enhanced colors */}
          {Array.from({ length: 32 }).map((_, j) => (
            <motion.div
              key={j}
              className="absolute rounded-full origin-bottom"
              style={{
                width: `${8 + Math.random() * 6}px`,
                height: `${40 + Math.random() * 60}px`,
                backgroundColor: ['#ff0040', '#ff1493', '#ff4081', '#e91e63', '#ad1457', '#880e4f', '#9c27b0', '#7b1fa2', '#4a148c', '#673ab7', '#512da8', '#311b92', '#3f51b5', '#303f9f', '#1a237e', '#2196f3', '#1976d2', '#0d47a1', '#03a9f4', '#0288d1', '#01579b', '#00bcd4', '#0097a7', '#006064', '#009688', '#00695c', '#004d40', '#4caf50', '#388e3c', '#1b5e20', '#8bc34a', '#689f38', '#33691e', '#cddc39', '#afb42b', '#827717', '#ffeb3b', '#fbc02d', '#f57f17', '#ffc107', '#ffa000', '#ff6f00', '#ff9800', '#f57c00', '#e65100', '#ff5722', '#d84315', '#bf360c', '#ffffff', '#ffff00', '#00ffff', '#ff00ff', '#00ff00', '#ff8000', '#8000ff', '#0080ff'][j % 55],
                transform: `rotate(${j * 15}deg)`,
                boxShadow: `0 0 50px ${['#ff0040', '#ff1493', '#ff4081', '#e91e63', '#ad1457', '#880e4f', '#9c27b0', '#7b1fa2', '#4a148c', '#673ab7', '#512da8', '#311b92', '#3f51b5', '#303f9f', '#1a237e', '#2196f3', '#1976d2', '#0d47a1', '#03a9f4', '#0288d1', '#01579b', '#00bcd4', '#0097a7', '#006064', '#009688', '#00695c', '#004d40', '#4caf50', '#388e3c', '#1b5e20', '#8bc34a', '#689f38', '#33691e', '#cddc39', '#afb42b', '#827717', '#ffeb3b', '#fbc02d', '#f57f17', '#ffc107', '#ffa000', '#ff6f00', '#ff9800', '#f57c00', '#e65100', '#ff5722', '#d84315', '#bf360c', '#ffffff', '#ffff00', '#00ffff', '#ff00ff', '#00ff00', '#ff8000', '#8000ff', '#0080ff'][j % 55]}, 0 0 100px ${['#ff0040', '#ff1493', '#ff4081', '#e91e63', '#ad1457', '#880e4f', '#9c27b0', '#7b1fa2', '#4a148c', '#673ab7', '#512da8', '#311b92', '#3f51b5', '#303f9f', '#1a237e', '#2196f3', '#1976d2', '#0d47a1', '#03a9f4', '#0288d1', '#01579b', '#00bcd4', '#0097a7', '#006064', '#009688', '#00695c', '#004d40', '#4caf50', '#388e3c', '#1b5e20', '#8bc34a', '#689f38', '#33691e', '#cddc39', '#afb42b', '#827717', '#ffeb3b', '#fbc02d', '#f57f17', '#ffc107', '#ffa000', '#ff6f00', '#ff9800', '#f57c00', '#e65100', '#ff5722', '#d84315', '#bf360c', '#ffffff', '#ffff00', '#00ffff', '#ff00ff', '#00ff00', '#ff8000', '#8000ff', '#0080ff'][j % 55]}`
              }}
              animate={{
                scaleY: [0, 1.5, 0],
                scaleX: [0, 1.2, 0],
                opacity: [0, 1, 0.8, 0]
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.02 + j * 0.005,
                ease: "easeOut"
              }}
            />
          ))}
          
          {/* Center explosion burst */}
          <motion.div
            className="absolute w-8 h-8 rounded-full"
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0 0 60px #ffffff, 0 0 120px #ffff00, 0 0 180px #ff00ff'
            }}
            animate={{
              scale: [0, 8, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 0.4,
              delay: i * 0.02 + 0.1
            }}
          />
        </motion.div>
      ))}

      {/* ENHANCED RAINBOW SPIRAL CRACKERS */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`spiral-cracker-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 5}%`,
            top: `${15 + (i % 3) * 25}%`
          }}
        >
          {Array.from({ length: 36 }).map((_, j) => (
            <motion.div
              key={j}
              className="absolute w-2 h-16 rounded-full origin-bottom"
              style={{
                backgroundColor: `hsl(${j * 10}, 100%, 60%)`,
                transform: `rotate(${j * 10}deg)`,
                boxShadow: `0 0 20px hsl(${j * 10}, 100%, 60%)`
              }}
              animate={{
                scaleY: [0, 2, 0],
                rotate: [j * 10, j * 10 + 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.05 + j * 0.005,
                repeatDelay: 0.8
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* MEGA CONFETTI EXPLOSION */}
      {Array.from({ length: 1200 }).map((_, i) => {
        const shapes = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond']
        const shape = shapes[i % shapes.length]
        const colors = ['#ff0040', '#ff1493', '#ff4081', '#e91e63', '#ad1457', '#880e4f', '#9c27b0', '#7b1fa2', '#4a148c', '#673ab7', '#512da8', '#311b92', '#3f51b5', '#303f9f', '#1a237e', '#2196f3', '#1976d2', '#0d47a1', '#03a9f4', '#0288d1', '#01579b', '#00bcd4', '#0097a7', '#006064', '#009688', '#00695c', '#004d40', '#4caf50', '#388e3c', '#1b5e20', '#8bc34a', '#689f38', '#33691e', '#cddc39', '#afb42b', '#827717', '#ffeb3b', '#fbc02d', '#f57f17', '#ffc107', '#ffa000', '#ff6f00', '#ff9800', '#f57c00', '#e65100', '#ff5722', '#d84315', '#bf360c', '#ffffff', '#ffff00', '#00ffff', '#ff00ff', '#00ff00', '#ff8000', '#8000ff', '#0080ff', '#ff0080', '#80ff00', '#0040ff', '#ff4000']
        
        return (
          <motion.div
            key={`super-confetti-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 16 + 6}px`,
              height: `${Math.random() * 16 + 6}px`,
              backgroundColor: colors[i % colors.length],
              borderRadius: shape === 'circle' ? '50%' : shape === 'diamond' ? '0%' : '20%',
              clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 
                       shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' :
                       shape === 'heart' ? 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")' : 'none',
              boxShadow: `0 0 20px ${colors[i % colors.length]}`
            }}
            animate={{
              y: [-50, window.innerHeight + 150],
              rotate: [0, 1440 + Math.random() * 720],
              x: [0, (Math.random() - 0.5) * 600],
              opacity: [0, 1, 1, 0.8, 0],
              scale: [0.5, 1.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.8,
              repeat: Infinity,
              delay: Math.random() * 0.3,
              ease: "easeOut"
            }}
          />
        )
      })}

      {/* ENHANCED GLITTER EXPLOSION */}
      {Array.from({ length: 500 }).map((_, i) => (
        <motion.div
          key={`glitter-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px #ffffff, 0 0 20px #ffff00, 0 0 30px #ff00ff'
          }}
          animate={{
            scale: [0, 3, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            delay: Math.random() * 0.5,
            repeatDelay: 0.4
          }}
        />
      ))}

      {/* MEGA FLOATING CELEBRATION */}
      {Array.from({ length: 60 }).map((_, i) => {
        const celebrationEmojis = ['🎈', '🎊', '🎉', '🎆', '✨', '🌟', '💫', '⭐', '🎭', '🎪', '🎨', '🎯', '🏆', '👑', '💎', '🔥', '⚡', '🌈', '💥', '🎁', '🎀', '🎂', '🍾', '🥂', '🎵', '🎶', '🎼', '🎤', '🎸', '🥳', '🤩', '😍', '🥰', '💖', '💝', '🌺', '🌸', '🌼', '🌻']
        return (
          <motion.div
            key={`celebration-${i}`}
            className="absolute text-6xl md:text-8xl"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 20}%`
            }}
            animate={{
              y: [0, -100 - Math.random() * 100, 0],
              rotate: [0, 360, 720],
              scale: [1, 1.5, 1],
              x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200]
            }}
            transition={{
              duration: 1.2 + Math.random() * 0.8,
              repeat: Infinity,
              delay: i * 0.03,
              ease: "easeInOut"
            }}
          >
            {celebrationEmojis[i % celebrationEmojis.length]}
          </motion.div>
        )
      })}

      {/* RAINBOW WAVES */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`rainbow-wave-${i}`}
          className="absolute w-full h-32"
          style={{
            top: `${i * 12.5}%`,
            background: `linear-gradient(90deg, 
              hsl(${i * 45}, 100%, 60%) 0%, 
              hsl(${i * 45 + 60}, 100%, 60%) 25%, 
              hsl(${i * 45 + 120}, 100%, 60%) 50%, 
              hsl(${i * 45 + 180}, 100%, 60%) 75%, 
              hsl(${i * 45 + 240}, 100%, 60%) 100%)`,
            opacity: 0.3
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: 0.6 + i * 0.1,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Spectacular Fireworks */}
      {fireworks.map((firework) => (
        <motion.div
          key={firework.id}
          className="absolute text-8xl"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
          animate={{
            scale: [0, 3, 2, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0.8, 0]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: firework.delay * 0.3,
            repeatDelay: 1
          }}
        >
          {firework.emoji}
        </motion.div>
      ))}

      {/* Magical Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 20px ${particle.color}`
          }}
          animate={{
            scale: [0, 2, 1, 0],
            opacity: [0, 1, 0.7, 0],
            y: [-100, -200, -300],
            x: [0, Math.random() * 200 - 100]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: particle.delay * 0.3,
            repeatDelay: 0.8
          }}
        />
      ))}

      {/* ENHANCED SCREEN FLASH EFFECTS */}
      <motion.div
        animate={{
          opacity: [0, 0.6, 0]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 1.8
        }}
        className="absolute inset-0 bg-white pointer-events-none"
      />
      
      {/* COLORFUL FLASH BURSTS */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`flash-${i}`}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 3, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            repeatDelay: 2
          }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${['#ff0040', '#00ff40', '#4000ff', '#ff4000', '#40ff00'][i]} 0%, transparent 70%)`
          }}
        />
      ))}

      {/* ENHANCED SPARKLE SHOWER */}
      {Array.from({ length: 200 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-3 h-3"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${['#ffffff', '#ffff00', '#00ffff', '#ff00ff', '#00ff00', '#ff8000'][i % 6]} 0%, transparent 70%)`,
            borderRadius: '50%'
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 3, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: Math.random() * 1,
            repeatDelay: 1.5
          }}
        />
      ))}

      {/* NEW SPECTACULAR CRACKER BURSTS */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`burst-cracker-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <motion.div
              key={j}
              className="absolute w-4 h-20 rounded-full origin-bottom"
              style={{
                backgroundColor: `hsl(${j * 18 + i * 12}, 100%, 60%)`,
                transform: `rotate(${j * 18}deg)`,
                boxShadow: `0 0 30px hsl(${j * 18 + i * 12}, 100%, 60%)`
              }}
              animate={{
                scaleY: [0, 2.5, 0],
                opacity: [0, 1, 0],
                rotate: [j * 18, j * 18 + 180]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1 + j * 0.02,
                repeatDelay: 2
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* COLORFUL EXPLOSION RINGS */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`explosion-ring-${i}`}
          className="absolute rounded-full border-8"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '20px',
            height: '20px',
            borderColor: `hsl(${i * 18}, 100%, 60%)`,
            boxShadow: `0 0 40px hsl(${i * 18}, 100%, 60%)`
          }}
          animate={{
            scale: [0, 15, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            repeatDelay: 3
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-40 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Mega Victory Title */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.4, 1],
            opacity: 1
          }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mb-10"
        >
          <motion.h1
            animate={{ 
              textShadow: [
                '0 0 60px #ff0040, 0 0 120px #ff0040, 0 0 180px #ff0040, 0 0 240px #ffffff',
                '0 0 60px #00ff40, 0 0 120px #00ff40, 0 0 180px #00ff40, 0 0 240px #ffffff',
                '0 0 60px #4000ff, 0 0 120px #4000ff, 0 0 180px #4000ff, 0 0 240px #ffffff',
                '0 0 60px #ff4000, 0 0 120px #ff4000, 0 0 180px #ff4000, 0 0 240px #ffffff',
                '0 0 60px #ffff00, 0 0 120px #ffff00, 0 0 180px #ffff00, 0 0 240px #ffffff',
                '0 0 60px #ff00ff, 0 0 120px #ff00ff, 0 0 180px #ff00ff, 0 0 240px #ffffff',
                '0 0 60px #00ffff, 0 0 120px #00ffff, 0 0 180px #00ffff, 0 0 240px #ffffff'
              ],
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl md:text-9xl font-bold font-orbitron text-white mb-6 relative"
          >
            <motion.span
              animate={{
                color: ['#ffffff', '#ff0040', '#00ff40', '#4000ff', '#ff4000', '#ffff00', '#ff00ff', '#00ffff', '#ffffff']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎉 LEGENDARY VICTORY! 🎉
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Epic Achievement Card */}
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-2xl rounded-3xl p-12 border-4 border-white/60 max-w-4xl mx-auto mb-12 shadow-2xl"
        >
          <motion.h2 
            animate={{
              color: ['#fff', '#ff1744', '#2196f3', '#4caf50', '#ffc107', '#9c27b0', '#fff']
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-5xl md:text-6xl font-orbitron font-bold mb-8"
          >
            🚀 LEGENDARY SPACE HERO! 🚀
          </motion.h2>
          
          <motion.p 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-3xl md:text-4xl font-rajdhani text-white mb-8 font-bold"
          >
            🌍 EARTH IS SAVED! 🌍
          </motion.p>
          
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, 15, -15, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-8xl md:text-9xl mb-10 relative"
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 40px #ffd700, 0 0 80px #ff4500',
                  '0 0 40px #ff1493, 0 0 80px #00ff00',
                  '0 0 40px #00bfff, 0 0 80px #ff00ff',
                  '0 0 40px #ffff00, 0 0 80px #ff0040',
                  '0 0 40px #00ffff, 0 0 80px #8000ff'
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🏆 👑 ⭐ 🚀 🌟 💎 🎊 ⚡ 🎯 🔥 💫 ✨ 🌈 💥 🎭 🎪 🎨 🎵 🎶 🥇 🏅 💖 💝 🌺 🌸 🌼 🌻
            </motion.span>
          </motion.div>

          <motion.div 
            animate={{
              boxShadow: [
                '0 0 30px rgba(255, 215, 0, 0.6)',
                '0 0 60px rgba(255, 215, 0, 0.9)',
                '0 0 30px rgba(255, 215, 0, 0.6)'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 border-4 border-yellow-300"
          >
            <h3 className="text-3xl font-orbitron text-black font-bold mb-4">🎖️ ULTIMATE SPACE CHAMPION 🎖️</h3>
            <h4 className="text-2xl font-orbitron text-black mb-3">Team Zero 2 One</h4>
            <p className="text-xl font-rajdhani text-black font-bold mb-2">NASA Space Apps Challenge 2025</p>
            <p className="text-lg font-rajdhani text-gray-800">ISS 25th Anniversary</p>
          </motion.div>
        </motion.div>

        {/* VR Coming Soon - Ultra Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="relative"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 40px #9c27b0, 0 0 80px #9c27b0',
                '0 0 50px #2196f3, 0 0 100px #2196f3',
                '0 0 40px #4caf50, 0 0 80px #4caf50',
                '0 0 50px #ffc107, 0 0 100px #ffc107',
                '0 0 40px #ff1744, 0 0 80px #ff1744'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-2xl rounded-3xl p-10 border-4 border-purple-400/80 max-w-2xl mx-auto relative overflow-hidden"
          >
            {/* Animated VR background pattern */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-20"
              style={{
                background: 'conic-gradient(from 0deg, #9c27b0, #2196f3, #4caf50, #ffc107, #ff1744, #9c27b0)'
              }}
            />
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                🥽✨🌈
              </motion.div>
              <motion.p
                animate={{ 
                  color: ['#9c27b0', '#2196f3', '#4caf50', '#ffc107', '#ff1744', '#9c27b0']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-3xl md:text-4xl font-bold font-orbitron mb-4"
              >
                VR EXPERIENCE
              </motion.p>
              <motion.p
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-white font-rajdhani text-2xl font-bold mb-3"
              >
                Coming Soon!
              </motion.p>
              <p className="text-white/90 font-rajdhani text-xl">
                Next-Level Space Adventure Awaits
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* AI Message */}
      {showAI && (
        <AIChat
          message="🎉 ABSOLUTELY INCREDIBLE! You are now officially the GREATEST SPACE HERO in history! 🎉 The entire universe is celebrating your legendary victory! You've not only saved Earth but secured the future of all humanity! This is the most spectacular achievement ever recorded! 🚀🌟🏆👑"
          onComplete={() => setShowAI(false)}
        />
      )}
    </div>
  )
}

export default CelebrationScreen