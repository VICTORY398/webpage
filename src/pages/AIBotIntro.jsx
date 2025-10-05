import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AIChat from '../components/AIChat'
import AIChatWithButton from '../components/AIChatWithButton'
import VideoScene from '../components/VideoScene'

const AIBotIntro = () => {
  const navigate = useNavigate()
  const [showVideo, setShowVideo] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)

  const trainingMessage = "If you want to destroy Rogue AI, you must destroy the space station where it is located. For that, you have to become an astronaut and go to space. If you want to become an astronaut, you must attend NASA training. So, click the Start button."
  const aiMessage = "Welcome Astronaut 👋 I've been waiting for your signal. A rogue AI station threatens Earth's communication grid. Your mission begins now — complete NBL training to simulate zero gravity, then journey to the ISS. Are you ready to save humanity?"

  const handleStartTraining = () => {
    setShowVideo(true)
  }

  const handleAIComplete = () => {
    setShowAI(false)
    setVideoEnded(true)
  }

  if (!showVideo) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900"
      >
        <div className="stars-bg fixed inset-0 opacity-20"></div>
        <AIChatWithButton
          message={trainingMessage}
          onComplete={handleStartTraining}
          buttonText="Start Training"
          autoStart={true}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      {/* NBL Training Background Video */}
      {/* VIDEO PLACEHOLDER - Replace with NBL underwater training footage */}
      <VideoScene
        src="/assets/nbl-training.mp4"
        autoPlay={true}
        muted={true}
        className="opacity-60"
        showSkipButton={true}
        onSkip={() => setShowAI(true)}
        onEnded={() => setShowAI(true)}
      />

      {/* AI Chat Overlay */}
      {showAI && (
        <AIChat
          message={aiMessage}
          onComplete={handleAIComplete}
          autoStart={true}
        />
      )}

      {/* Training Info Panel */}
      {!showAI && videoEnded && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-space-black bg-opacity-80 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-4 border border-neon-blue border-opacity-30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-orbitron font-bold gradient-text mb-6">
                  NBL Training
                </h2>
                <p className="text-lg font-rajdhani text-gray-300 mb-6 leading-relaxed">
                  The Neutral Buoyancy Lab simulates weightlessness underwater, preparing astronauts for spacewalks and ISS operations. This training is crucial for:
                </p>
                <ul className="space-y-3 font-rajdhani text-gray-300 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    Robotics and equipment handling in zero gravity
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
                    Medical procedures in space environments
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-neon-pink rounded-full"></div>
                    Engineering solutions for Earth applications
                  </li>
                </ul>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 40px rgba(139, 69, 19, 0.8), 0 0 80px rgba(255, 140, 0, 0.6)",
                    textShadow: "0 0 20px rgba(255, 255, 255, 1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (window.playSound) window.playSound('buttonClick')
                    navigate('/quiz')
                  }}
                  onMouseEnter={() => { if (window.playSound) window.playSound('buttonClick') }}
                  className="px-10 py-5 text-lg font-orbitron font-bold text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg transition-all duration-300 border-2 border-orange-400 relative overflow-hidden shadow-lg"
                >
                  <span className="relative z-10">🎓 START TRAINING</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.button>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-neon-blue to-neon-purple p-1 rounded-2xl">
                  <div className="bg-space-black rounded-2xl p-6">
                    <h3 className="text-xl font-orbitron text-neon-blue mb-4">
                      Training Benefits for Earth
                    </h3>
                    <div className="space-y-4 text-sm font-rajdhani text-gray-300">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-neon-blue bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                          🤖
                        </div>
                        <div>
                          <div className="font-semibold text-neon-blue">Robotics</div>
                          <div>Advanced robotic systems for surgery and manufacturing</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-neon-purple bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                          🏥
                        </div>
                        <div>
                          <div className="font-semibold text-neon-purple">Medicine</div>
                          <div>Telemedicine and remote surgical procedures</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-neon-pink bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                          🌍
                        </div>
                        <div>
                          <div className="font-semibold text-neon-pink">Climate</div>
                          <div>Earth observation and climate monitoring</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default AIBotIntro