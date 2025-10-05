import { useEffect } from 'react'
import { useAudio } from '../components/SimpleAudioManager'

export const usePageAudio = (pageName) => {
  const { playPageMusic, playButtonClick, playHoverSound, playAIPopupSound, playQuizCorrectSound, playQuizWrongSound, playCountdownSound, playLaunchSound, playCelebrationSound, playCrackerSound, stopAllMusic, stopAllMusicAndStartCelebration } = useAudio()

  useEffect(() => {
    // Start music immediately
    playPageMusic(pageName)
    
    // Also start on first user interaction
    const startMusic = () => {
      playPageMusic(pageName)
      document.removeEventListener('click', startMusic)
      document.removeEventListener('keydown', startMusic)
    }
    
    document.addEventListener('click', startMusic)
    document.addEventListener('keydown', startMusic)
    
    return () => {
      document.removeEventListener('click', startMusic)
      document.removeEventListener('keydown', startMusic)
    }
  }, [pageName, playPageMusic])

  return {
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
}