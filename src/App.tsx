import koreanData from './data.json'
import type { Divisions } from './types'
import { roundToFirstDigit, formatKoreanNumber } from './utils'
import { UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

function App() {
  const data = koreanData as Divisions
  const divisions = data.divisions

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">한국 어디 가지?</h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division, index) => (
            <div key={index} className="card bg-base-100 shadow">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt={division.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title mb-3">{division.name}</h2>

                <ul className="list-disc list-inside text-sm mb-4">
                  {division.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>{highlight}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 text-sm text-base-content/70">
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    {formatKoreanNumber(roundToFirstDigit(division.population))}
                  </div>
                  <div className="flex items-center gap-1">
                    <BuildingOfficeIcon className="w-4 h-4" />
                    {division.type}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
