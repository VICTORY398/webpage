import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useAudio } from '../components/SimpleAudioManager'

const FinalGame = () => {
  const [gameState, setGameState] = useState('ready') // ready, playing, success, failed
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [robots, setRobots] = useState([])
  const [explosions, setExplosions] = useState([])
  const [powerUps, setPowerUps] = useState([])
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [timeBonus, setTimeBonus] = useState(false)
  const [doublePoints, setDoublePoints] = useState(false)
  const [showCredits, setShowCredits] = useState(false)
  const [audioTrigger, setAudioTrigger] = useState({ robotClick: 0, powerUp: 0 })
  const gameAreaRef = useRef(null)
  const comboTimeoutRef = useRef(null)
  const { stopAllMusic, playPageMusic } = useAudio()
  const alarmIntervalRef = useRef(null)

  // Generate fun robot targets with special types
  const generateRobot = () => {
    const rand = Math.random()
    let robotType, color, emoji, points, size, speed
    
    if (rand > 0.98) {
      // Ultra Rare Boss (2%)
      robotType = 'boss'
      color = '#ff0000'
      emoji = '👿'
      points = 15
      size = 60
      speed = 1.5
    } else if (rand > 0.90) {
      // Rare Golden (8%)
      robotType = 'golden'
      color = '#ffd700'
      emoji = '🎆'
      points = 8
      size = 55
      speed = 2.5
    } else if (rand > 0.60) {
      // Fast Runner (30%)
      robotType = 'fast'
      color = '#00ff99'
      emoji = '⚡'
      points = 3
      size = 45
      speed = 3
    } else {
      // Normal Robot (60%)
      robotType = 'normal'
      const colors = ['#ff0066', '#00f5ff', '#bf00ff', '#ff6600']
      const emojis = ['🤖', '👾', '🛸', '💀']
      color = colors[Math.floor(Math.random() * colors.length)]
      emoji = emojis[Math.floor(Math.random() * emojis.length)]
      points = 1
      size = 50 + Math.random() * 15
      speed = 2 + Math.random() * 2
    }
    
    return {
      id: Math.random(),
      x: Math.random() * 85 + 7.5,
      y: Math.random() * 75 + 12.5,
      size,
      color,
      emoji,
      points,
      speed,
      type: robotType,
      createdAt: Date.now(),
      lifespan: 4000 + Math.random() * 2000 // Robots disappear after 4-6 seconds
    }
  }

  // Generate power-ups
  const generatePowerUp = () => {
    const powerUpTypes = [
      { type: 'timeBonus', emoji: '⏰', color: '#00f5ff', effect: 'Time +5s' },
      { type: 'doublePoints', emoji: '✨', color: '#ffd700', effect: '2x Points' },
      { type: 'slowTime', emoji: '🕰️', color: '#bf00ff', effect: 'Slow Motion' }
    ]
    
    const powerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
    
    return {
      id: Math.random(),
      x: Math.random() * 85 + 7.5,
      y: Math.random() * 75 + 12.5,
      size: 45,
      ...powerUp,
      createdAt: Date.now()
    }
  }

  // Start game
  const startGame = () => {
    setGameState('playing')
    setTimeLeft(20)
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    setTimeBonus(false)
    setDoublePoints(false)
    setRobots([generateRobot(), generateRobot(), generateRobot()])
    setExplosions([])
    setPowerUps([])
    startAlarmSound()
  }

  // Handle robot click with combo system
  const destroyRobot = (robotId, points, robotType) => {
    const robot = robots.find(r => r.id === robotId)
    if (robot) {
      // Create explosion effect
      setExplosions(prev => [...prev, {
        id: Math.random(),
        x: robot.x,
        y: robot.y,
        points: points,
        type: robotType,
        time: Date.now()
      }])
      
      // Update combo
      setCombo(prev => {
        const newCombo = prev + 1
        setMaxCombo(current => Math.max(current, newCombo))
        return newCombo
      })
      
      // Reset combo timeout
      if (comboTimeoutRef.current) {
        clearTimeout(comboTimeoutRef.current)
      }
      comboTimeoutRef.current = setTimeout(() => {
        setCombo(0)
      }, 2000)
      
      // Calculate final points with multipliers
      let finalPoints = points
      if (doublePoints) finalPoints *= 2
      if (combo >= 5) finalPoints *= 1.5 // Combo bonus
      if (combo >= 10) finalPoints *= 2 // Super combo bonus
      
      // Trigger sound effect
      setAudioTrigger(prev => ({ ...prev, robotClick: prev.robotClick + 1 }))
      
      // Remove robot and add score
      setRobots(prev => prev.filter(r => r.id !== robotId))
      setScore(prev => {
        const newScore = prev + Math.floor(finalPoints)
        // Check if target reached - complete immediately
        if (newScore >= 20) {
          setTimeout(() => {
            setGameState('success')
            stopAlarmSound()
            startCelebrationMusic()
            setTimeout(() => setShowCredits(true), 1500)
          }, 100)
        }
        return newScore
      })
    }
  }

  // Handle power-up collection
  const collectPowerUp = (powerUpId, type) => {
    // Trigger sound effect
    setAudioTrigger(prev => ({ ...prev, powerUp: prev.powerUp + 1 }))
    
    setPowerUps(prev => prev.filter(p => p.id !== powerUpId))
    
    switch (type) {
      case 'timeBonus':
        setTimeLeft(prev => prev + 5)
        break
      case 'doublePoints':
        setDoublePoints(true)
        setTimeout(() => setDoublePoints(false), 8000)
        break
      case 'slowTime':
        // Slow down all robots temporarily
        setRobots(prev => prev.map(robot => ({ ...robot, speed: robot.speed * 0.3 })))
        setTimeout(() => {
          setRobots(prev => prev.map(robot => ({ ...robot, speed: robot.speed / 0.3 })))
        }, 5000)
        break
    }
  }

  // Generate new robots and power-ups periodically
  useEffect(() => {
    let robotTimer, powerUpTimer
    if (gameState === 'playing') {
      robotTimer = setInterval(() => {
        setRobots(prev => {
          // Remove expired robots
          const currentTime = Date.now()
          const activeRobots = prev.filter(robot => currentTime - robot.createdAt < robot.lifespan)
          
          // Add new robots more frequently
          if (activeRobots.length < 10) {
            activeRobots.push(generateRobot())
          }
          return activeRobots
        })
      }, 600)
      
      powerUpTimer = setInterval(() => {
        if (Math.random() < 0.15 && powerUps.length < 1) {
          setPowerUps(prev => [...prev, generatePowerUp()])
        }
      }, 5000)
    }
    return () => {
      clearInterval(robotTimer)
      clearInterval(powerUpTimer)
    }
  }, [gameState, powerUps.length])

  // Game timer
  useEffect(() => {
    let timer
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (gameState === 'playing' && timeLeft === 0) {
      stopAlarmSound()
      if (score >= 20) {
        setGameState('success')
        startCelebrationMusic()
        setTimeout(() => setShowCredits(true), 2000)
      } else {
        setGameState('failed')
      }
    }
    return () => clearTimeout(timer)
  }, [gameState, timeLeft, score])

  // Remove old explosions and power-ups
  useEffect(() => {
    const cleanupTimer = setInterval(() => {
      setExplosions(prev => prev.filter(exp => Date.now() - exp.time < 1000))
      setPowerUps(prev => prev.filter(powerUp => Date.now() - powerUp.createdAt < 5000))
    }, 100)
    return () => clearInterval(cleanupTimer)
  }, [])

  // Cinematic space mission alarm (faster)
  const startAlarmSound = () => {
    if (alarmIntervalRef.current) return
    
    const playAlarm = () => {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        
        // Dramatic orchestral alarm sweep (faster)
        const orchestral = ctx.createOscillator()
        const orchestralGain = ctx.createGain()
        orchestral.type = 'sawtooth'
        orchestral.frequency.setValueAtTime(440, ctx.currentTime)
        orchestral.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.8)
        orchestral.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.6)
        orchestralGain.gain.setValueAtTime(0, ctx.currentTime)
        orchestralGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.2)
        orchestralGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1.4)
        orchestralGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.6)
        orchestral.connect(orchestralGain)
        orchestralGain.connect(ctx.destination)
        orchestral.start()
        orchestral.stop(ctx.currentTime + 1.6)
        
        // Space mission warning tones (faster)
        const warningTones = [880, 1100, 1320, 1760]
        warningTones.forEach((freq, i) => {
          const warning = ctx.createOscillator()
          const warningGain = ctx.createGain()
          warning.type = 'triangle'
          warning.frequency.value = freq
          warningGain.gain.setValueAtTime(0.2, ctx.currentTime + 0.3 + i * 0.2)
          warningGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5 + i * 0.2)
          warning.connect(warningGain)
          warningGain.connect(ctx.destination)
          warning.start(ctx.currentTime + 0.3 + i * 0.2)
          warning.stop(ctx.currentTime + 0.5 + i * 0.2)
        })
        
        // Deep space rumble (faster)
        const rumble = ctx.createOscillator()
        const rumbleGain = ctx.createGain()
        rumble.type = 'triangle'
        rumble.frequency.setValueAtTime(80, ctx.currentTime)
        rumble.frequency.linearRampToValueAtTime(120, ctx.currentTime + 1.6)
        rumbleGain.gain.setValueAtTime(0.15, ctx.currentTime)
        rumbleGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.6)
        rumble.connect(rumbleGain)
        rumbleGain.connect(ctx.destination)
        rumble.start()
        rumble.stop(ctx.currentTime + 1.6)
        
      } catch (e) {}
    }
    
    playAlarm()
    alarmIntervalRef.current = setInterval(playAlarm, 1800)
  }

  const stopAlarmSound = () => {
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current)
      alarmIntervalRef.current = null
    }
  }

  const startCelebrationMusic = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      
      // Thriller background music (continuous)
      const thrillerBass = ctx.createOscillator()
      const thrillerGain = ctx.createGain()
      thrillerBass.type = 'triangle'
      thrillerBass.frequency.setValueAtTime(110, ctx.currentTime)
      thrillerBass.frequency.linearRampToValueAtTime(220, ctx.currentTime + 4)
      thrillerBass.frequency.linearRampToValueAtTime(110, ctx.currentTime + 8)
      thrillerGain.gain.setValueAtTime(0.15, ctx.currentTime)
      thrillerGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 2)
      thrillerGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 8)
      thrillerBass.connect(thrillerGain)
      thrillerGain.connect(ctx.destination)
      thrillerBass.start()
      thrillerBass.stop(ctx.currentTime + 8)
      
      // Thriller melody
      const thrillerMelody = [440, 523, 659, 784, 659, 523, 440, 523]
      thrillerMelody.forEach((freq, i) => {
        const melody = ctx.createOscillator()
        const melodyGain = ctx.createGain()
        melody.type = 'sawtooth'
        melody.frequency.value = freq
        melodyGain.gain.setValueAtTime(0.12, ctx.currentTime + 1 + i * 0.8)
        melodyGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.6 + i * 0.8)
        melody.connect(melodyGain)
        melodyGain.connect(ctx.destination)
        melody.start(ctx.currentTime + 1 + i * 0.8)
        melody.stop(ctx.currentTime + 1.6 + i * 0.8)
      })
      
      // Multiple simultaneous crackers blasters
      for (let i = 0; i < 15; i++) {
        const delay = Math.random() * 6
        
        // Cracker explosion
        const cracker = ctx.createOscillator()
        const crackerGain = ctx.createGain()
        cracker.type = 'square'
        cracker.frequency.setValueAtTime(1500 + Math.random() * 1000, ctx.currentTime + delay)
        cracker.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + delay + 0.2)
        crackerGain.gain.setValueAtTime(0.3, ctx.currentTime + delay)
        crackerGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.2)
        cracker.connect(crackerGain)
        crackerGain.connect(ctx.destination)
        cracker.start(ctx.currentTime + delay)
        cracker.stop(ctx.currentTime + delay + 0.2)
        
        // Explosion burst
        setTimeout(() => {
          const bufferSize = ctx.sampleRate * 0.3
          const explosionBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
          const output = explosionBuffer.getChannelData(0)
          for (let j = 0; j < bufferSize; j++) {
            output[j] = (Math.random() * 2 - 1) * (1 - j / bufferSize) * 0.4
          }
          const explosion = ctx.createBufferSource()
          const explosionGain = ctx.createGain()
          explosion.buffer = explosionBuffer
          explosionGain.gain.setValueAtTime(0.3, ctx.currentTime)
          explosionGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
          explosion.connect(explosionGain)
          explosionGain.connect(ctx.destination)
          explosion.start()
        }, delay * 1000)
      }
      
      // Crowd celebration
      const bufferSize = ctx.sampleRate * 4
      const crowdBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = crowdBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.2
      }
      const crowd = ctx.createBufferSource()
      const crowdGain = ctx.createGain()
      crowd.buffer = crowdBuffer
      crowdGain.gain.setValueAtTime(0.2, ctx.currentTime + 1)
      crowdGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 5)
      crowd.connect(crowdGain)
      crowdGain.connect(ctx.destination)
      crowd.start(ctx.currentTime + 1)
      
    } catch (e) {}
    
    // Continue background celebration music
    setTimeout(() => {
      playPageMusic('celebration')
    }, 8000)
  }

  if (showCredits) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 flex items-center justify-center relative overflow-hidden"
      >
        <div className="stars-bg fixed inset-0 opacity-40"></div>
        
        {/* SUBTLE ANIMATED BACKGROUND */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)',
              'radial-gradient(circle at 70% 60%, rgba(6, 182, 212, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)',
              'radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.15) 0%, rgba(34, 197, 94, 0.1) 50%, transparent 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Cracker Effects */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`cracker-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1.5, 0],
              rotate: [0, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          >
            <div className={`w-3 h-3 rounded-full ${
              ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-pink-400', 'bg-orange-400'][Math.floor(Math.random() * 6)]
            }`} />
          </motion.div>
        ))}
        
        {/* Firework Bursts */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`firework-${i}`}
            className="absolute"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`
            }}
          >
            {Array.from({ length: 8 }).map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-1 h-6 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-full"
                style={{
                  transformOrigin: 'bottom center',
                  rotate: `${j * 45}deg`
                }}
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.3 + j * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        ))}
        
        {/* GENTLE FLOATING PARTICLES */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#22c55e', '#06b6d4', '#a855f7'][i % 3],
              opacity: 0.6
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, (Math.random() - 0.5) * 30, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center z-10 max-w-4xl mx-4"
        >
          <motion.h1
            animate={{ 
              textShadow: [
                "0 0 20px #00ff99",
                "0 0 40px #00ff99, 0 0 60px #00f5ff",
                "0 0 20px #00ff99"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl md:text-5xl font-orbitron font-bold mb-8"
            style={{
              background: 'linear-gradient(45deg, #00ff99, #00f5ff, #ffff00, #ff00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            MISSION ACCOMPLISHED
          </motion.h1>

          <div className="bg-space-grey bg-opacity-90 backdrop-blur-md rounded-2xl p-8 mb-8 border border-green-400 border-opacity-50">
            <h2 className="text-3xl font-orbitron text-green-400 mb-6">
              Mission Accomplished
            </h2>
            <p className="text-lg font-rajdhani text-gray-300 mb-6 leading-relaxed">
              Congratulations, astronaut! You have successfully neutralized the rogue AI threat 
              and saved Earth's communication systems. Your quick reflexes and determination 
              have secured humanity's future in space exploration.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-xl font-orbitron text-neon-blue mb-3">
                  Mission Stats
                </h3>
                <ul className="space-y-2 font-rajdhani text-gray-300">
                  <li className="flex justify-between">
                    <span>Final Score:</span>
                    <span className="text-green-400 font-bold">{score} points</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Max Combo:</span>
                    <span className="text-purple-400 font-bold">x{maxCombo}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Time Remaining:</span>
                    <span className="text-blue-400">{timeLeft}s</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Performance:</span>
                    <span className={`font-bold ${
                      score >= 40 ? 'text-yellow-400' :
                      score >= 35 ? 'text-green-400' : 'text-green-400'
                    }`}>
                      {score >= 40 ? 'LEGENDARY HERO!' :
                       score >= 35 ? 'SPACE ACE!' : 'MISSION SUCCESS!'}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-orbitron text-neon-purple mb-3">
                  Earth Benefits Secured
                </h3>
                <ul className="space-y-2 font-rajdhani text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Communication Networks
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    ISS Research Continues
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
                    Space Exploration Safe
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center"
          >
            <h3 className="text-2xl font-orbitron text-neon-blue mb-4">
              Created by
            </h3>
            <motion.p
              animate={{
                color: ['#ffffff', '#22c55e', '#06b6d4', '#ffffff']
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="text-xl font-rajdhani font-bold mb-2"
            >
              Team Zero 2 One
            </motion.p>
            <p className="text-lg font-rajdhani text-gray-400 mb-6">
              NASA Space Apps Challenge 2025
            </p>
            <p className="text-sm font-rajdhani text-gray-500">
              International Space Station 25th Anniversary
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  if (gameState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-900 via-space-black to-green-900 flex items-center justify-center relative overflow-hidden"
      >
        <div className="stars-bg fixed inset-0 opacity-30"></div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-8xl mb-8"
          >
            🌍
          </motion.div>
          
          <h1 className="text-5xl font-orbitron font-bold text-green-400 mb-6">
            MISSION SUCCESS!
          </h1>
          
          <p className="text-xl font-rajdhani text-green-300 mb-6">
            Earth is Safe!
          </p>
          
          <div className="bg-green-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <p className="font-rajdhani text-green-300">
              Rogue AI Station Neutralized!
              <br />
              Preparing victory celebration...
            </p>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (gameState === 'failed') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-red-900 via-space-black to-red-900 flex items-center justify-center relative overflow-hidden"
      >
        <div className="stars-bg fixed inset-0 opacity-20"></div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-8xl mb-8"
          >
            💥
          </motion.div>
          
          <h1 className="text-6xl font-orbitron font-bold text-red-400 mb-4">
            CHALLENGE FAILED!
          </h1>
          
          <p className="text-2xl font-rajdhani text-white mb-8">
            The rogue AI escaped...
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-orbitron font-bold uppercase tracking-wider rounded-lg transition-all duration-300 border-2 border-red-400"
          >
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-red-900 via-space-black to-red-900 flex items-center justify-center relative overflow-hidden"
      >
      <div className="stars-bg fixed inset-0 opacity-20"></div>
      
      {/* Danger Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 bg-red-500 opacity-10"
        />
      </div>

      <div className="text-center z-10 max-w-4xl mx-4">
        <motion.h1
          animate={{ 
            textShadow: [
              "0 0 10px #ff0000",
              "0 0 20px #ff0000, 0 0 30px #ff4444",
              "0 0 10px #ff0000"
            ]
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-5xl md:text-7xl font-orbitron font-bold text-red-400 mb-8"
        >
          FINAL CHALLENGE
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-rajdhani text-white mb-8"
        >
          Stop the Rogue AI Space Station!
        </motion.p>

        {gameState === 'ready' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-space-grey bg-opacity-90 backdrop-blur-md rounded-2xl p-8 border border-red-500 border-opacity-50 mb-8"
          >
            <h3 className="text-2xl font-orbitron text-red-400 mb-6">
              Mission Briefing
            </h3>
            
            <div className="text-left font-rajdhani text-gray-300 mb-6 space-y-3">
              <p>🎯 <strong>Mission:</strong> Score 20+ points to save the world!</p>
              <p>💆 <strong>How to Play:</strong> Click tiny, super-fast robots!</p>
              <p>✨ <strong>Special Robots:</strong> Golden (8pts), Boss (15pts), Fast (3pts)</p>
              <p>🔥 <strong>Combo System:</strong> Chain clicks for bonus multipliers!</p>
              <p>⚠️ <strong>Warning:</strong> Robots vanish in 2-3 seconds!</p>
              <p>✅ <strong>Auto-Win:</strong> Game ends instantly when you reach 30 points!</p>
            </div>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 0, 102, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-orbitron font-bold uppercase tracking-wider rounded-lg transition-all duration-300 border-2 border-red-400"
            >
              🚀 START MISSION
            </motion.button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-space-black bg-opacity-80 backdrop-blur-md rounded-2xl p-4 border border-red-500 border-opacity-50"
          >
            {/* Game HUD */}
            <div className="flex justify-between items-center mb-4 text-white font-orbitron">
              <div className="text-xl">
                Score: <span className="text-green-400">{score}/20</span>
              </div>
              <div className="text-xl">
                Time: <span className={`${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-neon-blue'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            {/* Game Area */}
            <div 
              ref={gameAreaRef}
              className="relative w-full h-96 bg-gradient-to-br from-space-black via-blue-900 to-purple-900 rounded-lg border-2 border-neon-blue border-opacity-50 overflow-hidden cursor-crosshair"
            >
              {/* Fun Background Effects */}
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                  />
                ))}
              </div>

              {/* Enhanced Robots */}
              {robots.map(robot => (
                <motion.div
                  key={robot.id}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: robot.type === 'boss' ? [0, 1.3, 1.1] : [0, 1.2, 1],
                    rotate: [0, 360],
                    x: [robot.x + '%', (robot.x + (robot.type === 'fast' ? 20 : 10)) + '%', robot.x + '%'],
                    y: [robot.y + '%', (robot.y + 5) + '%', robot.y + '%']
                  }}
                  transition={{
                    scale: { duration: 0.5 },
                    rotate: { duration: robot.speed, repeat: Infinity, ease: "linear" },
                    x: { duration: robot.speed, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: robot.speed * 1.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ 
                    scale: robot.type === 'boss' ? 1.4 : 1.3,
                    rotate: 0,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ 
                    scale: 0.7,
                    transition: { duration: 0.1 }
                  }}
                  onClick={() => destroyRobot(robot.id, robot.points, robot.type)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  style={{
                    left: robot.x + '%',
                    top: robot.y + '%'
                  }}
                >
                  <div 
                    className={`rounded-full border-4 flex items-center justify-center text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-200 ${
                      robot.type === 'boss' ? 'border-red-300 animate-pulse' :
                      robot.type === 'golden' ? 'border-yellow-300' :
                      robot.type === 'fast' ? 'border-green-300' : 'border-white'
                    }`}
                    style={{
                      width: robot.size,
                      height: robot.size,
                      backgroundColor: robot.color,
                      boxShadow: `0 0 ${robot.type === 'boss' ? '40px' : '30px'} ${robot.color}`,
                      fontSize: robot.size * 0.4
                    }}
                  >
                    {robot.emoji}
                  </div>
                  
                  {/* Enhanced Points Indicator */}
                  <motion.div
                    animate={{ 
                      scale: robot.type === 'boss' ? [1, 1.4, 1] : [1, 1.2, 1],
                      rotate: robot.type === 'golden' ? [0, 360] : 0
                    }}
                    transition={{ 
                      duration: robot.type === 'boss' ? 0.3 : 0.5, 
                      repeat: Infinity,
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                    }}
                    className={`absolute -top-3 -right-3 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold border-2 border-white ${
                      robot.type === 'boss' ? 'bg-red-500 text-white' :
                      robot.type === 'golden' ? 'bg-yellow-400 text-black' :
                      robot.type === 'fast' ? 'bg-green-400 text-black' :
                      'bg-blue-400 text-white'
                    }`}
                  >
                    +{robot.points}
                  </motion.div>
                  
                  {/* Special Effects for Boss */}
                  {robot.type === 'boss' && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-4 border-red-400 pointer-events-none"
                    />
                  )}
                </motion.div>
              ))}

              {/* Power-ups */}
              {powerUps.map(powerUp => (
                <motion.div
                  key={powerUp.id}
                  initial={{ scale: 0, y: -20 }}
                  animate={{ 
                    scale: [0, 1.3, 1],
                    y: [0, -10, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    scale: { duration: 0.6 },
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" }
                  }}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => collectPowerUp(powerUp.id, powerUp.type)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                  style={{
                    left: powerUp.x + '%',
                    top: powerUp.y + '%'
                  }}
                >
                  <div 
                    className="rounded-full border-4 border-white flex items-center justify-center text-white font-bold shadow-2xl"
                    style={{
                      width: powerUp.size,
                      height: powerUp.size,
                      backgroundColor: powerUp.color,
                      boxShadow: `0 0 40px ${powerUp.color}`,
                      fontSize: powerUp.size * 0.5
                    }}
                  >
                    {powerUp.emoji}
                  </div>
                  
                  {/* Power-up Label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 rounded px-2 py-1 text-xs text-white font-bold whitespace-nowrap">
                    {powerUp.effect}
                  </div>
                </motion.div>
              ))}

              {/* Enhanced Explosions */}
              {explosions.map(explosion => (
                <motion.div
                  key={explosion.id}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ 
                    scale: explosion.type === 'boss' ? [0, 3, 4] : [0, 2, 3],
                    opacity: [1, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: explosion.type === 'boss' ? 1.2 : 0.8 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                  style={{
                    left: `${explosion.x}%`,
                    top: `${explosion.y}%`
                  }}
                >
                  <div className={`${
                    explosion.type === 'boss' ? 'text-8xl' :
                    explosion.type === 'golden' ? 'text-7xl' : 'text-6xl'
                  }`}>
                    {explosion.type === 'boss' ? '💥' :
                     explosion.type === 'golden' ? '✨' : '🎆'}
                  </div>
                  
                  {/* Points Pop-up */}
                  <motion.div
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -50, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-yellow-400"
                  >
                    +{explosion.points}
                  </motion.div>
                </motion.div>
              ))}

              {/* Enhanced HUD */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-80 rounded-lg p-3 border-2 border-neon-blue space-y-2">
                <div className="text-neon-blue font-orbitron font-bold text-xl">
                  Score: {score}
                </div>
                <div className="text-white font-rajdhani text-sm">
                  Target: 30 points
                </div>
                
                {/* Combo Display */}
                {combo > 0 && (
                  <motion.div
                    animate={{ scale: combo >= 10 ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.3, repeat: combo >= 10 ? Infinity : 0 }}
                    className={`font-orbitron font-bold ${
                      combo >= 10 ? 'text-red-400' :
                      combo >= 5 ? 'text-yellow-400' : 'text-green-400'
                    }`}
                  >
                    COMBO x{combo}
                    {combo >= 5 && <div className="text-xs">+50% Bonus!</div>}
                    {combo >= 10 && <div className="text-xs">+100% SUPER BONUS!</div>}
                  </motion.div>
                )}
                
                {/* Max Combo */}
                {maxCombo > 0 && (
                  <div className="text-purple-400 font-rajdhani text-xs">
                    Best Combo: {maxCombo}
                  </div>
                )}
              </div>

              {/* Enhanced Time Display */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-80 rounded-lg p-3 border-2 border-red-400 space-y-2">
                <div className={`font-orbitron font-bold text-xl ${
                  timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'
                }`}>
                  Time: {timeLeft}s
                </div>
                
                {/* Active Power-ups */}
                <div className="space-y-1">
                  {doublePoints && (
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-yellow-400 font-rajdhani text-xs font-bold"
                    >
                      ✨ 2X POINTS ACTIVE
                    </motion.div>
                  )}
                  {timeBonus && (
                    <div className="text-blue-400 font-rajdhani text-xs font-bold">
                      ⏰ TIME BONUS
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-gray-800 rounded-full h-5 overflow-hidden border-2 border-gray-600">
                  <motion.div
                    className={`h-full transition-all duration-300 ${
                      score >= 15 ? 'bg-gradient-to-r from-green-400 via-yellow-400 to-green-400' :
                      score >= 10 ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400' :
                      'bg-gradient-to-r from-red-400 via-neon-blue to-purple-500'
                    }`}
                    animate={{ 
                      width: `${Math.min((score / 20) * 100, 100)}%`,
                      boxShadow: score >= 30 ? ['0 0 10px #22c55e', '0 0 20px #22c55e', '0 0 10px #22c55e'] : 'none'
                    }}
                    transition={{ 
                      duration: 0.3,
                      boxShadow: { duration: 0.5, repeat: score >= 30 ? Infinity : 0 }
                    }}
                  />
                </div>
                <div className="text-center text-sm text-white mt-2 font-orbitron">
                  🎯 MISSION PROGRESS: {score}/20 POINTS 🎯
                </div>
              </div>

              {/* Dynamic Instructions */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white font-rajdhani text-lg bg-black bg-opacity-60 rounded-lg px-4 py-2 border border-neon-blue"
                >
                  {score >= 15 ? '🎯 ALMOST THERE! 5 MORE POINTS! 🎯' :
                   combo >= 5 ? '🔥 COMBO STREAK! KEEP GOING! 🔥' :
                   powerUps.length > 0 ? '✨ Collect power-ups for bonuses! ✨' :
                   '💆 Click tiny robots fast! 💆'}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-center"
        >
          <p className="text-sm font-rajdhani text-gray-500">
            Created by Team Zero 2 One
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FinalGame