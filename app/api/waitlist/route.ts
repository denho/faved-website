import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

// Configure Airtable
const airtableApiKey = process.env.AIRTABLE_API_KEY
const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableTableName = process.env.AIRTABLE_TABLE_NAME || 'Waitlist'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email } = body

    // Validate input
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Check if Airtable is configured
    if (!airtableApiKey || !airtableBaseId) {
      console.error('Airtable configuration missing')
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    // Initialize Airtable
    const base = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId)

    // Check if email already exists
    const existingRecords = await base(airtableTableName)
      .select({
        filterByFormula: `LOWER({Email}) = LOWER('${email.replace(/'/g, "\\'")}')`,
        maxRecords: 1,
      })
      .firstPage()

    if (existingRecords.length > 0) {
      return NextResponse.json({ error: 'This email is already on the waitlist' }, { status: 400 })
    }

    // Create new record in Airtable
    await base(airtableTableName).create([
      {
        fields: {
          Name: name,
          Email: email,
          Timestamp: new Date().toISOString(),
        },
      },
    ])

    return NextResponse.json({ message: 'Successfully joined the waitlist' }, { status: 200 })
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}
