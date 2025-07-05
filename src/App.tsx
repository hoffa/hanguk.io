import './App.css'
import koreanData from './data.json'
import type { Divisions } from './types'
import { roundToFirstDigit, formatKoreanNumber } from './utils'

function App() {
  const data = koreanData as Divisions
  const divisions = data.divisions

  return (
    <div className="app">
      <h1>한국 구/시 정보</h1>
      <p>Korean Districts & Cities Information</p>

      <div className="districts-grid">
        {divisions.map((division, index) => (
          <div key={index} className="district-card">
            <h3>{division.name}</h3>
            <span>{division.type}</span>
            <p className="population">
              약 {formatKoreanNumber(roundToFirstDigit(division.population))} 명
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
