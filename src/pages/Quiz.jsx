import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { usePageAudio } from '../hooks/usePageAudio'

const Quiz = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [showLicense, setShowLicense] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const { playButtonClick, playHoverSound, playQuizCorrectSound, playQuizWrongSound } = usePageAudio('quiz')

  const questions = [
    {
      question: "What is the primary goal of training in the Neutral Buoyancy Laboratory (NBL)?",
      options: [
        "To simulate the high G-forces of a rocket launch.",
        "To practice landing a spacecraft on Mars.",
        "To simulate the weightless environment of space for spacewalk training.",
        "To test the astronaut's ability to withstand extreme temperatures."
      ],
      correct: 2
    },
    {
      question: "The 'NBL' is essentially a very large version of what?",
      options: [
        "A wind tunnel",
        "A swimming pool",
        "A flight simulator",
        "A vacuum chamber"
      ],
      correct: 1
    },
    {
      question: "What can be found inside the NBL to make the training realistic?",
      options: [
        "An obstacle course",
        "Marine animals",
        "Full-scale mockups of the International Space Station (ISS)",
        "A wave machine"
      ],
      correct: 2
    },
    {
      question: "Where is NASA's Neutral Buoyancy Laboratory located?",
      options: [
        "Kennedy Space Center, Florida",
        "Johnson Space Center, Houston, Texas",
        "Jet Propulsion Laboratory, California",
        "Edwards Air Force Base, California"
      ],
      correct: 1
    },
    {
      question: "What does the term 'neutral buoyancy' mean?",
      options: [
        "An object is too heavy to float.",
        "An object is too light to sink.",
        "An object has an equal tendency to float and to sink.",
        "An object is magnetic."
      ],
      correct: 2
    },
    {
      question: "Besides the astronaut, who else is in the water during an NBL training session to provide help and ensure safety?",
      options: [
        "Medical doctors",
        "Mission controllers",
        "Specially trained support divers",
        "Robotics engineers"
      ],
      correct: 2
    },
    {
      question: "What kind of suit does an astronaut wear during NBL training?",
      options: [
        "A standard scuba wetsuit",
        "A lightweight flight suit",
        "A training version of a real Extravehicular Mobility Unit (EMU) spacesuit",
        "A fire-retardant safety suit"
      ],
      correct: 2
    },
    {
      question: "While the NBL is excellent at simulating weightlessness, what is a key physical difference that astronauts must constantly work against compared to a real spacewalk?",
      options: [
        "The bright underwater lights",
        "The echoing sounds",
        "The extreme cold of the water",
        "The drag and resistance of the water"
      ],
      correct: 3
    },
    {
      question: "Why do NBL training sessions often last for 6-7 hours at a time?",
      options: [
        "Because it takes that long to fill the pool with water.",
        "To test the astronaut's endurance for a long-duration spaceflight.",
        "Because tasks that take minutes in normal gravity can take hours in a bulky, pressurized suit.",
        "To wait for the support divers to complete their shifts."
      ],
      correct: 2
    },
    {
      question: "How do technicians fine-tune the astronaut's suit to achieve perfect neutral buoyancy?",
      options: [
        "By adjusting the water temperature.",
        "By using a system of cranes and hoists.",
        "By precisely attaching weights and foam pieces to the suit.",
        "By increasing or decreasing the oxygen flow to the suit."
      ],
      correct: 2
    }
  ]

  const handleAnswer = (answerIndex) => {
    // Prevent multiple answers for the same question
    if (answers.length > currentQuestion) {
      return // Already answered this question
    }
    
    // Play sound effect based on correct/wrong answer
    if (answerIndex === questions[currentQuestion].correct) {
      playQuizCorrectSound()
    } else {
      playQuizWrongSound()
    }
    
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)
    console.log('Answer selected:', answerIndex, 'Total answers:', newAnswers.length)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 800)
    } else {
      console.log('Quiz completed! Setting quizCompleted to true')
      setTimeout(() => setQuizCompleted(true), 800)
    }
  }

  const calculateScore = () => {
    // Only calculate score for the first 10 answers
    const validAnswers = answers.slice(0, questions.length)
    return validAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct ? 1 : 0)
    }, 0)
  }

  const handleSubmit = () => {
    console.log('Submit button clicked!')
    console.log('Answers array:', answers)
    console.log('Answers length:', answers.length)
    const score = calculateScore()
    console.log('Calculated score:', score)
    
    setShowResults(true)
  }

  const handleLaunchRocket = () => {
    navigate('/rocket-launch')
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setQuizCompleted(false)
  }



  if (showResults) {
    const score = calculateScore()
    const passed = score > 2

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-space-black to-space-grey"
      >
        <div className="bg-space-grey bg-opacity-90 backdrop-blur-md rounded-2xl p-8 max-w-md mx-4 text-center border border-neon-blue border-opacity-30">
          <h2 className="text-3xl font-orbitron font-bold mb-6">
            {passed ? (
              <span className="gradient-text">Training Complete!</span>
            ) : (
              <span className="text-red-400">Training Failed</span>
            )}
          </h2>
          
          <div className="text-6xl mb-4">
            {passed ? "🎉" : "😞"}
          </div>
          
          <p className="text-xl font-rajdhani mb-6">
            Score: {score}/10
          </p>
          
          <p className="font-rajdhani text-gray-300 mb-8">
            {passed 
              ? "Excellent! You're ready for space mission."
              : "You need more than 2/10 to pass. Try again!"
            }
          </p>
          
          <motion.button
            whileHover={{ 
              scale: 1.08,
              boxShadow: passed ? "0 0 35px rgba(255, 102, 0, 0.8), 0 0 70px rgba(255, 0, 102, 0.5)" : "0 0 20px rgba(255, 0, 0, 0.6)",
              textShadow: "0 0 15px rgba(255, 255, 255, 1)"
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={playHoverSound}
            onClick={() => {
              playButtonClick()
              setTimeout(() => {
                if (passed) {
                  navigate('/license')
                } else {
                  handleRetry()
                }
              }, 100)
            }}
            className={`space-button ${passed ? 'btn-launch' : 'border-red-400 text-red-400 hover:bg-red-400'} relative overflow-hidden`}
            style={passed ? {
              background: 'linear-gradient(45deg, #ff6600, #ff0066, #ff3399)',
              backgroundSize: '300% 300%',
              animation: 'buttonGradient 3s ease infinite',
              border: '3px solid rgba(255, 102, 0, 0.6)',
              boxShadow: '0 0 25px rgba(255, 102, 0, 0.6)'
            } : {}}
          >
            <span className="relative z-10">{passed ? "🎖️ GET LICENSE" : "🔄 TRY AGAIN"}</span>
            {passed && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-15"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-space-black to-space-grey flex items-center justify-center px-4"
    >
      <div className="stars-bg fixed inset-0 opacity-20"></div>
      
      <div className="bg-space-grey bg-opacity-90 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-neon-blue border-opacity-30">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-orbitron text-neon-blue">Training Progress</span>
            <span className="font-rajdhani text-gray-300">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-space-black rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-orbitron font-bold text-white mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={playHoverSound}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 bg-space-black bg-opacity-50 rounded-lg border border-gray-600 hover:border-neon-blue transition-all duration-300 font-rajdhani text-lg"
                >
                  <span className="text-neon-blue font-bold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>


          </motion.div>
        </AnimatePresence>
        
        {/* Submit Button */}
        {quizCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={playHoverSound}
              onClick={() => {
                playButtonClick()
                setTimeout(handleSubmit, 100)
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-orbitron font-bold rounded-lg transition-all duration-300 border border-blue-400"
            >
              📋 SUBMIT RESULTS
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        </div>
      </div>
      

    </motion.div>
  )
}

export default Quiz