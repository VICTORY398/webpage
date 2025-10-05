import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAudio } from './SimpleAudioManager'

const AIChat = ({ message, onComplete, autoStart = true }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [showButton, setShowButton] = useState(false)
  const { playAIPopupSound, playButtonClick } = useAudio()

  useEffect(() => {
    if (autoStart && message) {
      playAIPopupSound()
      setDisplayedText(message)
      setTimeout(() => setShowButton(true), 500)
    }
  }, [message, autoStart, playAIPopupSound])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="relative max-w-lg w-full"
      >
        {/* Notification Card */}
        <div className="bg-gradient-to-br from-space-black via-slate-900 to-space-grey rounded-2xl shadow-2xl border-2 border-neon-blue/40 overflow-hidden backdrop-blur-xl relative">
          {/* Animated Border Glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl border-2 border-neon-blue/60 pointer-events-none"
          />
          
          {/* Notification Header */}
          <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-6 py-5 flex items-center gap-4 border-b border-neon-blue/30 relative">
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-br from-neon-blue/20 to-slate-600 rounded-full flex items-center justify-center shadow-lg shadow-neon-blue/20"
            >
              <span className="text-2xl">🤖</span>
            </motion.div>
            <div className="flex-1">
              <div className="text-white font-bold text-lg font-orbitron">NASA AI Assistant</div>
              <div className="text-neon-blue/80 text-sm font-rajdhani">Mission Control System</div>
            </div>
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-3 h-3 bg-neon-blue rounded-full shadow-lg shadow-neon-blue/50"
              />
              <span className="text-sm text-neon-blue font-rajdhani font-medium">ONLINE</span>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white text-lg leading-relaxed mb-8 font-rajdhani"
            >
              {displayedText}
            </motion.div>
          </div>

          {/* Action Button */}
          {showButton && (
            <div className="px-8 pb-8">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 30px rgba(0, 245, 255, 0.5)",
                  backgroundColor: "rgba(0, 245, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playButtonClick()
                  setTimeout(onComplete, 100)
                }}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-600 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 border-2 border-neon-blue/50 shadow-lg shadow-neon-blue/20 font-orbitron relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent"
                />
                <span className="relative z-10">OK</span>
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AIChat