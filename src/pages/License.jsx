import { useNavigate } from 'react-router-dom'

const License = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-space-black to-space-grey p-4">
      <div className="bg-white text-black rounded-lg p-10 max-w-2xl w-full border-8 border-yellow-400 shadow-2xl">
        {/* Certificate Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-3xl font-orbitron font-bold text-blue-900 mb-2">
            ASTRONAUT CERTIFICATION
          </h1>
          <div className="w-24 h-1 bg-blue-900 mx-auto mb-3"></div>
          <p className="text-base font-rajdhani text-gray-700">
            International Space Station Training Program
          </p>
        </div>

        {/* Certificate Body */}
        <div className="text-center mb-6">
          <p className="text-lg font-rajdhani mb-4">
            This certifies that
          </p>
          
          <div className="border-b-2 border-blue-900 pb-2 mb-4">
            <p className="text-xl font-orbitron font-bold text-blue-900">
              MISSION CANDIDATE
            </p>
          </div>
          
          <p className="text-base font-rajdhani mb-4 leading-relaxed">
            has successfully completed the ISS 25th Anniversary Training Program
            and is hereby authorized for space mission deployment.
          </p>
        </div>

        {/* Certificate Footer */}
        <div className="flex justify-between items-end mb-6">
          <div className="text-center">
            <div className="w-24 h-0.5 bg-black mb-1"></div>
            <p className="text-xs font-rajdhani">Mission Control</p>
            <p className="text-xs text-gray-600">NASA Space Apps 2025</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-1">🌍</div>
            <p className="text-xs text-gray-600">ISS 25th Anniversary</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-0.5 bg-black mb-1"></div>
            <p className="text-xs font-rajdhani">Date Issued</p>
            <p className="text-xs text-gray-600">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/launch-prep')}
            className="px-6 py-3 bg-blue-900 text-white font-orbitron font-bold rounded-lg hover:bg-blue-800 transition-colors"
          >
            CONTINUE TO LAUNCH
          </button>
        </div>
      </div>
    </div>
  )
}

export default License