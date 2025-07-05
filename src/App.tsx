import koreanData from './data.json'
import type { Divisions } from './types'
import { roundToFirstDigit, formatKoreanNumber } from './utils'

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
                <h2 className="card-title">{division.name}</h2>

                <div className="flex gap-2 mb-3">
                  <div className="badge badge-primary">{division.type}</div>
                  <div className="badge badge-secondary">
                    {formatKoreanNumber(roundToFirstDigit(division.population))} 명
                  </div>
                </div>

                <ul className="list-disc list-inside text-sm">
                  {division.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
