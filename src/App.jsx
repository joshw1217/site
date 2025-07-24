//import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Rsvp from './Rsvp'
import Wedding from './Wedding'
import Wow from './Wow'
import League from './League'

function App() {
  console.log('App component rendering');
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/rsvp" element={<Rsvp />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/wow" element={<Wow />} />
        <Route path="/league" element={<League />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  )
}

const LandingPage = () => {
  console.log('LandingPage component rendering');
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Component */}
      <Header />

      {/* Main Content - Two Columns */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Column */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-lg">
                <img 
                  src="/images/me.jpg" 
                  alt="Josh Wilson" 
                  className="w-full h-full object-cover object-center scale-150"
                />
              </div>
            </div>

            {/* Description Column */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl text-white font-bold text-gray-900 mb-6">
                Welcome!
              </h2>
              <p className="text-lg text-white text-gray-600 mb-8 leading-relaxed">
                I&apos;m Josh Wilson and I&apos;m a passionate developer who loves building things and solving problems. 
                When I&apos;m not coding, you can find me gaming with friends, spending time with my wife, or exploring and learning new technologies.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-gray-900 mb-2">Just Married!</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    I just got married to the love of my life, Yami, this June! 
                    Click below to visit the wedding site I built for us.
                  </p>
                  <a 
                    href="/wedding" 
                    className="inline-block bg-[#908277] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300 text-sm"
                  >
                    Visit Wedding Site
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Portfolio</h3>
              <ul className="space-y-2">
                <li><a href="/wedding" className="text-gray-300 hover:text-white transition-colors">Wedding</a></li>
                <li><a href="https://bluesky-eight-snowy.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Blue Sky Pet Supply</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Fun</h3>
              <ul className="space-y-2">
                <li><a href="/wow" className="text-gray-300 hover:text-white transition-colors">World of Warcraft</a></li>
                <li><a href="/league" className="text-gray-300 hover:text-white transition-colors">League of Legends</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="https://github.com/joshw1217" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/josh-g-wilson/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Josh Wilson. All rights reserved. | joshua.wilson70@yahoo.com | 801-654-3131</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
