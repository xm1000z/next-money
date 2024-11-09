import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Buscar stats existentes
    let stats = await prisma.globalStats.findFirst()
    
    console.log("Stats encontrados en DB:", stats)

    // Si no hay stats en la DB, crear valores iniciales
    if (!stats) {
      console.log("No se encontraron stats, creando valores iniciales")
      stats = await prisma.globalStats.create({
        data: {
          totalSum: 7384,        // Valores iniciales por defecto
          chatUsage: 2341,       // solo se usan si la DB está vacía
          writerUsage: 1876,
          searchUsage: 1453,
          translatorUsage: 984,
          directoryUsage: 730,
          creditsUsed: 15384,      // Valor inicial de créditos
          activeSubscribers: 124   // Valor inicial de suscriptores
        }
      })
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

    console.log("Enviando respuesta:", response)

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error completo:", error)
    return NextResponse.json({ 
      error: "Error fetching stats", 
      details: error.message 
    }, { status: 500 })
  }
} 