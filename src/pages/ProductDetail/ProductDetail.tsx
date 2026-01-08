import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchProductById } from '../../features/products/productsSlice'
import { selectProductById, selectProductsLoading, selectProductsError } from '../../features/products/productsSelectors'
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice'
import { selectIsFavorite } from '../../features/favorites/favoritesSelectors'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const productId = id ? parseInt(id, 10) : null
  const product = productId ? useAppSelector(state => selectProductById(state, productId)) : null
  const loading = useAppSelector(selectProductsLoading)
  const error = useAppSelector(selectProductsError)
  const isFavorite = productId ? useAppSelector(state => selectIsFavorite(state, productId)) : false

  useEffect(() => {
    if (productId && !product) {
      dispatch(fetchProductById(productId))
    }
  }, [productId, product, dispatch])

  const handleFavoriteToggle = () => {
    if (product) {
      if (isFavorite) {
        dispatch(removeFromFavorites(product.id))
      } else {
        dispatch(addToFavorites(product))
      }
    }
  }

  if (loading && !product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-400 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </button>

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="bg-white rounded-lg p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-96 object-contain"
            />
          </div>
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-slate-100">{product.title}</h1>
              <button
                onClick={handleFavoriteToggle}
                className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg
                  className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-slate-400'}`}
                  fill={isFavorite ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                {product.category}
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-blue-400">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-slate-300">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-slate-200">Description</h2>
              <p className="text-slate-300 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

