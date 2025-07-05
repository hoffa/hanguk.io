import './App.css'
import koreanData from './data.json'
import { z } from 'zod'

// Define the schema for validation
const DistrictSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  city: z.string().min(1, 'City is required'),
  population: z.number().positive('Population must be positive'),
  type: z.enum(['구', '시'], { message: 'Type must be either 구 or 시' }),
})

const DistrictsSchema = z.array(DistrictSchema)

type District = z.infer<typeof DistrictSchema>

function App() {
  // Validate the JSON data at runtime
  let districts: District[] = []
  let validationError: string | null = null

  try {
    districts = DistrictsSchema.parse(koreanData)
    console.log('✅ JSON data is valid!')
  } catch (error) {
    if (error instanceof z.ZodError) {
      validationError = error.issues
        .map(issue => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ')
      console.error('❌ JSON validation failed:', validationError)
    }
  }

  if (validationError) {
    return (
      <div className="app">
        <h1>Data Validation Error</h1>
        <div style={{ color: 'red', padding: '1rem', background: '#ffe6e6' }}>
          {validationError}
        </div>
      </div>
    )
  }

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
              인구: {district.population.toLocaleString()}명
            </p>
            <span className="type">{district.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
