import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchProducts } from '../../features/products/productsSlice'
import { selectFilteredAndSortedProducts, selectProductsLoading, selectProductsError } from '../../features/products/productsSelectors'
import ProductCard from '../../components/ProductCard/ProductCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Filters from '../../components/Filters/Filters'

export default function ProductListing() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectFilteredAndSortedProducts)
  const loading = useAppSelector(selectProductsLoading)
  const error = useAppSelector(selectProductsError)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="mb-6">
        <SearchBar />
      </div>
      <Filters />
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

