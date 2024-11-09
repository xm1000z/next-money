'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

interface Stats {
  totalSum: number
  businessCount: number
  transactionCount: number
}

export function Ticker() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    // Carga inicial
    fetchStats()

    // Actualización cada hora
    const interval = setInterval(fetchStats, 3600000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    const response = await fetch('/api/stats')
    const data = await response.json()
    setStats(data)
  }

  if (!stats) return null

  return (
    <div className="text-center flex flex-col mt-[120px] md:mt-[280px] mb-[120px] md:mb-[250px] space-y-4 md:space-y-10">
      <span className="font-medium font-mono text-center text-[40px] md:text-[80px] lg:text-[100px] xl:text-[130px] 2xl:text-[160px] md:mb-2 text-stroke leading-none text-gray-900 dark:text-white">
        {Intl.NumberFormat("es-ES", {
          maximumFractionDigits: 0,
        }).format(stats.totalSum)}
      </span>
      <span className="text-gray-600 dark:text-[#878787]">
        Visitantes
      </span>
    </div>
  );
}