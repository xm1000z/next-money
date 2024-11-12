'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

interface Stats {
  totalSum: number
  chatUsage: number
  writerUsage: number
  searchUsage: number
  translatorUsage: number
  directoryUsage: number
  creditsUsed: number
  activeSubscribers: number
}

export function Ticker() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 3600000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  if (!stats) return null

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[100px] md:mt-[160px]">
        {/* Visitantes */}
        <div className="text-center flex flex-col space-y-4">
          <span className="font-medium font-mono text-center text-[50px] md:text-[80px] lg:text-[90px] xl:text-[100px] leading-none text-black dark:text-white [text-shadow:-1px_1px_0_#fff,1px_1px_0_#fff,1px_-1px_0_#fff,-1px_-1px_0_#fff] dark:[text-shadow:-1px_1px_0_#000,1px_1px_0_#000,1px_-1px_0_#000,-1px_-1px_0_#000]">
            {Intl.NumberFormat("en-US", {
              maximumFractionDigits: 0,
            }).format(stats.totalSum)}
          </span>
          <span className="text-gray-600 dark:text-[#878787] text-lg">
            Visitas totales
          </span>
        </div>

        {/* Créditos Usados */}
        <div className="text-center flex flex-col space-y-4">
          <span className="font-medium font-mono text-center text-[50px] md:text-[80px] lg:text-[90px] xl:text-[100px] leading-none text-black dark:text-white [text-shadow:-1px_1px_0_#fff,1px_1px_0_#fff,1px_-1px_0_#fff,-1px_-1px_0_#fff] dark:[text-shadow:-1px_1px_0_#000,1px_1px_0_#000,1px_-1px_0_#000,-1px_-1px_0_#000]">
            {Intl.NumberFormat("en-US", {
              maximumFractionDigits: 0,
            }).format(stats.creditsUsed)}
          </span>
          <span className="text-gray-600 dark:text-[#878787] text-lg">
            Créditos usados
          </span>
        </div>

        {/* Suscriptores Activos */}
        <div className="text-center flex flex-col space-y-4">
          <span className="font-medium font-mono text-center text-[50px] md:text-[80px] lg:text-[90px] xl:text-[100px] leading-none text-black dark:text-white [text-shadow:-1px_1px_0_#fff,1px_1px_0_#fff,1px_-1px_0_#fff,-1px_-1px_0_#fff] dark:[text-shadow:-1px_1px_0_#000,1px_1px_0_#000,1px_-1px_0_#000,-1px_-1px_0_#000]">
            {Intl.NumberFormat("en-US", {
              maximumFractionDigits: 0,
            }).format(stats.activeSubscribers)}
          </span>
          <span className="text-gray-600 dark:text-[#878787] text-lg">
            Clientes Activos
          </span>
        </div>
      </div>

      <div className="text-center mt-8 mb-8">
        <span className="text-sm text-gray-500 dark:text-[#878787]">
          NotasAI es una startup transparente. Consulta nuestras{" "}
          <Link href="/startup" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            métricas.
          </Link>
        </span>
      </div>
    </div>
  )
}