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

    // Solo actualizamos si ha pasado una hora
    if (hoursSinceUpdate >= 1) {
      const getRandomIncrement = () => Math.floor(Math.random() * 4) + 1
      
      stats = await prisma.globalStats.update({
        where: { id: stats.id },
        data: {
          totalSum: { increment: getRandomIncrement() },
          chatUsage: { increment: getRandomIncrement() },
          writerUsage: { increment: getRandomIncrement() },
          searchUsage: { increment: getRandomIncrement() },
          translatorUsage: { increment: getRandomIncrement() },
          directoryUsage: { increment: getRandomIncrement() },
          creditsUsed: { increment: getRandomIncrement() },
          activeSubscribers: stats.activeSubscribers + (Math.random() < 0.1 ? 1 : 0),
          updatedAt: new Date()
        }
      })
    }

    // Siempre devolvemos los valores actuales de la DB
    return NextResponse.json({
      totalSum: Number(stats.totalSum),
      chatUsage: Number(stats.chatUsage),
      writerUsage: Number(stats.writerUsage),
      searchUsage: Number(stats.searchUsage),
      translatorUsage: Number(stats.translatorUsage),
      directoryUsage: Number(stats.directoryUsage),
      creditsUsed: Number(stats.creditsUsed),
      activeSubscribers: Number(stats.activeSubscribers)
    })

  } catch (error) {
    console.error("Error completo:", error)
    return NextResponse.json({ 
      error: "Error fetching stats", 
      details: error.message 
    }, { status: 500 })
  }
} 