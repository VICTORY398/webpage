import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import VideoScene from '../components/VideoScene'
import AIChat from '../components/AIChat'

const NBLVideo = () => {
  const navigate = useNavigate()
  const [showAI, setShowAI] = useState(false)

  const aiMessage = "Astronaut, the moment has come. Complete your NBL training, conquer the astronaut exam, and claim your license. Only then will you be ready to launch into the cosmos. The world is counting on you — step into your destiny, face the challenge, and save humanity."

  const handleVideoEnd = () => {
    setShowAI(true)
  }

  const handleAIComplete = () => {
    navigate('/quiz')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <VideoScene
        src="/assets/nbl-training.mp4"
        onEnded={handleVideoEnd}
        overlayText="NASA NBL Training Experience"
        autoPlay={true}
        muted={false}
        showSkipButton={true}
        onSkip={() => setShowAI(true)}
      />

      {showAI && (
        <AIChat
          message={aiMessage}
          onComplete={handleAIComplete}
          autoStart={true}
        />
      )}
    </motion.div>
  )
}

export default NBLVideo