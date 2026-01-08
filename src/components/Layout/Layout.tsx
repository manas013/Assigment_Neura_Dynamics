import { Link, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { selectFavorites } from '../../features/favorites/favoritesSelectors'

export default function Layout() {
  const favorites = useAppSelector(selectFavorites)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
              Product Dashboard
            </Link>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Products
              </Link>
              <Link
                to="/favorites"
                className="text-slate-300 hover:text-white transition-colors relative"
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

