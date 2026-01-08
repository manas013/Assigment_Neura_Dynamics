import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import type { Product } from '../../types/product'

export const selectAllProducts = (state: RootState) => state.products.items
export const selectProductsLoading = (state: RootState) => state.products.loading
export const selectProductsError = (state: RootState) => state.products.error

export const selectFilteredAndSortedProducts = createSelector(
  [selectAllProducts, (state: RootState) => state.filters],
  (products, filters) => {
    let filtered: Product[] = [...products]

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(product =>
        product.category === filters.category
      )
    }

    // Sort
    if (filters.sortBy !== 'none') {
      filtered.sort((a, b) => {
        if (filters.sortBy === 'price-asc') {
          return a.price - b.price
        } else {
          return b.price - a.price
        }
      })
    }

    return filtered
  }
)

export const selectProductById = createSelector(
  [selectAllProducts, (_state: RootState, productId: number) => productId],
  (products, productId) => products.find(p => p.id === productId)
)

