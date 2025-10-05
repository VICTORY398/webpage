import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import VideoScene from '../components/VideoScene'
import AIChatWithButton from '../components/AIChatWithButton'

const MissionBrief = () => {
  const navigate = useNavigate()
  const [showAI, setShowAI] = useState(false)

  const aiMessage = "Astronaut, listen. A rogue AI is attacking Earth — destroying cities and controlling our systems. You are our last hope. To stop it, reach its main control station in space. First, complete your zero‑gravity training and pass the astronaut exam. Earn your license. Launch. Save humanity. Your mission starts now."

  const handleVideoEnd = () => {
    setShowAI(true)
  }

  const handleAIComplete = () => {
    navigate('/training-info')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      {/* VIDEO PLACEHOLDER - Replace with your mission briefing video */}
      <VideoScene
        src="/assets/mission-briefing.mp4"
        onEnded={handleVideoEnd}
        overlayText=""
        autoPlay={true}
        muted={false}
        showSkipButton={true}
        onSkip={() => setShowAI(true)}
      />

      {/* AI Chat Overlay */}
      {showAI && (
        <AIChatWithButton
          message={aiMessage}
          onComplete={handleAIComplete}
          buttonText="Start Training"
          autoStart={true}
        />
      )}







      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default MissionBrief