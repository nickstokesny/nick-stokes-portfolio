import type React from "react"
import "./basic.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nick Stokes Photography",
  description: "Portfolio of photographer Nick Stokes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
