#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import Ajv from 'ajv'

// Generated schema will be imported here
const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'District or city name in Korean',
      },
      city: {
        type: 'string',
        description: 'Province or metropolitan city name',
      },
      population: {
        type: 'number',
        description: 'Population count (must be positive)',
        minimum: 1,
      },
      type: {
        type: 'string',
        enum: ['구', '시'],
        description: 'District type - either 구 (gu) or 시 (si)',
      },
    },
    required: ['name', 'city', 'population', 'type'],
    additionalProperties: false,
  },
}

function validateJson() {
  try {
    // Read the data file
    const dataPath = path.join(process.cwd(), 'src', 'data.json')
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

    // Create AJV instance and compile schema
    const ajv = new Ajv({ allErrors: true })
    const validate = ajv.compile(schema)

    // Validate the data
    const valid = validate(jsonData)

    if (valid) {
      console.log('✅ JSON validation passed!')
      console.log(`📊 Found ${jsonData.length} districts`)

      // Show summary
      const summary = jsonData.reduce((acc, district) => {
        acc[district.type] = (acc[district.type] || 0) + 1
        return acc
      }, {})

      console.log('📈 Summary:', summary)
      process.exit(0)
    } else {
      console.error('❌ JSON validation failed:')
      validate.errors?.forEach(error => {
        console.error(`  • ${error.instancePath || 'root'}: ${error.message}`)
        if (error.data !== undefined) {
          console.error(`    Got: ${JSON.stringify(error.data)}`)
        }
      })
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error during validation:', error.message)
    process.exit(1)
  }
}

validateJson()
