import './App.css'
import koreanData from './data.json'
import type { KoreanDistricts } from './types'
import { roundToFirstDigit, formatKoreanNumber } from './utils'

function App() {
  const districts = koreanData as KoreanDistricts

  return (
    <div className="app">
      <h1>한국 구/시 정보</h1>
      <p>Korean Districts & Cities Information</p>

      <div className="districts-grid">
        {districts.map((district, index) => (
          <div key={index} className="district-card">
            <h3>{district.name}</h3>
            <p className="city">{district.city}</p>
            <p className="population">
              인구: {formatKoreanNumber(roundToFirstDigit(district.population))}
              명
            </p>
            <span className="type">{district.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
