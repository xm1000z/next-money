import { Redis } from '@upstash/redis'
import { prisma } from '@/db/prisma'
import { Ratelimit } from '@upstash/ratelimit'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const CACHE_TTL = 60 * 5 // 5 minutos

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '10 s'),
  analytics: true,
})

export async function getCachedSubscription(userId: string) {
  const cacheKey = `subscription:${userId}`
  
  // Intentar obtener del caché
  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached as string)
  }

  // Si no está en caché, obtener de la base de datos
  const subscription = await prisma.subscription.findFirst({
    where: { 
      userId,
      status: 'active',
      currentPeriodEnd: {
        gt: new Date()
      }
    }
  })

  if (subscription) {
    // Guardar en caché
    await redis.set(cacheKey, JSON.stringify(subscription), {
      ex: CACHE_TTL
    })
  }

  return subscription
}

export async function invalidateSubscriptionCache(userId: string) {
  const cacheKey = `subscription:${userId}`
  await redis.del(cacheKey)
}
