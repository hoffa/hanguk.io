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
            <div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="card-body">
                <h3 className="card-title text-xl font-bold text-primary">
                  {division.name}
                </h3>

                {/* Type Badge */}
                <div className="mb-2">
                  <span
                    className={`badge ${
                      division.type === '특별시' ||
                      division.type === '광역시' ||
                      division.type === '시'
                        ? 'badge-primary'
                        : division.type === '군'
                          ? 'badge-secondary'
                          : 'badge-accent'
                    }`}
                  >
                    {division.type}
                  </span>
                </div>

                {/* Population */}
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
