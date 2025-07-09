import koreanData from './data.json'
import type { Divisions } from './types'
import { sortByDistance } from './utils'
import {
  CodeBracketIcon,
  MapPinIcon,
  Bars3BottomLeftIcon,
  XMarkIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import DivisionCard from './DivisionCard'

function App() {
  const data = koreanData as Divisions
  const sortedDivisions = data.divisions.sort((a, b) => b.population - a.population)
  const [divisions, setDivisions] = useState(sortedDivisions)
  const [appliedLocation, setAppliedLocation] = useState<string | null>(null)
  const [locationInput, setLocationInput] = useState('')

  const pickRandom = () => {
    const randomDivision = sortedDivisions[Math.floor(Math.random() * sortedDivisions.length)]
    selectDivision(randomDivision.name)
  }

  const selectDivision = (divisionName: string) => {
    setLocationInput(divisionName)
    setAppliedLocation(divisionName)

    // Find the selected division
    const selectedDivision = data.divisions.find(d => d.name === divisionName)
    if (selectedDivision) {
      // Sort by distance from the selected division
      setDivisions(sortByDistance(sortedDivisions, selectedDivision))
    } else {
      // Fallback to original order if division not found
      setDivisions([...sortedDivisions])
    }

    // Smooth scroll to top to show the reordered results
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleInputChange = (value: string) => {
    setLocationInput(value)

    // Only reset when completely cleared
    if (!value) {
      setAppliedLocation(null)
      setDivisions([...sortedDivisions])
    }
    // Don't auto-select here - let Combobox handle selection
  }

  const clearSelection = () => {
    setLocationInput('')
    setAppliedLocation(null)
    setDivisions(sortedDivisions)
  }

  const filteredSuggestions = locationInput
    ? data.divisions
        .filter(d => d.name.toLowerCase().includes(locationInput.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name, 'ko'))
        .slice(0, 5)
    : []

  const isValidInput = data.divisions.some(d => d.name === locationInput)

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Navigation - Full Width */}
      <div className="navbar bg-base-100 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto w-full">
          {/* Mobile: Stack vertically with full-width input */}
          <div className="flex flex-col gap-4 w-full sm:hidden">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">한국 어디 가지? 🤔</span>
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
              <div className="relative flex-1">
                <Combobox value={locationInput} onChange={selectDivision}>
                  <div className="relative">
                    <label
                      className={`input input-bordered w-full flex items-center gap-2 ${
                        locationInput && !isValidInput ? 'input-error' : ''
                      }`}
                    >
                      <span className="label">
                        <MapPinIcon className="w-4 h-4" />
                      </span>
                      <ComboboxInput
                        className="grow bg-transparent border-none outline-none"
                        placeholder="지역 입력"
                        onChange={e => handleInputChange(e.target.value)}
                      />
                      {locationInput && (
                        <button
                          onClick={clearSelection}
                          className="text-base-content/40 hover:text-base-content/80 cursor-pointer"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      )}
                    </label>
                    {filteredSuggestions.length > 0 && (
                      <ComboboxOptions className="absolute top-full left-0 right-0 z-10 bg-base-100 border border-base-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                        {filteredSuggestions.map(division => (
                          <ComboboxOption
                            key={division.id}
                            value={division.name}
                            className={({ active }) =>
                              `px-3 py-2 cursor-pointer text-sm ${active ? 'bg-base-200' : ''}`
                            }
                          >
                            {division.name}
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    )}
                  </div>
                </Combobox>
              </div>
              <button onClick={pickRandom} className="btn btn-primary">
                <ArrowPathIcon className="w-4 h-4" />
                랜덤 선택
              </button>
            </div>
          </div>

          {/* Desktop: Single row layout */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-4 w-full">
            <div className="mr-auto order-1">
              <span className="text-xl font-bold">한국 어디 가지? 🤔</span>
            </div>

            {/* Center: Filters */}
            <div className="flex items-center gap-4 order-2">
              <div className="relative">
                <Combobox value={locationInput} onChange={selectDivision}>
                  <div className="relative">
                    <label
                      className={`input input-bordered w-48 flex items-center gap-2 ${
                        locationInput && !isValidInput ? 'input-error' : ''
                      }`}
                    >
                      <span className="label">
                        <MapPinIcon className="w-4 h-4" />
                      </span>
                      <ComboboxInput
                        className="grow bg-transparent border-none outline-none"
                        placeholder="지역 입력"
                        onChange={e => handleInputChange(e.target.value)}
                      />
                      {locationInput && (
                        <button
                          onClick={clearSelection}
                          className="text-base-content/40 hover:text-base-content/80 cursor-pointer"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      )}
                    </label>
                    {filteredSuggestions.length > 0 && (
                      <ComboboxOptions className="absolute top-full left-0 right-0 z-10 bg-base-100 border border-base-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                        {filteredSuggestions.map(division => (
                          <ComboboxOption
                            key={division.id}
                            value={division.name}
                            className={({ active }) =>
                              `px-3 py-2 cursor-pointer text-sm ${active ? 'bg-base-200' : ''}`
                            }
                          >
                            {division.name}
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    )}
                  </div>
                </Combobox>
              </div>
              <button onClick={pickRandom} className="btn btn-primary">
                <ArrowPathIcon className="w-4 h-4" />
                랜덤 선택
              </button>
            </div>

            <div className="flex gap-2 ml-auto order-3">
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

      {/* Main Content */}
      <div className="px-6 pt-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 flex items-center gap-2 text-sm text-base-content/60">
            <Bars3BottomLeftIcon className="w-4 h-4" />
            {appliedLocation ? `${appliedLocation} 인접순 정렬` : '인구순 정렬'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {divisions.map((division, index) => (
              <div
                key={index}
                onClick={e => {
                  // Don't trigger card click if clicking on a link
                  if ((e.target as HTMLElement).closest('a')) {
                    return
                  }

                  // Only trigger card click if user isn't selecting text
                  const selection = window.getSelection()
                  if (!selection || selection.toString().length === 0) {
                    selectDivision(division.name)
                  }
                }}
                className="cursor-pointer transition-transform duration-200 hover:scale-105 select-text"
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
