import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    let stats = await prisma.globalStats.findFirst()
    
    if (!stats) {
      stats = await prisma.globalStats.create({
        data: {
          totalSum: 1000000,
          businessCount: 500,
          transactionCount: 2000
        }
      })
    }

    // Incrementar aleatoriamente entre 1-4
    const increment = Math.floor(Math.random() * 4) + 1
    
    stats = await prisma.globalStats.update({
      where: { id: stats.id },
      data: {
        totalSum: stats.totalSum + increment,
        businessCount: stats.businessCount + increment,
        transactionCount: stats.transactionCount + increment
      }
    })

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching stats" }, { status: 500 })
  }
} 