import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'

import { AudioProvider } from './components/SimpleAudioManager'
import Intro from './pages/Intro'
import MissionBrief from './pages/MissionBrief'
import TrainingInfo from './pages/TrainingInfo'
import NBLVideo from './pages/NBLVideo'
import AIBotIntro from './pages/AIBotIntro'
import Quiz from './pages/Quiz'
import RocketLaunch from './pages/RocketLaunch'
import CupolaView from './pages/CupolaView'
import FinalChallenge from './pages/FinalChallenge'
import FinalGame from './pages/FinalGame'
import License from './pages/License'
import LaunchPrep from './pages/LaunchPrep'
import { useState, useEffect } from 'react'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for full progress bar
    const timer = setTimeout(() => {
      setLoading(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <AudioProvider>
      <div className="min-h-screen bg-space-black text-white overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/mission-brief" element={<MissionBrief />} />
          <Route path="/training-info" element={<TrainingInfo />} />
          <Route path="/nbl-video" element={<NBLVideo />} />
          <Route path="/ai-intro" element={<AIBotIntro />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/license" element={<License />} />
          <Route path="/launch-prep" element={<LaunchPrep />} />
          <Route path="/rocket-launch" element={<RocketLaunch />} />
          <Route path="/cupola-view" element={<CupolaView />} />
          <Route path="/final-challenge" element={<FinalChallenge />} />
          <Route path="/final-game" element={<FinalGame />} />
          </Routes>
        </AnimatePresence>
      </div>
    </AudioProvider>
  )
}

export default App