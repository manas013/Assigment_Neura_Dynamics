import { useAppSelector } from '../../store/hooks'
import { selectFavorites } from '../../features/favorites/favoritesSelectors'
import ProductCard from '../../components/ProductCard/ProductCard'

export default function Favorites() {
  const favorites = useAppSelector(selectFavorites)

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-24 h-24 text-slate-600 mx-auto mb-4"
          fill="none"
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
        <h2 className="text-2xl font-bold mb-2 text-slate-300">No favorites yet</h2>
        <p className="text-slate-400 mb-6">Start adding products to your favorites!</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Favorites ({favorites.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

