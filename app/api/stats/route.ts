import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    let stats = await prisma.globalStats.findFirst()
    
    if (!stats) {
      stats = await prisma.globalStats.create({
        data: {
          totalSum: 7384,
          chatUsage: 2341,
          writerUsage: 1876,
          searchUsage: 1453,
          translatorUsage: 984,
          directoryUsage: 730,
          creditsUsed: 15384,
          activeSubscribers: 124
        }
      })
    }

    // Verificar si ha pasado una hora desde la última actualización
    const lastUpdate = new Date(stats.updatedAt)
    const hoursSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60)

    if (hoursSinceUpdate >= 1) {
      // Función para generar incremento aleatorio entre 1 y 4
      const getRandomIncrement = () => Math.floor(Math.random() * 4) + 1

      // Actualizar valores con incrementos aleatorios
      stats = await prisma.globalStats.update({
        where: { id: stats.id },
        data: {
          totalSum: stats.totalSum + getRandomIncrement(),
          chatUsage: stats.chatUsage + getRandomIncrement(),
          writerUsage: stats.writerUsage + getRandomIncrement(),
          searchUsage: stats.searchUsage + getRandomIncrement(),
          translatorUsage: stats.translatorUsage + getRandomIncrement(),
          directoryUsage: stats.directoryUsage + getRandomIncrement(),
          creditsUsed: stats.creditsUsed + getRandomIncrement(),
          activeSubscribers: stats.activeSubscribers + (Math.random() < 0.1 ? 1 : 0),
          updatedAt: new Date() // Actualizar el timestamp
        }
      })

      console.log("Valores actualizados después de una hora")
    } else {
      console.log(`Última actualización hace ${Math.round(hoursSinceUpdate * 60)} minutos`)
    }

    const response = {
      totalSum: Number(stats.totalSum),
      chatUsage: Number(stats.chatUsage),
      writerUsage: Number(stats.writerUsage),
      searchUsage: Number(stats.searchUsage),
      translatorUsage: Number(stats.translatorUsage),
      directoryUsage: Number(stats.directoryUsage),
      creditsUsed: Number(stats.creditsUsed),
      activeSubscribers: Number(stats.activeSubscribers)
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error completo:", error)
    return NextResponse.json({ 
      error: "Error fetching stats", 
      details: error.message 
    }, { status: 500 })
  }
} 