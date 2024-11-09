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
      console.log("Datos recibidos:", data) // Debug
      
      // Verificar que totalSum es un número
      if (typeof data.totalSum !== 'number') {
        console.error('totalSum no es un número:', data.totalSum)
        return
      }

      setStats(data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  if (!stats) {
    console.log("Stats es null") // Debug
    return null
  }

  console.log("Renderizando con stats:", stats) // Debug

  return (
    <div className="text-center flex flex-col mt-[120px] md:mt-[280px] mb-[120px] md:mb-[250px] space-y-4 md:space-y-10">
      <span className="font-medium font-mono text-center text-[40px] md:text-[80px] lg:text-[100px] xl:text-[130px] 2xl:text-[160px] md:mb-2 leading-none text-transparent dark:text-transparent [text-shadow:none] [-webkit-text-stroke:1px_#000] dark:[-webkit-text-stroke:1px_#fff]">
        {stats.totalSum ? 
          Intl.NumberFormat("es-ES", {
            maximumFractionDigits: 0,
          }).format(stats.totalSum)
          : 'Cargando...'
        }
      </span>
      <span className="text-gray-600 dark:text-[#878787]">
        Visitantes
      </span>
    </div>
  )
}