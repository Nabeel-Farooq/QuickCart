'use client'

import ProductCard from '@/components/ProductCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAppContext } from '@/context/AppContext'

const AllProducts = () => {
  const { products = [] } = useAppContext()

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <header className="flex flex-col items-end pt-12">
          <h1 className="text-2xl font-medium">
            All Products
          </h1>

          <span className="w-16 h-0.5 bg-orange-600 rounded-full" />
        </header>

        {products.length > 0 ? (
          <section
            className="
              grid 
              grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              xl:grid-cols-5 
              gap-6 
              mt-12 
              pb-14 
              w-full
            "
          >
            {products.map((product) => (
              <ProductCard
                key={product.id ?? product._id}
                product={product}
              />
            ))}
          </section>
        ) : (
          <div className="w-full py-20 text-center text-gray-500">
            No products available.
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

export default AllProducts
