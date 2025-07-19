import koreanData from './data.json'
import type { Divisions } from './types'
import { sortByDistance } from './utils'
import { CodeBracketIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import ReactKakaoMap from './ReactKakaoMap'
import { useState, useEffect, useMemo } from 'react'
import DivisionCard from './DivisionCard'

function App() {
  const data = koreanData as Divisions
  const sortedDivisions = data.divisions.sort((a, b) => b.population - a.population)

  // Build divisionMap and check for duplicate ids, memoized
  const divisionMap = useMemo(() => {
    const map: Record<number, (typeof sortedDivisions)[0]> = {}
    for (const division of sortedDivisions) {
      if (map[division.id]) {
        throw new Error(`Duplicate division id found: ${division.id}`)
      }
      map[division.id] = division
    }
    return map
  }, [sortedDivisions])

  const [selectedDivisionId, setSelectedDivisionId] = useState<number>(() => {
    // Pick a random division on initial load
    const random = sortedDivisions[Math.floor(Math.random() * sortedDivisions.length)]
    return random.id
  })
  const [divisions, setDivisions] = useState(() => {
    const initialDivision = divisionMap[selectedDivisionId]
    return initialDivision ? sortByDistance(sortedDivisions, initialDivision) : sortedDivisions
  })

  useEffect(() => {
    const division = divisionMap[selectedDivisionId]
    if (division) {
      setDivisions(sortByDistance(sortedDivisions, division))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedDivisionId, divisionMap, sortedDivisions])

  return (
    <div className="min-h-screen bg-base-200 relative">
      <div className="navbar bg-base-100 shadow-sm px-6 py-4 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-4 w-full sm:hidden">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold flex items-center gap-3">
                한국 어디 가지?
                <span className="badge badge-error">베타</span>
              </span>
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
            <div className="flex items-center gap-4">
              <select
                className="select w-full"
                value={selectedDivisionId}
                onChange={e => setSelectedDivisionId(Number(e.target.value))}
              >
                {data.divisions.map(division => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const ids = Object.keys(divisionMap)
                  const randomId = Number(ids[Math.floor(Math.random() * ids.length)])
                  setSelectedDivisionId(randomId)
                }}
              >
                랜덤 선택
              </button>
            </div>
          </div>
          <div className="hidden sm:flex items-center w-full gap-4">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold flex items-center gap-3">
                한국 어디 가지?
                <span className="badge badge-error">베타</span>
              </span>
            </div>
            <div className="flex flex-1 items-center gap-4 justify-center min-w-0">
              <select
                className="select min-w-[140px] max-w-[220px] w-full"
                value={selectedDivisionId}
                onChange={e => setSelectedDivisionId(Number(e.target.value))}
              >
                {data.divisions.map(division => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary flex-shrink-0"
                onClick={() => {
                  const ids = Object.keys(divisionMap)
                  const randomId = Number(ids[Math.floor(Math.random() * ids.length)])
                  setSelectedDivisionId(randomId)
                }}
              >
                랜덤 선택
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
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
      </div>
      <div className="flex flex-col lg:flex-row gap-0 mt-[64px] h-[calc(100vh-64px)]">
        {/* Map: top half on mobile, left half on desktop */}
        <div className="flex-1 lg:w-1/2 bg-base-300" style={{ padding: 0, margin: 0 }}>
          <ReactKakaoMap
            lat={divisionMap[selectedDivisionId].lat}
            lon={divisionMap[selectedDivisionId].lon}
            style={{ width: '100%', height: '100%', borderRadius: 0, margin: 0 }}
          />
        </div>
        {/* Cards: bottom half on mobile, right half on desktop */}
        <div className="flex-1 lg:flex-1 overflow-y-auto px-6 pt-4 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-start">
              {divisions.map((division, index) => (
                <div
                  key={index}
                  className="cursor-pointer transition-transform duration-200 hover:scale-105 select-text"
                >
                  <DivisionCard division={division} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
