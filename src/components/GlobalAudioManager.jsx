import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { motion } from 'framer-motion'

const AudioContext = createContext()

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [sfxMuted, setSfxMuted] = useState(false)
  const [musicVolume, setMusicVolume] = useState(0.4)
  const [sfxVolume, setSfxVolume] = useState(0.6)
  const [currentPage, setCurrentPage] = useState('intro')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  const audioContextRef = useRef(null)
  const currentMusicRef = useRef(null)

  // Initialize Web Audio Context and video detection
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    
    // Video detection
    const checkVideos = () => {
      const videos = document.querySelectorAll('video')
      let anyVideoPlaying = false
      
      videos.forEach(video => {
        if (!video.paused && !video.ended) {
          anyVideoPlaying = true
        }
      })
      
      setIsVideoPlaying(anyVideoPlaying)
    }
    
    const interval = setInterval(checkVideos, 500)
    
    return () => {
      clearInterval(interval)
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Space-themed background music for each page
  const playPageMusic = (page) => {
    if (isMuted || !audioContextRef.current || isVideoPlaying) return
    
    stopCurrentMusic()
    setCurrentPage(page)
    
    switch (page) {
      case 'intro':
        playIntroMusic()
        break
      case 'mission-brief':
        playMissionMusic()
        break
      case 'ai-intro':
        playTrainingMusic()
        break
      case 'quiz':
        playQuizMusic()
        break
      case 'rocket-launch':
        playLaunchMusic()
        break
      case 'cupola-view':
        playCupolaMusic()
        break
      case 'final-game':
        playGameMusic()
        break
      case 'celebration':
        playCelebrationMusic()
        break
      default:
        playAmbientMusic()
    }
  }

  const stopCurrentMusic = () => {
    if (currentMusicRef.current) {
      currentMusicRef.current.stop()
      currentMusicRef.current = null
    }
  }

  // Page-specific music generators
  const playIntroMusic = () => {
    const ctx = audioContextRef.current
    
    // Cinematic intro with multiple layers
    const bass = ctx.createOscillator()
    const mid = ctx.createOscillator()
    const high = ctx.createOscillator()
    const bassGain = ctx.createGain()
    const midGain = ctx.createGain()
    const highGain = ctx.createGain()
    
    bass.type = 'sine'
    mid.type = 'triangle'
    high.type = 'sine'
    
    bass.frequency.setValueAtTime(55, ctx.currentTime)
    mid.frequency.setValueAtTime(220, ctx.currentTime)
    high.frequency.setValueAtTime(880, ctx.currentTime)
    
    bassGain.gain.setValueAtTime(0, ctx.currentTime)
    bassGain.gain.linearRampToValueAtTime(musicVolume * 0.4, ctx.currentTime + 3)
    
    midGain.gain.setValueAtTime(0, ctx.currentTime)
    midGain.gain.linearRampToValueAtTime(musicVolume * 0.2, ctx.currentTime + 5)
    
    highGain.gain.setValueAtTime(0, ctx.currentTime)
    highGain.gain.linearRampToValueAtTime(musicVolume * 0.1, ctx.currentTime + 8)
    
    bass.connect(bassGain)
    mid.connect(midGain)
    high.connect(highGain)
    bassGain.connect(ctx.destination)
    midGain.connect(ctx.destination)
    highGain.connect(ctx.destination)
    
    bass.start()
    mid.start()
    high.start()
    
    currentMusicRef.current = { bass, mid, high }
    
    setTimeout(() => {
      if (currentPage === 'intro' && !isVideoPlaying) playIntroMusic()
    }, 20000)
  }

  const playMissionMusic = () => {
    const ctx = audioContextRef.current
    
    // Dramatic mission briefing with tension
    const bass = ctx.createOscillator()
    const tension = ctx.createOscillator()
    const bassGain = ctx.createGain()
    const tensionGain = ctx.createGain()
    
    bass.type = 'sawtooth'
    tension.type = 'triangle'
    
    bass.frequency.setValueAtTime(65, ctx.currentTime)
    tension.frequency.setValueAtTime(130, ctx.currentTime)
    tension.frequency.linearRampToValueAtTime(260, ctx.currentTime + 4)
    tension.frequency.linearRampToValueAtTime(130, ctx.currentTime + 8)
    
    bassGain.gain.setValueAtTime(0, ctx.currentTime)
    bassGain.gain.linearRampToValueAtTime(musicVolume * 0.3, ctx.currentTime + 1)
    
    tensionGain.gain.setValueAtTime(0, ctx.currentTime)
    tensionGain.gain.linearRampToValueAtTime(musicVolume * 0.2, ctx.currentTime + 2)
    
    bass.connect(bassGain)
    tension.connect(tensionGain)
    bassGain.connect(ctx.destination)
    tensionGain.connect(ctx.destination)
    
    bass.start()
    tension.start()
    
    currentMusicRef.current = { bass, tension }
    
    setTimeout(() => {
      if (currentPage === 'mission-brief' && !isVideoPlaying) playMissionMusic()
    }, 8000)
  }

  const playTrainingMusic = () => {
    const ctx = audioContextRef.current
    const frequencies = [174, 220, 261] // Underwater/training theme
    
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime)
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.5)
      gainNode.gain.linearRampToValueAtTime(musicVolume * 0.15, ctx.currentTime + i * 0.5 + 0.5)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.5 + 3)
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.start(ctx.currentTime + i * 0.5)
      oscillator.stop(ctx.currentTime + i * 0.5 + 3)
    })
    
    setTimeout(() => {
      if (currentPage === 'ai-intro') playTrainingMusic()
    }, 4000)
  }

  const playQuizMusic = () => {
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(330, ctx.currentTime)
    oscillator.frequency.linearRampToValueAtTime(440, ctx.currentTime + 2)
    oscillator.frequency.linearRampToValueAtTime(330, ctx.currentTime + 4)
    
    gainNode.gain.setValueAtTime(musicVolume * 0.25, ctx.currentTime)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    currentMusicRef.current = oscillator
    
    setTimeout(() => {
      if (currentPage === 'quiz') playQuizMusic()
    }, 4000)
  }

  const playLaunchMusic = () => {
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(80, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 3)
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(musicVolume * 0.4, ctx.currentTime + 1)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    oscillator.stop(ctx.currentTime + 3)
    
    setTimeout(() => {
      if (currentPage === 'rocket-launch') playLaunchMusic()
    }, 4000)
  }

  const playCupolaMusic = () => {
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.frequency.linearRampToValueAtTime(880, ctx.currentTime + 6)
    oscillator.frequency.linearRampToValueAtTime(440, ctx.currentTime + 12)
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(musicVolume * 0.3, ctx.currentTime + 1)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    currentMusicRef.current = oscillator
    
    setTimeout(() => {
      if (currentPage === 'cupola-view') playCupolaMusic()
    }, 12000)
  }

  const playGameMusic = () => {
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(200, ctx.currentTime)
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(musicVolume * 0.3, ctx.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.5)
    
    setTimeout(() => {
      if (currentPage === 'final-game') playGameMusic()
    }, 600)
  }

  const playCelebrationMusic = () => {
    const ctx = audioContextRef.current
    
    // Epic celebration with full orchestra feel
    const chords = [
      [261.63, 329.63, 392.00], // C major
      [293.66, 369.99, 440.00], // D major
      [329.63, 415.30, 493.88], // E major
      [349.23, 440.00, 523.25]  // F major
    ]
    
    chords.forEach((chord, chordIndex) => {
      chord.forEach((freq, noteIndex) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime)
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime + chordIndex * 1.5)
        gainNode.gain.linearRampToValueAtTime(musicVolume * 0.25, ctx.currentTime + chordIndex * 1.5 + 0.2)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + chordIndex * 1.5 + 1.4)
        
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        
        oscillator.start(ctx.currentTime + chordIndex * 1.5 + noteIndex * 0.05)
        oscillator.stop(ctx.currentTime + chordIndex * 1.5 + 1.4)
      })
    })
    
    setTimeout(() => {
      if (currentPage === 'celebration' && !isVideoPlaying) playCelebrationMusic()
    }, 7000)
  }

  const playAmbientMusic = () => {
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(110, ctx.currentTime)
    
    gainNode.gain.setValueAtTime(musicVolume * 0.2, ctx.currentTime)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    currentMusicRef.current = oscillator
    
    setTimeout(() => {
      if (!['intro', 'mission-brief', 'ai-intro', 'quiz', 'rocket-launch', 'cupola-view', 'final-game', 'celebration'].includes(currentPage)) {
        playAmbientMusic()
      }
    }, 8000)
  }

  // Sound Effects
  const playButtonClick = () => {
    if (sfxMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(800, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(sfxVolume * 0.5, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.1)
  }

  const playHoverSound = () => {
    if (sfxMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(600, ctx.currentTime)
    
    gainNode.gain.setValueAtTime(sfxVolume * 0.2, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.05)
  }

  const playSuccessSound = () => {
    if (sfxMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    const frequencies = [523.25, 659.25, 783.99] // C-E-G chord
    
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime)
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.1)
      gainNode.gain.linearRampToValueAtTime(sfxVolume * 0.4, ctx.currentTime + i * 0.1 + 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.5)
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.start(ctx.currentTime + i * 0.1)
      oscillator.stop(ctx.currentTime + i * 0.1 + 0.5)
    })
  }

  const playErrorSound = () => {
    if (sfxMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(200, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3)
    
    gainNode.gain.setValueAtTime(sfxVolume * 0.4, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.3)
  }

  const playNotificationSound = () => {
    if (sfxMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.2)
    
    gainNode.gain.setValueAtTime(sfxVolume * 0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.2)
  }

  // Update volumes
  useEffect(() => {
    if (currentMusicRef.current && currentMusicRef.current.gainNode) {
      currentMusicRef.current.gainNode.gain.setValueAtTime(
        isMuted ? 0 : musicVolume, 
        audioContextRef.current?.currentTime || 0
      )
    }
  }, [musicVolume, isMuted])

  const value = {
    isMuted,
    setIsMuted,
    sfxMuted,
    setSfxMuted,
    musicVolume,
    setMusicVolume,
    sfxVolume,
    setSfxVolume,
    isVideoPlaying,
    playPageMusic,
    playButtonClick,
    playHoverSound,
    playSuccessSound,
    playErrorSound,
    playNotificationSound
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
      <AudioControls />
    </AudioContext.Provider>
  )
}

