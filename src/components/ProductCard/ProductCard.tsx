import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice'
import { selectIsFavorite } from '../../features/favorites/favoritesSelectors'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector(state => selectIsFavorite(state, product.id))

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id))
    } else {
      dispatch(addToFavorites(product))
    }
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="block bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition-colors group"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain bg-white p-4"
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-2 p-2 bg-slate-900/80 rounded-full hover:bg-slate-900 transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-slate-400'}`}
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
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>
        <p className="text-slate-400 text-sm mb-3 line-clamp-2">
          {product.category}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-400">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-slate-300">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

