"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export function UpgradeCard() {
  const [remainingCredits, setRemainingCredits] = useState(0)
  const [totalCredits, setTotalCredits] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchCredits = async () => {
      setIsLoading(true)
      const response = await fetch('/api/account')
      const data = await response.json()
      setRemainingCredits(data.credit || 0)
      setTotalCredits(data.total || 0)
      setIsLoading(false)
    }
    fetchCredits()
  }, [])

  const creditPercentage = totalCredits > 0 ? (remainingCredits / totalCredits) * 100 : 0

  const handleBuyCredits = () => {
    router.push('/pricing')
  }

  return (
    <div className="p-4 rounded-lg border border-[rgba(27,27,27,0.18)] dark:border-[rgba(185,185,185,0.17)] bg-[#ececec] dark:bg-[#1b1b1b] shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Créditos</h3>
      <div className="mb-4">
        <Progress value={creditPercentage} className="h-2" />
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {remainingCredits} de {totalCredits} créditos restantes
        </p>
      </div>
      <Button
        onClick={handleBuyCredits}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando
          </>
        ) : (
          'Comprar más créditos'
        )}
      </Button>
    </div>
  )
}

