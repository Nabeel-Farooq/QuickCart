'use client'

import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'

const REDIRECT_DELAY = 5000

const OrderPlaced = () => {
  const { router } = useAppContext()

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.replace('/my-orders')
    }, REDIRECT_DELAY)

    return () => clearTimeout(redirectTimer)
  }, [router])

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-5">
      <div className="relative flex justify-center items-center">
        <Image
          className="absolute p-5"
          src={assets.checkmark}
          alt="Order completed successfully"
          priority
        />

        <div
          className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"
          aria-hidden="true"
        />
      </div>

      <h1 className="text-center text-2xl font-semibold">
        Order Placed Successfully
      </h1>
    </main>
  )
}

export default OrderPlaced
