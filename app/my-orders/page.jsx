'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { assets, orderDummyData } from '@/assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Loading from '@/components/Loading'

const MyOrders = () => {
  const { currency } = useAppContext()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)

      // Replace this with API call later
      setOrders(orderDummyData)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const formattedOrders = useMemo(() => {
    return orders.map((order) => ({
      ...order,
      itemsText: order.items
        .map(({ product, quantity }) => `${product.name} x ${quantity}`)
        .join(', '),

      date: new Date(order.date).toLocaleDateString(),
    }))
  }, [orders])

  return (
    <>
      <Navbar />

      <main className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <section className="space-y-5">
          <h1 className="text-lg font-medium mt-6">
            My Orders
          </h1>

          {loading ? (
            <Loading />
          ) : formattedOrders.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No orders found.
            </p>
          ) : (
            <div className="max-w-5xl border-t border-gray-300 text-sm">
              {formattedOrders.map((order) => (
                <article
                  key={order.id ?? order.date}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                >
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src={assets.box_icon}
                      alt="Order package"
                    />

                    <div className="flex flex-col gap-3">
                      <span className="font-medium text-base">
                        {order.itemsText}
                      </span>

                      <span>
                        Items: {order.items.length}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p>
                      <span className="font-medium">
                        {order.address.fullName}
                      </span>

                      <br />

                      <span>
                        {order.address.area}
                      </span>

                      <br />

                      <span>
                        {order.address.city}, {order.address.state}
                      </span>

                      <br />

                      <span>
                        {order.address.phoneNumber}
                      </span>
                    </p>
                  </div>

                  <p className="font-medium my-auto">
                    {currency}{order.amount}
                  </p>

                  <div>
                    <p className="flex flex-col">
                      <span>
                        Method: COD
                      </span>

                      <span>
                        Date: {order.date}
                      </span>

                      <span>
                        Payment: Pending
                      </span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

export default MyOrders
