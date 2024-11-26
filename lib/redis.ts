import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const CACHE_TTL = 60 * 5 // 5 minutos

export async function getCachedSubscription(userId: string) {
  const cacheKey = `subscription:${userId}`
  
  // Intentar obtener del caché
  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached as string)
  }

  // Si no está en caché, obtener de la base de datos
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
    include: {
      // Incluir relaciones necesarias
      transactions: {
        take: 5,
        orderBy: { createdAt: 'desc' }
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

// Función para invalidar el caché cuando hay cambios
export async function invalidateSubscriptionCache(userId: string) {
  const cacheKey = `subscription:${userId}`
  await redis.del(cacheKey)
}
