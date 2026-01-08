import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { setSearchQuery } from '../../features/filters/filtersSlice'

export default function SearchBar() {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(inputValue))
    }, 300)

    return () => clearTimeout(timer)
  }, [inputValue, dispatch])

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full px-4 py-2 pl-10 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  )
}

