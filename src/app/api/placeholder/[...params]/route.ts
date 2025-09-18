import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  try {
    const { params: routeParams } = await params
    const [width, height] = routeParams
    
    if (!width || !height) {
      return new NextResponse('Width and height required', { status: 400 })
    }

    const w = parseInt(width)
    const h = parseInt(height)
    
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      return new NextResponse('Invalid dimensions', { status: 400 })
    }

    // Создаем простое SVG изображение как placeholder
    const svg = `
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af">
          ${w} × ${h}
        </text>
      </svg>
    `

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Error generating placeholder:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
