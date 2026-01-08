import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCategory, setSortBy } from '../../features/filters/filtersSlice'
import type { SortOption } from '../../features/filters/filtersSlice'
import { api } from '../../services/api'

export default function Filters() {
  const dispatch = useAppDispatch()
  const { category, sortBy } = useAppSelector(state => state.filters)
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await api.getCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Failed to load categories:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCategories()
  }, [])

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label htmlFor="sort" className="block text-sm font-medium text-slate-300 mb-2">
          Sort By
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="none">No Sorting</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}

