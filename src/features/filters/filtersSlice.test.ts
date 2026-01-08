import { describe, it, expect } from 'vitest'
import filtersReducer, { setSearchQuery, setCategory, setSortBy, resetFilters } from './filtersSlice'

describe('filtersSlice', () => {
  const initialState = {
    searchQuery: '',
    category: 'all',
    sortBy: 'none' as const,
  }

  it('should return initial state', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle setSearchQuery', () => {
    const action = setSearchQuery('test query')
    const state = filtersReducer(initialState, action)
    expect(state.searchQuery).toBe('test query')
  })

  it('should handle setCategory', () => {
    const action = setCategory('electronics')
    const state = filtersReducer(initialState, action)
    expect(state.category).toBe('electronics')
  })

  it('should handle setSortBy', () => {
    const action = setSortBy('price-asc')
    const state = filtersReducer(initialState, action)
    expect(state.sortBy).toBe('price-asc')
  })

  it('should handle resetFilters', () => {
    const modifiedState = {
      searchQuery: 'test',
      category: 'electronics',
      sortBy: 'price-desc' as const,
    }
    const action = resetFilters()
    const state = filtersReducer(modifiedState, action)
    expect(state).toEqual(initialState)
  })
})

