// app/api/get-access-token/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'edge'

/**
 * Edge API route handler for HeyGen token generation
 */
export async function POST() {
  try {
    const apiKey = process.env.HEYGEN_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`HeyGen API Error: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('HeyGen token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
}