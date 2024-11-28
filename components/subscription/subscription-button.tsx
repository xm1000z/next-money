'use client';

import React from 'react';

interface SubscriptionButtonProps {
  isPaid: boolean;
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ isPaid }) => {
  const handleClick = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = data.url; // Redirige al usuario al portal de Stripe
      } else {
        console.error('Error al crear la sesión del portal:', data.error);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  return (
    <button onClick={handleClick} className="btn">
      {isPaid ? "Gestionar Suscripción" : "Suscribirse"}
    </button>
  );
}; 