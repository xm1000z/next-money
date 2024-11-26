export default async function SubscriptionPage() {
  const subscription = await getSubscription() // Obtener suscripción actual
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Suscripción</h3>
        <p className="text-sm text-muted-foreground">
          Gestiona tu plan de suscripción y créditos mensuales
        </p>
      </div>
      
      <SubscriptionInfo subscription={subscription} />
      <SubscriptionPlans currentPlan={subscription?.planId} />
    </div>
  )
} 