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
  const [currentPage, setCurrentPage] = useState('intro')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  const audioContextRef = useRef(null)
  const musicIntervalRef = useRef(null)

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
      
      if (anyVideoPlaying !== isVideoPlaying) {
        setIsVideoPlaying(anyVideoPlaying)
      }
    }
    
    const interval = setInterval(checkVideos, 500)
    
    return () => {
      clearInterval(interval)
      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }, [isVideoPlaying])

  const playPageMusic = (page) => {
    if (isMuted || !audioContextRef.current || isVideoPlaying) return
    
    if (currentPage === page) return
    
    setCurrentPage(page)
    
    if (musicIntervalRef.current) {
      clearTimeout(musicIntervalRef.current)
      musicIntervalRef.current = null
    }
    
    // Only play music during rocket launch
    if (page === 'rocket-launch') {
      playAmbientMusic()
    }
  }

  const playIntroMusic = () => {
    if (isMuted || isVideoPlaying || musicIntervalRef.current) return
    
    const ctx = audioContextRef.current
    
    // NASA Space Apps ISS 25th Anniversary Theme
    // Majestic opening chord (NASA fanfare style)
    const openingChord = [261.63, 329.63, 392.00, 523.25] // C-E-G-C
    openingChord.forEach((freq, i) => {
      const chord = ctx.createOscillator()
      const chordGain = ctx.createGain()
      chord.type = 'triangle'
      chord.frequency.value = freq
      chordGain.gain.setValueAtTime(0, ctx.currentTime)
      chordGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2)
      chordGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 8)
      chordGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 12)
      chord.connect(chordGain)
      chordGain.connect(ctx.destination)
      chord.start()
      chord.stop(ctx.currentTime + 12)
    })
    
    // ISS Anniversary melody (inspiring space theme)
    const anniversaryMelody = [523.25, 659.25, 783.99, 880.00, 1046.50, 880.00, 783.99, 659.25]
    anniversaryMelody.forEach((freq, i) => {
      const melody = ctx.createOscillator()
      const melodyGain = ctx.createGain()
      melody.type = 'sine'
      melody.frequency.value = freq
      melodyGain.gain.setValueAtTime(0.12, ctx.currentTime + 4 + i * 1.5)
      melodyGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 5 + i * 1.5)
      melody.connect(melodyGain)
      melodyGain.connect(ctx.destination)
      melody.start(ctx.currentTime + 4 + i * 1.5)
      melody.stop(ctx.currentTime + 5 + i * 1.5)
    })
    
    // Space station orbital hum
    const orbitalHum = ctx.createOscillator()
    const humGain = ctx.createGain()
    orbitalHum.type = 'sine'
    orbitalHum.frequency.setValueAtTime(110, ctx.currentTime)
    orbitalHum.frequency.linearRampToValueAtTime(165, ctx.currentTime + 20)
    orbitalHum.frequency.linearRampToValueAtTime(110, ctx.currentTime + 40)
    humGain.gain.setValueAtTime(0.08, ctx.currentTime + 2)
    humGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 38)
    humGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 40)
    orbitalHum.connect(humGain)
    humGain.connect(ctx.destination)
    orbitalHum.start(ctx.currentTime + 2)
    orbitalHum.stop(ctx.currentTime + 40)
    
    // Cosmic sparkles for 25th anniversary celebration
    const sparklePattern = [16, 20, 24, 28, 32, 36]
    sparklePattern.forEach(time => {
      const sparkle = ctx.createOscillator()
      const sparkleGain = ctx.createGain()
      sparkle.type = 'sine'
      sparkle.frequency.value = 1760 + Math.random() * 880
      sparkleGain.gain.setValueAtTime(0.08, ctx.currentTime + time)
      sparkleGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 1.2)
      sparkle.connect(sparkleGain)
      sparkleGain.connect(ctx.destination)
      sparkle.start(ctx.currentTime + time)
      sparkle.stop(ctx.currentTime + time + 1.2)
    })
    
    musicIntervalRef.current = setTimeout(() => {
      musicIntervalRef.current = null
      if (!isVideoPlaying && (currentPage === 'intro' || currentPage === 'welcome')) playIntroMusic()
    }, 41000)
  }

  const playAmbientMusic = () => {
    if (isMuted || isVideoPlaying || musicIntervalRef.current) return
    
    const ctx = audioContextRef.current
    
    // General ambient space music
    const pad = ctx.createOscillator()
    const padGain = ctx.createGain()
    pad.type = 'sine'
    pad.frequency.setValueAtTime(220, ctx.currentTime)
    pad.frequency.linearRampToValueAtTime(330, ctx.currentTime + 30)
    pad.frequency.linearRampToValueAtTime(220, ctx.currentTime + 60)
    padGain.gain.setValueAtTime(0, ctx.currentTime)
    padGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 8)
    padGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 52)
    padGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 60)
    pad.connect(padGain)
    padGain.connect(ctx.destination)
    pad.start()
    pad.stop(ctx.currentTime + 60)
    
    musicIntervalRef.current = setTimeout(() => {
      musicIntervalRef.current = null
      if (!isVideoPlaying) playAmbientMusic()
    }, 61000)
  }

  const playDramaticMusic = () => {
    if (isMuted || isVideoPlaying) return
    
    const ctx = audioContextRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(130, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(260, ctx.currentTime + 2)
    osc.frequency.linearRampToValueAtTime(130, ctx.currentTime + 4)
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 4)
    
    musicIntervalRef.current = setTimeout(() => {
      if (!isVideoPlaying && currentPage === 'mission-brief') playDramaticMusic()
    }, 5000)
  }

  const playGameMusic = () => {
    if (isMuted || isVideoPlaying) return
    
    const ctx = audioContextRef.current
    
    // "Launch Sequence" - Energetic, rhythmic, mission start feel
    // Driving bass pulse
    const bass = ctx.createOscillator()
    const bassGain = ctx.createGain()
    bass.type = 'triangle'
    bass.frequency.value = 110
    bassGain.gain.setValueAtTime(0.15, ctx.currentTime)
    bassGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8)
    bass.connect(bassGain)
    bassGain.connect(ctx.destination)
    bass.start()
    bass.stop(ctx.currentTime + 0.8)
    
    // Rhythmic synth
    const synth = ctx.createOscillator()
    const synthGain = ctx.createGain()
    synth.type = 'sawtooth'
    synth.frequency.setValueAtTime(440, ctx.currentTime + 0.2)
    synth.frequency.linearRampToValueAtTime(660, ctx.currentTime + 0.6)
    synthGain.gain.setValueAtTime(0.08, ctx.currentTime + 0.2)
    synthGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8)
    synth.connect(synthGain)
    synthGain.connect(ctx.destination)
    synth.start(ctx.currentTime + 0.2)
    synth.stop(ctx.currentTime + 0.8)
    
    musicIntervalRef.current = setTimeout(() => {
      if (!isVideoPlaying && currentPage === 'final-game') playGameMusic()
    }, 1000)
  }

  const playQuizMusic = () => {
    if (isMuted || isVideoPlaying) return
    
    const ctx = audioContextRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(440, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 4)
    osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 8)
    
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 7)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 8)
    
    musicIntervalRef.current = setTimeout(() => {
      if (!isVideoPlaying && currentPage === 'quiz') playQuizMusic()
    }, 8000)
  }

  const playLaunchMusic = () => {
    if (isMuted || isVideoPlaying) return
    
    const ctx = audioContextRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(80, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 3)
    
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 3)
    
    musicIntervalRef.current = setTimeout(() => {
      if (!isVideoPlaying && currentPage === 'rocket-launch') playLaunchMusic()
    }, 4000)
  }

  const playCelebrationMusic = () => {
    if (isMuted || isVideoPlaying || musicIntervalRef.current) return
    
    const ctx = audioContextRef.current
    
    // "Mission Victory" - Heroic orchestra + ambient layers
    // Heroic orchestral pad
    const orchestralPad = ctx.createOscillator()
    const orchestralGain = ctx.createGain()
    orchestralPad.type = 'triangle'
    orchestralPad.frequency.setValueAtTime(261.63, ctx.currentTime) // C4
    orchestralPad.frequency.linearRampToValueAtTime(523.25, ctx.currentTime + 15)
    orchestralPad.frequency.linearRampToValueAtTime(261.63, ctx.currentTime + 30)
    orchestralGain.gain.setValueAtTime(0, ctx.currentTime)
    orchestralGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 5)
    orchestralGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 25)
    orchestralGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 30)
    orchestralPad.connect(orchestralGain)
    orchestralGain.connect(ctx.destination)
    orchestralPad.start()
    orchestralPad.stop(ctx.currentTime + 30)
    
    // Victory melody (heroic theme)
    const victoryMelody = [523.25, 659.25, 783.99, 1046.50, 783.99, 659.25, 523.25, 659.25, 783.99]
    victoryMelody.forEach((freq, i) => {
      const melody = ctx.createOscillator()
      const melodyGain = ctx.createGain()
      melody.type = 'sine'
      melody.frequency.value = freq
      melodyGain.gain.setValueAtTime(0.08, ctx.currentTime + 8 + i * 1.2)
      melodyGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 8 + i * 1.2 + 1)
      melody.connect(melodyGain)
      melodyGain.connect(ctx.destination)
      melody.start(ctx.currentTime + 8 + i * 1.2)
      melody.stop(ctx.currentTime + 8 + i * 1.2 + 1)
    })
    
    // Ambient space layer
    const ambientLayer = ctx.createOscillator()
    const ambientGain = ctx.createGain()
    ambientLayer.type = 'sine'
    ambientLayer.frequency.setValueAtTime(1760, ctx.currentTime + 5) // A6
    ambientLayer.frequency.linearRampToValueAtTime(2093, ctx.currentTime + 20)
    ambientLayer.frequency.linearRampToValueAtTime(1760, ctx.currentTime + 30)
    ambientGain.gain.setValueAtTime(0, ctx.currentTime + 5)
    ambientGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 10)
    ambientGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 25)
    ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 30)
    ambientLayer.connect(ambientGain)
    ambientGain.connect(ctx.destination)
    ambientLayer.start(ctx.currentTime + 5)
    ambientLayer.stop(ctx.currentTime + 30)
    
    musicIntervalRef.current = setTimeout(() => {
      musicIntervalRef.current = null
      if (!isVideoPlaying && currentPage === 'celebration') playCelebrationMusic()
    }, 31000)
  }

  const playButtonClick = () => {
    if (isMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    
    // Fresh button click with space-tech sound
    const click = ctx.createOscillator()
    const clickGain = ctx.createGain()
    click.type = 'sine'
    click.frequency.setValueAtTime(1200, ctx.currentTime)
    click.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08)
    clickGain.gain.setValueAtTime(0.25, ctx.currentTime)
    clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)
    click.connect(clickGain)
    clickGain.connect(ctx.destination)
    click.start()
    click.stop(ctx.currentTime + 0.08)
    
    // Add subtle echo effect
    setTimeout(() => {
      const echo = ctx.createOscillator()
      const echoGain = ctx.createGain()
      echo.type = 'sine'
      echo.frequency.value = 600
      echoGain.gain.setValueAtTime(0.1, ctx.currentTime)
      echoGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
      echo.connect(echoGain)
      echoGain.connect(ctx.destination)
      echo.start()
      echo.stop(ctx.currentTime + 0.05)
    }, 80)
  }

  const playHoverSound = () => {
    if (isMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    
    // Fresh hover sound with space-tech feel
    const hover = ctx.createOscillator()
    const hoverGain = ctx.createGain()
    hover.type = 'triangle'
    hover.frequency.setValueAtTime(880, ctx.currentTime)
    hover.frequency.linearRampToValueAtTime(1100, ctx.currentTime + 0.06)
    hoverGain.gain.setValueAtTime(0.08, ctx.currentTime)
    hoverGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06)
    hover.connect(hoverGain)
    hoverGain.connect(ctx.destination)
    hover.start()
    hover.stop(ctx.currentTime + 0.06)
  }

  const playAIPopupSound = () => {
    if (isMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.3)
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 0.3)
  }

  const playQuizCorrectSound = () => {
    // Quiz sound removed
  }

  const playQuizWrongSound = () => {
    // Quiz sound removed
  }

  const playCountdownSound = () => {
    if (isMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'square'
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 0.2)
  }

  const playLaunchSound = () => {
    if (isMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(60, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 2)
    
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.5)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 2)
  }

  const playCelebrationSound = () => {
    if (isMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    
    // Victory fanfare
    const fanfare = [523.25, 659.25, 783.99, 1046.50]
    fanfare.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.15)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.5)
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.start(ctx.currentTime + i * 0.15)
      osc.stop(ctx.currentTime + i * 0.15 + 0.5)
    })
  }

  const playCrackerSound = () => {
    if (isMuted || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    
    // Cracker pop sound
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'square'
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1)
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  }

  const stopAllMusic = () => {
    if (musicIntervalRef.current) {
      clearTimeout(musicIntervalRef.current)
      musicIntervalRef.current = null
    }
  }

  const stopAllMusicAndStartCelebration = () => {
    // Stop current music
    if (musicIntervalRef.current) {
      clearTimeout(musicIntervalRef.current)
      musicIntervalRef.current = null
    }
    
    // Start celebration music after brief pause
    setTimeout(() => {
      setCurrentPage('celebration')
      playCelebrationMusic()
      playCelebrationSound()
    }, 500)
  }

  const value = {
    isMuted,
    setIsMuted,
    isVideoPlaying,
    playPageMusic,
    playButtonClick,
    playHoverSound,
    playAIPopupSound,
    playQuizCorrectSound,
    playQuizWrongSound,
    playCountdownSound,
    playLaunchSound,
    playCelebrationSound,
    playCrackerSound,
    stopAllMusic,
    stopAllMusicAndStartCelebration
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

