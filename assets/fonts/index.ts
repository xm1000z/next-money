import localFont from "next/font/local";
import { Inter as FontSans, Urbanist } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontUrban = Urbanist({
  subsets: ["latin"],
  variable: "--font-urban",
})

export const fontHeading = localFont({
  src: "./CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const fontSatoshi = localFont({
  src: "./satoshi-variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
  style: "normal",
});

export const appleGaramond = localFont({
  src: [
    {
      path: './AppleGaramond.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './AppleGaramond-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './AppleGaramond-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-apple-garamond',
})