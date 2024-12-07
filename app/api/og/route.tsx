import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // Reducir las importaciones de fuentes
    const interRegular = await fetch(
      new URL('./Inter-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: '40px',
          }}
        >
          <h1 style={{ fontSize: 60 }}>Mi App</h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interRegular,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    );
  } catch (e) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
