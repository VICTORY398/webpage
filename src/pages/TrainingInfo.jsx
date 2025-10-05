import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const TrainingInfo = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center"
    >
      <div className="stars-bg fixed inset-0 opacity-20"></div>
      
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
                navigate('/nbl-video')
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
  )
}

export default TrainingInfo