import koreanData from './data.json'
import type { Divisions } from './types'
import { roundToFirstDigit, formatKoreanNumber, getHumanFriendlyDomain } from './utils'
import { UserIcon, BuildingOfficeIcon, MapIcon, LinkIcon } from '@heroicons/react/24/outline'

function App() {
  const data = koreanData as Divisions
  const divisions = data.divisions

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold my-2">한국 어디 가지?</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division, index) => (
            <div key={index} className="card bg-base-100 shadow-sm">
              <figure>
                <img
                  src={division.image || 'https://placecats.com/800/600'}
                  alt={division.name}
                  className="w-full aspect-[4/3] object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="card-title">{division.name}</h2>
                </div>

                <ul className="list-disc list-inside mb-4">
                  {division.highlights?.map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>{highlight}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base-content/70">
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    {formatKoreanNumber(roundToFirstDigit(division.population))} 명
                  </div>
                  <div className="flex items-center gap-1">
                    <MapIcon className="w-4 h-4" />
                    {Math.round(division.area).toLocaleString()} km²
                  </div>
                  <div className="flex items-center gap-1">
                    <BuildingOfficeIcon className="w-4 h-4" />
                    {division.type}
                  </div>
                  {division.link && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <a href={division.link} target="_blank" rel="noopener noreferrer">
                        {getHumanFriendlyDomain(division.link)}
                      </a>
                    </div>
                  )}
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
