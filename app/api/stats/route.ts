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
          directoryUsage: 730
        }
      })
    }

    // Incrementar aleatoriamente entre 1-4
    const increment = Math.floor(Math.random() * 4) + 1
    
    stats = await prisma.globalStats.update({
      where: { id: stats.id },
      data: {
        totalSum: stats.totalSum + increment,
        chatUsage: stats.chatUsage + increment,
        writerUsage: stats.writerUsage + increment,
        searchUsage: stats.searchUsage + increment,
        translatorUsage: stats.translatorUsage + increment,
        directoryUsage: stats.directoryUsage + increment
      }
    })

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching stats" }, { status: 500 })
  }
} 