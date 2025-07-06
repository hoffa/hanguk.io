import koreanData from './data.json'
import type { Divisions } from './types'
import { shuffleArray } from './utils'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import DivisionCard from './DivisionCard'

function App() {
  const data = koreanData as Divisions
  const sortedDivisions = data.divisions.sort((a, b) => b.population - a.population)
  const [divisions, setDivisions] = useState(sortedDivisions)

  const randomizeOrder = () => {
    setDivisions(shuffleArray(divisions))
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Navigation - Full Width */}
      <div className="navbar bg-base-100 shadow-sm px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div>
            <span className="text-xl font-bold">어디 가지?</span>
          </div>
          <div className="flex gap-2">
            <button onClick={randomizeOrder} className="btn btn-primary">
              🎲 순서 섞기
            </button>
            <a
              href="https://github.com/hoffa/hanguk.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <CodeBracketIcon className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pt-6 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {divisions.map((division, index) => (
              <DivisionCard key={index} division={division} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
