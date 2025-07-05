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
          <h1 className="text-4xl font-bold text-primary mb-2">
            한국 구/시 정보
          </h1>
          <p className="text-base-content/70 text-lg">
            Korean Districts & Cities Information
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {divisions.map((division, index) => (
            <div key={index} className="card bg-base-100 w-96 shadow-lg">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {division.name}
                  <div className="badge badge-soft badge-accent">
                    {division.type}
                  </div>
                </h2>

                <div className="text-base-content">
                  <span className="text-sm text-base-content/70">인구: </span>
                  <span className="font-semibold text-success">
                    약{' '}
                    {formatKoreanNumber(roundToFirstDigit(division.population))}{' '}
                    명
                  </span>
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
