import koreanData from './data.json'
import type { Divisions } from './types'
import { shuffleArray } from './utils'
import { CodeBracketIcon, MapPinIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import DivisionCard from './DivisionCard'

function App() {
  const data = koreanData as Divisions
  const sortedDivisions = data.divisions.sort((a, b) => b.population - a.population)
  const [divisions, setDivisions] = useState(sortedDivisions)
  const [, setSelectedLocation] = useState<string | null>(null)
  const [locationInput, setLocationInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const pickRandom = () => {
    const randomDivision = sortedDivisions[Math.floor(Math.random() * sortedDivisions.length)]
    setSelectedLocation(randomDivision.name)
    setLocationInput(randomDivision.name)
    setShowSuggestions(false)
    // TODO: Later this will automatically sort by distance from the selected location
  }

  const handleLocationInputChange = (value: string) => {
    setLocationInput(value)
    setShowSuggestions(value.length > 0)

    // Check if the input exactly matches a division name
    const exactMatch = data.divisions.find(d => d.name === value)
    if (exactMatch) {
      setSelectedLocation(value)
    } else {
      setSelectedLocation(null)
      if (!value) {
        setDivisions(sortedDivisions) // Reset when input is cleared
      }
    }
  }

  const selectDivision = (divisionName: string) => {
    setLocationInput(divisionName)
    setSelectedLocation(divisionName)
    setShowSuggestions(false)
    // TODO: Replace with distance-based sorting when coordinates are available
    // For now, shuffle to simulate reordering
    setDivisions(shuffleArray([...sortedDivisions]))
    // Smooth scroll to top to show the reordered results
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredSuggestions = data.divisions
    .filter(d => d.name.toLowerCase().includes(locationInput.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'))
    .slice(0, 5) // Limit to 5 suggestions

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Navigation - Full Width */}
      <div className="navbar bg-base-100 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto w-full">
          {/* Top row: Title and main actions */}
          <div className="flex items-center justify-between w-full mb-3">
            <div>
              <span className="text-xl font-bold">한국 어디 가지? 🤔</span>
            </div>
            <div className="flex gap-2">
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

          {/* Bottom row: Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <div className="relative flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-primary" />
              <div className="relative">
                <input
                  type="text"
                  className="input input-sm input-bordered w-40"
                  placeholder="지역 입력"
                  value={locationInput}
                  onChange={e => handleLocationInputChange(e.target.value)}
                  onFocus={() => setShowSuggestions(locationInput.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-10 bg-base-100 border border-base-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredSuggestions.map(division => (
                      <div
                        key={division.name}
                        className="px-3 py-2 hover:bg-base-200 cursor-pointer text-sm"
                        onMouseDown={() => selectDivision(division.name)}
                      >
                        {division.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button onClick={pickRandom} className="btn btn-sm btn-primary">
              랜덤 선택
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pt-6 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 flex items-center gap-2 text-sm text-base-content/60">
            <Bars3BottomLeftIcon className="w-4 h-4" />
            {locationInput ? `${locationInput} 인접순 정렬` : '인구순 정렬'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {divisions.map((division, index) => (
              <div
                key={index}
                onClick={() => selectDivision(division.name)}
                className="cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg"
              >
                <DivisionCard division={division} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
