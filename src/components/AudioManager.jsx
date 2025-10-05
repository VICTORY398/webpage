import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AudioManager = ({ gameState, onRobotClick, onPowerUp, onSuccess, onFail }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [musicVolume, setMusicVolume] = useState(0.3)
  const [sfxVolume, setSfxVolume] = useState(0.5)
  
  const backgroundMusicRef = useRef(null)
  const gameMusicRef = useRef(null)
  const successMusicRef = useRef(null)

  // Initialize audio elements
  useEffect(() => {
    // Background ambient music
    backgroundMusicRef.current = new Audio()
    backgroundMusicRef.current.loop = true
    backgroundMusicRef.current.volume = musicVolume
    
    // Game music
    gameMusicRef.current = new Audio()
    gameMusicRef.current.loop = true
    gameMusicRef.current.volume = musicVolume
    
    // Success celebration music
    successMusicRef.current = new Audio()
    successMusicRef.current.volume = musicVolume
    
    return () => {
      if (backgroundMusicRef.current) backgroundMusicRef.current.pause()
      if (gameMusicRef.current) gameMusicRef.current.pause()
      if (successMusicRef.current) successMusicRef.current.pause()
    }
  }, [])

  // Handle game state music changes
  useEffect(() => {
    if (isMuted) return

    switch (gameState) {
      case 'ready':
        playBackgroundMusic()
        break
      case 'playing':
        playGameMusic()
        break
      case 'success':
        playSuccessMusic()
        break
      case 'failed':
        stopAllMusic()
        playFailSound()
        break
      default:
        playBackgroundMusic()
    }
  }, [gameState, isMuted])

  // Update volume when changed
  useEffect(() => {
    if (backgroundMusicRef.current) backgroundMusicRef.current.volume = isMuted ? 0 : musicVolume
    if (gameMusicRef.current) gameMusicRef.current.volume = isMuted ? 0 : musicVolume
    if (successMusicRef.current) successMusicRef.current.volume = isMuted ? 0 : musicVolume
  }, [musicVolume, isMuted])

  const playBackgroundMusic = () => {
    stopAllMusic()
    if (backgroundMusicRef.current && !isMuted) {
      // Use Web Audio API to generate ambient space sounds
      createAmbientSound()
    }
  }

  const playGameMusic = () => {
    stopAllMusic()
    if (gameMusicRef.current && !isMuted) {
      // Use Web Audio API to generate intense game music
      createGameMusic()
    }
  }

  const playSuccessMusic = () => {
    stopAllMusic()
    if (successMusicRef.current && !isMuted) {
      // Use Web Audio API to generate celebration music
      createCelebrationMusic()
    }
  }

  const stopAllMusic = () => {
    if (backgroundMusicRef.current) backgroundMusicRef.current.pause()
    if (gameMusicRef.current) gameMusicRef.current.pause()
    if (successMusicRef.current) successMusicRef.current.pause()
  }

  // Web Audio API sound generation
  const createAmbientSound = () => {
    if (isMuted) return
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Create ambient space drone
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(80, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 10)
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(musicVolume * 0.1, audioContext.currentTime + 2)
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.start()
    setTimeout(() => oscillator.stop(), 30000)
  }

  const createGameMusic = () => {
    if (isMuted) return
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Create intense game beat
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(musicVolume * 0.2, audioContext.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.5)
    
    // Repeat every 0.6 seconds
    setTimeout(() => {
      if (gameState === 'playing') createGameMusic()
    }, 600)
  }

  const createCelebrationMusic = () => {
    if (isMuted) return
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Create celebration chord progression
    const frequencies = [261.63, 329.63, 392.00, 523.25] // C major chord
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(musicVolume * 0.15, audioContext.currentTime + 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.start(audioContext.currentTime + index * 0.1)
      oscillator.stop(audioContext.currentTime + 2)
    })
  }

  // Sound effects
  const playClickSound = () => {
    if (isMuted) return
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(sfxVolume * 0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const playPowerUpSound = () => {
    if (isMuted) return
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3)
    
    gainNode.gain.setValueAtTime(sfxVolume * 0.4, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  const playFailSound = () => {
    if (isMuted) return
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 1)
    
    gainNode.gain.setValueAtTime(sfxVolume * 0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 1)
  }

  // Trigger sound effects
  useEffect(() => {
    if (onRobotClick) playClickSound()
  }, [onRobotClick])

  useEffect(() => {
    if (onPowerUp) playPowerUpSound()
  }, [onPowerUp])

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 left-4 z-50 bg-black bg-opacity-80 backdrop-blur-sm rounded-lg p-3 border border-neon-blue border-opacity-50"
    >
      <div className="flex items-center gap-3">
        {/* Mute Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMuted(!isMuted)}
          className={`p-2 rounded-full transition-all duration-300 ${
            isMuted 
              ? 'bg-red-500 text-white' 
              : 'bg-neon-blue text-black'
          }`}
        >
          {isMuted ? '🔇' : '🔊'}
        </motion.button>

        {/* Volume Controls */}
        {!isMuted && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white font-rajdhani">Music</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white font-rajdhani">SFX</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={sfxVolume}
                onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Audio Visualizer */}
        {!isMuted && gameState === 'playing' && (
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scaleY: [0.3, 1, 0.3],
                  backgroundColor: ['#00f5ff', '#bf00ff', '#00f5ff']
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                className="w-1 h-4 bg-neon-blue rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AudioManager