const AudioControls = () => {
  const { 
    isMuted, 
    setIsMuted, 
    sfxMuted,
    setSfxMuted,
    musicVolume, 
    setMusicVolume, 
    sfxVolume, 
    setSfxVolume,
    isVideoPlaying
  } = useAudio()

  return (
    <>
      {/* Music Controls - Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 left-4 z-50 bg-black bg-opacity-80 backdrop-blur-sm rounded-lg p-3 border border-neon-blue border-opacity-50"
      >
        <div className="flex items-center gap-3">
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
            {isMuted ? '🔇' : '🎵'}
          </motion.button>

          {!isMuted && (
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
          )}
          
          {isVideoPlaying && (
            <div className="text-xs text-yellow-400 font-rajdhani">VIDEO</div>
          )}
        </div>
      </motion.div>
      
      {/* SFX Controls - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 z-50 bg-black bg-opacity-80 backdrop-blur-sm rounded-lg p-3 border border-orange-500 border-opacity-50"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSfxMuted(!sfxMuted)}
            className={`p-2 rounded-full transition-all duration-300 ${
              sfxMuted 
                ? 'bg-red-500 text-white' 
                : 'bg-orange-500 text-black'
            }`}
          >
            {sfxMuted ? '🔇' : '🔊'}
          </motion.button>

          {!sfxMuted && (
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
          )}
        </div>
      </motion.div>
    </>
  )
}