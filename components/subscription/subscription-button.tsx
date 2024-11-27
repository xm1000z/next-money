'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionButtonProps {
  isPaid: boolean;
}

export function SubscriptionButton({ isPaid }: SubscriptionButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleUpgrade = () => {
    router.push('/pricing');
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error al abrir el portal de gestión:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo abrir el portal de gestión. Por favor, inténtalo de nuevo.",
      });
    }
  };

  if (isPaid) {
    return (
      <Button 
        variant="outline"
        className="w-full"
        onClick={handleManageSubscription}
      >
        Gestionar Suscripción
      </Button>
    );
  }

  return (
    <Button 
      className="w-full"
      onClick={handleUpgrade}
    >
      Actualizar a Plan de Pago
    </Button>
  );
} 