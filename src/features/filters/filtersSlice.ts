import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type SortOption = 'price-asc' | 'price-desc' | 'none'

interface FiltersState {
  searchQuery: string
  category: string
  sortBy: SortOption
}

const initialState: FiltersState = {
  searchQuery: '',
  category: 'all',
  sortBy: 'none',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload
    },
    resetFilters: (state) => {
      state.searchQuery = ''
      state.category = 'all'
      state.sortBy = 'none'
    },
  },
})

export const { setSearchQuery, setCategory, setSortBy, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer

