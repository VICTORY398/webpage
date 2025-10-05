import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const VideoScene = ({ 
  src, 
  onEnded, 
  overlayText, 
  autoPlay = true, 
  muted = true,
  showSkip = true 
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(muted)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => setIsLoading(false)
      const handleEnded = () => {
        if (onEnded) onEnded()
      }

      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('ended', handleEnded)

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('ended', handleEnded)
      }
    }
  }, [onEnded])

  const handleSkip = () => {
    if (onEnded) onEnded()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute top-4 left-4 z-50 px-4 py-2 bg-black bg-opacity-70 text-white font-orbitron rounded-lg border border-neon-blue hover:bg-opacity-90 transition-all duration-300"
        >
          ⏭️ Skip
        </button>
      )}

      {/* Video Mute Button */}
      <button
        onClick={() => {
          setIsVideoMuted(!isVideoMuted)
          if (videoRef.current) {
            videoRef.current.muted = !isVideoMuted
          }
        }}
        className="absolute top-4 right-4 z-50 p-3 bg-black bg-opacity-70 text-white rounded-full border border-neon-blue hover:bg-opacity-90 transition-all duration-300"
      >
        {isVideoMuted ? '🔇' : '🔊'}
      </button>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={isVideoMuted}
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Text */}
      {overlayText && showOverlay && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <h2 className="text-4xl font-orbitron font-bold text-white text-center">
            {overlayText}
          </h2>
        </motion.div>
      )}

      {/* Fallback for missing video */}
      {!src && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-space-black to-blue-900">
          <div className="text-center">
            <h2 className="text-3xl font-orbitron text-white mb-4">Video Coming Soon</h2>
            <p className="text-gray-400 font-rajdhani">Add your video file to /public/assets/</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkip}
              className="mt-6 px-6 py-3 bg-neon-blue text-black font-orbitron font-bold rounded-lg"
            >
              Continue
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default VideoScene