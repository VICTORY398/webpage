import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { usePageAudio } from '../hooks/usePageAudio'
import { useEffect } from 'react'

const Intro = () => {
  const navigate = useNavigate()
  const { playButtonClick, playHoverSound } = usePageAudio('intro')
  
  // Removed auto-play music

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      {/* Realistic Stars Background */}
      <div className="stars-bg fixed inset-0 opacity-20"></div>
      
      {/* Subtle Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-4">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Welcome to the Space Adventure
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xl md:text-2xl font-rajdhani font-bold text-white mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Experience the International Space Station's 25th Anniversary
          <br />
          Journey through space and save Earth from the rogue AI
        </motion.p>

        <motion.button
          initial={{ scale: 0, rotateX: 90 }}
          animate={{ scale: 1, rotateX: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15, 
            delay: 2 
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(147, 51, 234, 0.6)",
            textShadow: "0 0 20px rgba(255, 255, 255, 1)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playButtonClick()
            setTimeout(() => navigate('/mission-brief'), 100)
          }}
          onMouseEnter={playHoverSound}
          className="px-12 py-5 text-xl font-orbitron font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-400 hover:via-purple-400 hover:to-indigo-500 rounded-xl transition-all duration-300 border-2 border-blue-300 shadow-2xl relative overflow-hidden"
        >
          <span className="relative z-10">🚀 START MISSION</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>

        {/* ISS 25th Anniversary Badge */}
        <motion.div
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 right-8 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-full p-4 border border-gray-600"
        >
          <div className="text-center">
            <div className="text-2xl font-orbitron font-bold text-blue-400">25</div>
            <div className="text-xs font-rajdhani text-gray-400">YEARS</div>
            <div className="text-xs font-rajdhani text-gray-400">ISS</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </motion.div>
  )
}

export default Intro