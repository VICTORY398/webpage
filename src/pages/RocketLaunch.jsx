import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import VideoScene from '../components/VideoScene'
import { usePageAudio } from '../hooks/usePageAudio'

const RocketLaunch = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)
  const [launched, setLaunched] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const { playButtonClick, playCountdownSound, playLaunchSound } = usePageAudio('rocket-launch')
  
  useEffect(() => {
    if (launched) {
      const timer = setTimeout(() => {
        setShowMessage(true)
      }, 6000) // Show AI message after 6 seconds
      return () => clearTimeout(timer)
    }
  }, [launched])

  useEffect(() => {
    if (countdown > 0 && !launched) {
      const timer = setTimeout(() => {
        playCountdownSound()
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !launched) {
      playLaunchSound()
      setLaunched(true)
      setTimeout(() => {
        setShowMessage(true)
      }, 7000)
    }
  }, [countdown, launched, navigate, playCountdownSound, playLaunchSound])

  const handleVideoEnd = () => {
    navigate('/cupola-view')
  }

  if (launched) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black overflow-hidden"
      >
        {/* Intense Screen Shake and G-Force Effects */}
        <motion.div
          animate={countdown <= 1 ? {
            x: [0, -1, 1, 0],
            y: [0, -1, 1, 0]
          } : {}}
          transition={{
            duration: 0.1,
            repeat: countdown <= 1 ? 2 : 0,
            ease: "easeOut"
          }}
          className="w-full h-full relative"
        >
          {/* Intense Flash Effects */}
          <motion.div
            animate={countdown <= 1 ? {
              opacity: [0, 0.3, 0]
            } : {}}
            transition={{
              duration: 0.1,
              repeat: countdown <= 1 ? 1 : 0
            }}
            className="absolute inset-0 z-50 pointer-events-none"
          />
          {/* Phase 1: Intense Launch Ignition (0-2s) */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute inset-0 z-40"
            style={{
              background: 'radial-gradient(circle, #ff6600 0%, #ff3300 20%, #cc0000 40%, #000000 70%)'
            }}
          />
          
          {/* Rocket Engine Fire Effects */}
          <motion.div
            animate={{
              scale: [0, 3, 1.5, 4, 2, 5],
              opacity: [0, 1, 0.8, 1, 0.6, 0]
            }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 z-30"
            style={{
              background: 'radial-gradient(circle, #ffffff 0%, #ffaa00 20%, #ff6600 40%, #ff3300 60%, transparent 80%)',
              filter: 'blur(8px)'
            }}
          />
        </motion.div>
        
        {/* Phase 2: First Stars Appear (1-3s) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1] }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute inset-0"
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`star1-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                opacity: [0, 1, 0.5, 1]
              }}
              transition={{
                delay: 1 + Math.random() * 2,
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.div>
        
        {/* Phase 3: Warp Speed Stars (3-5s) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1] }}
          transition={{ delay: 3, duration: 2 }}
          className="absolute inset-0"
        >
          {[...Array(200)].map((_, i) => {
            const angle = Math.random() * 360
            const distance = 300 + Math.random() * 500
            return (
              <motion.div
                key={`warp-${i}`}
                className="absolute bg-white"
                style={{
                  left: '50%',
                  top: '50%',
                  width: '2px',
                  height: '2px',
                  borderRadius: '50%'
                }}
                animate={{
                  x: [0, Math.cos(angle * Math.PI / 180) * distance],
                  y: [0, Math.sin(angle * Math.PI / 180) * distance],
                  scaleX: [1, 20],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  delay: 3 + Math.random() * 2,
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )
          })}
        </motion.div>
        
        {/* Phase 4: Deep Space (5s+) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"
        >
          {/* Distant Stars */}
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={`distant-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() > 0.8 ? '2px' : '1px'}`,
                height: `${Math.random() > 0.8 ? '2px' : '1px'}`
              }}
              animate={{
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                delay: 5 + Math.random() * 2,
                duration: 2 + Math.random() * 3,
                repeat: Infinity
              }}
            />
          ))}
        </motion.div>
        
        {/* Skip Button */}
        <motion.button
          onClick={() => {
            playButtonClick()
            setTimeout(() => navigate('/cupola-view'), 100)
          }}
          whileHover={{ 
            scale: 1.08
          }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-8 left-8 z-[9998] px-6 py-3 bg-black/40 backdrop-blur-md rounded-2xl border-2 border-white/30 text-white font-orbitron text-lg font-bold hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
          SKIP →
        </motion.button>
        
        {/* Mission Control AI Popup */}
        {showMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-70 backdrop-blur-md p-4">
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
                    When you finally reach space, you'll witness Earth like no one ever has. The Cupola will reveal its majestic view at the perfect moment — a breathtaking panorama that will leave you awestruck. Explore, marvel, and experience our world in a way that will stay with you forever.
                  </motion.div>
                </div>

                {/* Action Button */}
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
                      setTimeout(() => navigate('/cupola-view'), 100)
                    }}
                    className="w-full bg-gradient-to-r from-slate-700 to-slate-600 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 border-2 border-neon-blue/50 shadow-lg shadow-neon-blue/20 font-orbitron relative overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent"
                    />
                    <span className="relative z-10">Explore</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Ultra-Realistic Cockpit Interior */}
      <motion.div
        animate={{
          y: launched ? [0, -3, -8, -15, -25] : countdown <= 3 ? [0, -1, 1, -0.5, 0.5, 0] : 0,
          rotateZ: launched ? [0, -0.5, 0.3, -0.2, 0] : countdown <= 1 ? [0, -0.8, 0.8, -0.4, 0.4, 0] : 0
        }}
        transition={{
          y: { duration: launched ? 10 : 0.8, ease: launched ? "easeOut" : "easeInOut" },
          rotateZ: { duration: launched ? 10 : 0.3, ease: "easeInOut", repeat: countdown <= 1 ? Infinity : 0 }
        }}
        className="relative w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #0f0f0f 0%, #080808 50%, #000000 100%)'
        }}
      >
        {/* Astronaut Seat and Restraints */}
        <div className="absolute inset-0">
          {/* Seat Back and Headrest */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-80 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 rounded-t-3xl border-4 border-gray-500 shadow-2xl">
            {/* Seat Padding */}
            <div className="absolute inset-4 bg-gradient-to-b from-blue-900 to-blue-800 rounded-2xl border-2 border-blue-600">
              {/* Seat Quilting Pattern */}
              <div className="absolute inset-2 grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-blue-700 rounded border border-blue-500 shadow-inner"></div>
                ))}
              </div>
            </div>
            {/* Headrest */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-2xl border-4 border-gray-500">
              <div className="absolute inset-2 bg-blue-800 rounded border border-blue-600"></div>
            </div>
          </div>
          
          {/* Safety Harness Straps */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
            {/* Shoulder Straps */}
            <div className="absolute w-8 h-40 bg-gradient-to-b from-orange-600 to-orange-700 rounded-full transform -rotate-12 -translate-x-16 border-2 border-orange-500 shadow-lg"></div>
            <div className="absolute w-8 h-40 bg-gradient-to-b from-orange-600 to-orange-700 rounded-full transform rotate-12 translate-x-8 border-2 border-orange-500 shadow-lg"></div>
            
            {/* Chest Strap */}
            <div className="absolute top-20 w-32 h-6 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full -translate-x-16 border-2 border-orange-500 shadow-lg">
              {/* Buckle */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-4 bg-gray-300 rounded border border-gray-400 shadow-inner"></div>
            </div>
            
            {/* Lap Belt */}
            <div className="absolute top-32 w-40 h-6 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full -translate-x-20 border-2 border-orange-500 shadow-lg">
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-4 bg-gray-300 rounded border border-gray-400 shadow-inner"></div>
            </div>
          </div>
          
          {/* Cockpit Window Frame - More Realistic */}
          <motion.div 
            animate={{
              scale: launched ? [1, 0.98, 0.95] : 1
            }}
            transition={{ duration: 8, ease: "easeOut" }}
            className="absolute top-16 left-1/2 transform -translate-x-1/2 overflow-hidden"
            style={{
              width: '60vw',
              height: '45vh',
              borderRadius: '25px',
              border: '12px solid #1a1a1a',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.95), 0 0 40px rgba(50,50,50,0.3), inset 0 0 20px rgba(100,100,100,0.1)'
            }}
          >
            {/* Window Frame Details */}
            <div className="absolute inset-0 rounded-2xl border-4 border-gray-600 shadow-inner">
              {/* Window Cross Supports */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-500 transform -translate-y-1/2 shadow-lg"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-500 transform -translate-x-1/2 shadow-lg"></div>
              
              {/* Corner Reinforcements */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-gray-400 rounded border border-gray-300"></div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-gray-400 rounded border border-gray-300"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-gray-400 rounded border border-gray-300"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-gray-400 rounded border border-gray-300"></div>
            </div>
            {/* Window Content */}
            <div className="relative w-full h-full" style={{
              background: launched ?
                'radial-gradient(ellipse at center, #000033 0%, #000011 50%, #000000 100%)' :
                'linear-gradient(180deg, #87CEEB 0%, #4682B4 30%, #2F4F4F 70%, #1a1a1a 100%)'
            }}>
              {/* Pre-launch Earth View */}
              {!launched && (
                <>
                  {/* Ground and Launch Pad */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-500"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gray-600 rounded-t-lg"></div>
                  
                  {/* Launch Tower */}
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-12 w-4 h-32 bg-gray-500"></div>
                  <div className="absolute bottom-16 left-1/2 transform translate-x-8 w-4 h-32 bg-gray-500"></div>
                  
                  {/* Realistic Clouds */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-12 bg-white opacity-70 rounded-full blur-sm"></div>
                  <div className="absolute top-1/3 right-1/4 w-24 h-8 bg-white opacity-60 rounded-full blur-sm"></div>
                  <div className="absolute top-1/5 left-3/4 w-20 h-6 bg-white opacity-50 rounded-full blur-sm"></div>
                  
                  {/* Horizon Line */}
                  <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                </>
              )}
              
              {/* Realistic Space View with Earth */}
              {launched && (
                <>
                  {/* Earth - More Detailed and Realistic */}
                  <motion.div
                    initial={{ scale: 1.2, y: '20%' }}
                    animate={{ 
                      scale: [1.2, 0.8, 0.3, 0.1],
                      y: ['20%', '40%', '80%', '120%']
                    }}
                    transition={{ duration: 8, ease: "easeOut" }}
                    className="absolute left-1/2 transform -translate-x-1/2 rounded-full"
                    style={{
                      width: '60vh',
                      height: '60vh',
                      background: 'radial-gradient(circle at 30% 30%, #4a90e2 0%, #2e5c8a 25%, #1a3a5c 50%, #0d1f2f 75%, #000 100%)'
                    }}
                  >
                    {/* Detailed Continents */}
                    <div className="absolute top-1/4 left-1/3 w-16 h-12 bg-green-700 rounded-lg opacity-80 transform rotate-12"></div>
                    <div className="absolute top-1/2 right-1/4 w-12 h-8 bg-green-800 rounded opacity-70 transform -rotate-6"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-20 h-10 bg-yellow-900 rounded-lg opacity-60 transform rotate-3"></div>
                    <div className="absolute top-2/3 left-2/3 w-8 h-6 bg-green-600 rounded opacity-75"></div>
                    
                    {/* Realistic Cloud Formations */}
                    <div className="absolute top-1/3 left-1/2 w-8 h-4 bg-white opacity-50 rounded-full blur-sm"></div>
                    <div className="absolute bottom-1/2 right-1/3 w-6 h-3 bg-white opacity-40 rounded-full blur-sm"></div>
                    <div className="absolute top-1/5 left-1/5 w-10 h-5 bg-white opacity-45 rounded-full blur-sm"></div>
                    
                    {/* Atmospheric Glow */}
                    <div className="absolute inset-0 rounded-full" style={{
                      background: 'radial-gradient(circle, transparent 85%, rgba(135, 206, 235, 0.3) 90%, rgba(135, 206, 235, 0.6) 95%, transparent 100%)'
                    }}></div>
                  </motion.div>
                  
                  {/* Enhanced Star Field */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(500)].map((_, i) => {
                      const angle = (Math.random() * 360) * (Math.PI / 180)
                      const distance = 100 + Math.random() * 400
                      const speed = 0.5 + Math.random() * 1.5
                      const size = Math.random() > 0.9 ? 6 : Math.random() > 0.7 ? 4 : Math.random() > 0.4 ? 2 : 1
                      
                      return (
                        <motion.div
                          key={i}
                          className="absolute bg-white"
                          style={{
                            left: '50%',
                            top: '50%',
                            width: `${size}px`,
                            height: `${size}px`,
                            borderRadius: '50%',
                            boxShadow: size > 2 ? '0 0 4px rgba(255,255,255,0.8)' : 'none'
                          }}
                          animate={{
                            x: [0, Math.cos(angle) * distance * 4],
                            y: [0, Math.sin(angle) * distance * 4],
                            scaleX: [1, size > 2 ? 30 : 15],
                            scaleY: [1, 1],
                            opacity: [0, 0.8, 1, 0]
                          }}
                          transition={{
                            duration: speed,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: Math.random() * 3
                          }}
                        />
                      )
                    })}
                  </div>
                  
                  {/* Enhanced Warp Tunnel Effect */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'radial-gradient(ellipse at center, transparent 15%, rgba(0,150,255,0.05) 30%, rgba(0,100,200,0.15) 60%, rgba(0,50,150,0.25) 85%)',
                        'radial-gradient(ellipse at center, transparent 10%, rgba(0,200,255,0.1) 25%, rgba(0,150,255,0.2) 55%, rgba(0,100,200,0.3) 80%)',
                        'radial-gradient(ellipse at center, transparent 15%, rgba(0,150,255,0.05) 30%, rgba(0,100,200,0.15) 60%, rgba(0,50,150,0.25) 85%)'
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Enhanced Radial Speed Streaks */}
                  <div className="absolute inset-0">
                    {[...Array(80)].map((_, i) => {
                      const angle = (i * 4.5) * (Math.PI / 180)
                      return (
                        <motion.div
                          key={`streak-${i}`}
                          className="absolute bg-gradient-to-r from-white via-blue-200 to-transparent"
                          style={{
                            left: '50%',
                            top: '50%',
                            width: '300px',
                            height: i % 3 === 0 ? '4px' : '2px',
                            transformOrigin: 'left center',
                            rotate: `${angle * (180 / Math.PI)}deg`,
                            filter: 'blur(0.5px)'
                          }}
                          animate={{
                            scaleX: [0, 12, 0],
                            opacity: [0, 0.9, 0]
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: (i * 0.015) % 3
                          }}
                        />
                      )
                    })}
                  </div>
                  
                  {/* Enhanced Cosmic Debris and Particles */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={`debris-${i}`}
                      className="absolute rounded-full blur-sm"
                      style={{
                        width: `${3 + Math.random() * 12}px`,
                        height: `${3 + Math.random() * 12}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#06b6d4' : '#f59e0b'
                      }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 1200],
                        y: [0, (Math.random() - 0.5) * 1200],
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: 1.5 + Math.random() * 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: Math.random() * 4
                      }}
                    />
                  ))}
                  
                  {/* ISS Approaching - More Detailed */}
                  <motion.div
                    animate={{
                      x: ['60%', '45%', '30%'],
                      y: ['20%', '35%', '50%'],
                      scale: [0.3, 1, 2.5],
                      opacity: [0.4, 0.8, 1]
                    }}
                    transition={{ duration: 8, ease: "easeOut" }}
                    className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-sm shadow-lg"
                    style={{
                      boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)'
                    }}
                  />
                </>
              )}
            </div>
          </motion.div>
          

        </div>
        
        {/* Advanced Control Panels and Instrument Cluster */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent">
          {/* Left Control Panel */}
          <div className="absolute bottom-6 left-6 w-64 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-gray-600 p-3 shadow-2xl">
            <div className="text-green-400 font-mono text-xs mb-2 text-center border-b border-gray-600 pb-1">ENGINE SYSTEMS</div>
            <div className="grid grid-cols-6 gap-1 h-20">
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    backgroundColor: countdown <= 3 && i < 6 ? 
                      ['#ff0000', '#ff6600', '#ff0000'] : 
                      launched && i >= 6 && i < 12 ?
                      ['#ffff00', '#ff9900', '#ffff00'] :
                      ['#00ff00', '#0066ff', '#00ff00']
                  }}
                  transition={{ duration: 0.3 + (i * 0.05), repeat: Infinity }}
                  className="w-full h-3 rounded border border-gray-500 shadow-inner"
                />
              ))}
            </div>
            {/* Engine Status Display */}
            <div className="mt-2 text-center">
              <div className={`text-xs font-mono ${countdown <= 3 ? 'text-red-400 animate-pulse' : launched ? 'text-yellow-400' : 'text-green-400'}`}>
                {countdown <= 3 ? 'IGNITION' : launched ? 'THRUST' : 'STANDBY'}
              </div>
            </div>
          </div>
          
          {/* Right Control Panel */}
          <div className="absolute bottom-6 right-6 w-64 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-gray-600 p-3 shadow-2xl">
            <div className="text-blue-400 font-mono text-xs mb-2 text-center border-b border-gray-600 pb-1">LIFE SUPPORT</div>
            <div className="grid grid-cols-6 gap-1 h-20">
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    backgroundColor: i < 12 ? 
                      ['#0099ff', '#6600ff', '#0099ff'] : 
                      launched && i >= 12 ?
                      ['#00ff99', '#0099ff', '#00ff99'] :
                      ['#666666', '#888888', '#666666']
                  }}
                  transition={{ duration: 0.4 + (i * 0.03), repeat: Infinity }}
                  className="w-full h-3 rounded border border-gray-500 shadow-inner"
                />
              ))}
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs font-mono text-blue-400">
                O2: 99.2% | CO2: 0.04%
              </div>
            </div>
          </div>
          
          {/* Center Master Control */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-80 h-32 bg-gradient-to-br from-gray-900 to-black rounded-lg border-2 border-orange-500 p-4 shadow-2xl">
            <div className="text-center text-orange-400 font-orbitron text-sm mb-3 border-b border-orange-600 pb-1">MISSION CONTROL</div>
            
            {/* Main Control Buttons */}
            <div className="flex justify-center space-x-4 mb-3">
              <motion.button
                animate={{ 
                  boxShadow: countdown <= 3 ? 
                    ['0 0 15px #ff0000', '0 0 30px #ff6600', '0 0 15px #ff0000'] : 
                    '0 0 8px #00ff00',
                  scale: countdown <= 3 ? [1, 1.05, 1] : 1
                }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="w-12 h-12 rounded-full bg-gradient-to-b from-red-500 to-red-700 border-3 border-red-400 shadow-lg relative"
              >
                <div className="absolute inset-2 rounded-full bg-red-600 shadow-inner"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">ENG</div>
              </motion.button>
              
              <motion.button
                animate={{ 
                  boxShadow: launched ? 
                    ['0 0 15px #ffff00', '0 0 30px #ff9900', '0 0 15px #ffff00'] : 
                    '0 0 5px #666666',
                  scale: launched ? [1, 1.05, 1] : 1
                }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="w-12 h-12 rounded-full bg-gradient-to-b from-yellow-500 to-yellow-700 border-3 border-yellow-400 shadow-lg relative"
              >
                <div className="absolute inset-2 rounded-full bg-yellow-600 shadow-inner"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-xs font-bold">NAV</div>
              </motion.button>
              
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-green-500 to-green-700 border-3 border-green-400 shadow-lg shadow-green-500/50 relative">
                <div className="absolute inset-2 rounded-full bg-green-600 shadow-inner"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">SYS</div>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="flex justify-between text-xs font-mono">
              <div className={`${countdown <= 3 ? 'text-red-400' : 'text-green-400'}`}>PWR: {countdown <= 3 ? 'MAX' : 'NOM'}</div>
              <div className="text-blue-400">COMM: LINK</div>
              <div className={`${launched ? 'text-yellow-400' : 'text-gray-400'}`}>GUID: {launched ? 'AUTO' : 'STBY'}</div>
            </div>
          </div>
        </div>
        
        {/* Overhead Console */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-96 h-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-2 border-gray-600 p-2 shadow-2xl">
          <div className="flex justify-between items-center h-full">
            {/* Overhead Switches */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: i < 3 && countdown <= 3 ? 
                    ['#ff6600', '#ff0000', '#ff6600'] :
                    i >= 3 && i < 6 && launched ?
                    ['#00ff00', '#0099ff', '#00ff00'] :
                    '#666666'
                }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                className="w-8 h-10 bg-gray-600 rounded border-2 border-gray-500 shadow-inner relative"
              >
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gray-400 rounded-sm shadow"></div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Cockpit Interior Frame */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Realistic Cockpit Vignette */}
          <div style={{
            background: `radial-gradient(ellipse 60vw 45vh at 50% 35%, transparent 30%, rgba(15, 15, 15, 0.8) 45%, rgba(8, 8, 8, 0.95) 65%, rgba(0, 0, 0, 1) 80%)`
          }} className="absolute inset-0"></div>
          
          {/* Detailed Interior Panels */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-800 via-gray-700 to-transparent opacity-90 border-b border-gray-600"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent opacity-95"></div>
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-800 via-gray-700 to-transparent opacity-90 border-r border-gray-600"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-800 via-gray-700 to-transparent opacity-90 border-l border-gray-600"></div>
          
          {/* Cockpit Structural Elements */}
          <div className="absolute top-12 left-12 w-8 h-8 bg-gray-600 rounded border-2 border-gray-500 shadow-lg"></div>
          <div className="absolute top-12 right-12 w-8 h-8 bg-gray-600 rounded border-2 border-gray-500 shadow-lg"></div>
          <div className="absolute bottom-32 left-12 w-8 h-8 bg-gray-600 rounded border-2 border-gray-500 shadow-lg"></div>
          <div className="absolute bottom-32 right-12 w-8 h-8 bg-gray-600 rounded border-2 border-gray-500 shadow-lg"></div>
          
          {/* Interior Lighting */}
          <div className="absolute top-8 left-1/4 w-32 h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 rounded-full blur-sm"></div>
          <div className="absolute top-8 right-1/4 w-32 h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 rounded-full blur-sm"></div>
          
          {/* Ventilation Grilles */}
          <div className="absolute top-16 left-8 w-16 h-4 bg-gray-700 rounded border border-gray-600">
            <div className="flex justify-between items-center h-full px-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-0.5 h-2 bg-gray-500 rounded"></div>
              ))}
            </div>
          </div>
          <div className="absolute top-16 right-8 w-16 h-4 bg-gray-700 rounded border border-gray-600">
            <div className="flex justify-between items-center h-full px-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-0.5 h-2 bg-gray-500 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced HUD Display */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40">
        <motion.div
          key={countdown}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1,
            opacity: 1
          }}
          transition={{ 
            duration: 0.2,
            ease: "easeOut"
          }}
          className="text-center"
        >
          <motion.div 

            className={`text-8xl font-orbitron font-black mb-4 ${
              countdown > 0 ? 'text-red-400' : 'text-green-400'
            }`}
            style={{
              filter: countdown <= 3 ? 'drop-shadow(0 0 20px currentColor)' : 'none'
            }}
          >
            {countdown > 0 ? countdown : launched ? "LAUNCH" : "IGNITION"}
          </motion.div>
          <motion.div 

            className="text-xl font-rajdhani font-bold text-orange-300"
          >
            {countdown > 0 ? "LAUNCH SEQUENCE INITIATED" : "ASCENT PHASE ACTIVE"}
          </motion.div>
          
          {/* Launch Progress Bar */}
          {countdown <= 3 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3 }}
              className="mt-4 h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 rounded-full mx-auto"
              style={{ maxWidth: '200px' }}
            />
          )}
        </motion.div>
      </div>

      {/* Mission Data */}
      <div className="absolute top-20 left-8 z-40 bg-black bg-opacity-80 rounded border border-green-400 p-3">
        <div className="text-green-400 font-mono text-xs space-y-1">
          <div>ALT: {countdown > 0 ? '0000' : '0150'} KM</div>
          <div>VEL: {countdown > 0 ? '0000' : '7800'} M/S</div>
          <div>FUEL: {100 - (launched ? 15 : 0)}%</div>
          <div className={countdown <= 3 ? 'text-red-400 animate-pulse' : 'text-green-400'}>
            ENG: {countdown <= 3 ? 'FIRE' : 'STBY'}
          </div>
        </div>
      </div>
      
      <div className="absolute top-20 right-8 z-40 bg-black bg-opacity-80 rounded border border-blue-400 p-3">
        <div className="text-blue-400 font-mono text-xs space-y-1">
          <div>O2: 99.2%</div>
          <div>CO2: 0.04%</div>
          <div>PRES: 14.7 PSI</div>
          <div>TEMP: 22°C</div>
        </div>
      </div>




    </div>
  )
}

export default RocketLaunch