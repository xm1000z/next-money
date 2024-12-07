import { ImageResponse } from "@vercel/og"
import { ogImageSchema } from "@/lib/validations/og"

export const runtime = "edge"

const interRegular = fetch(
  new URL("../../../assets/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: Request) {
  try {
    const fontRegular = await interRegular
    
    const url = new URL(req.url)
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams))
    const heading = values.heading.length > 80
      ? `${values.heading.substring(0, 100)}...` 
      : values.heading

    const { mode } = values
    const paint = mode === "dark" ? "#fff" : "#000"
    const fontSize = heading.length > 80 ? "60px" : "80px"
    const githubName = "mickasmt"

    return new ImageResponse(
      (
        <div tw="flex relative flex-col p-12 w-full h-full items-start" 
          style={{
            color: paint,
            background: mode === "dark" ? "#000" : "white",
          }}>
          <div tw="text-5xl font-bold" style={{
            background: "linear-gradient(90deg, #6366f1, #a855f7 80%)",
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            SaaS Starter
          </div>

          <div tw="flex flex-col flex-1 py-16">
            {/* Type : Blog or Doc */}
            <div
              tw="flex text-xl uppercase font-bold tracking-tight"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              {values.type}
            </div>
            {/* Title */}
            <div
              tw="flex leading-[1.15] text-[80px] font-bold"
              style={{
                fontFamily: "Cal Sans",
                fontWeight: "bold",
                marginLeft: "-3px",
                fontSize,
              }}
            >
              {heading}
            </div>
          </div>

          <div tw="flex items-center w-full justify-between">
            <div tw="flex items-center text-xl">
              <img
                alt="avatar" 
                width="65"
                src={`https://github.com/${githubName}.png`}
                style={{ borderRadius: 128 }}
              />
              <div tw="flex flex-col ml-4">
                <div tw="text-[22px] font-bold">{githubName}</div>
                <div>Open Source Designer</div>
              </div>
            </div>

            <div tw="flex items-center text-xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill={paint}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.43 9.8 8.2 11.37.6.11.82-.26.82-.58v-2.03c-3.34.73-4.03-1.61-4.03-1.61-.54-1.37-1.33-1.74-1.33-1.74-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
              <div tw="ml-2">github.com/mickasmt/next-saas-stripe-starter</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontRegular,
            weight: 400,
            style: "normal",
          }
        ],
      }
    )
  } catch (error) {
    return new Response(`Failed to generate image`, { status: 500 })
  }
}
