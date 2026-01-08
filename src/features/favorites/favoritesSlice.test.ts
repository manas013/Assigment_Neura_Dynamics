import { describe, it, expect } from 'vitest'
import favoritesReducer, { addToFavorites, removeFromFavorites } from './favoritesSlice'
import type { Product } from '../../types/product'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 },
}

describe('favoritesSlice', () => {
  const initialState = {
    items: [],
  }

  it('should return initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle addToFavorites', () => {
    const action = addToFavorites(mockProduct)
    const state = favoritesReducer(initialState, action)
    expect(state.items).toContainEqual(mockProduct)
  })

  it('should not add duplicate product to favorites', () => {
    const existingState = {
      items: [mockProduct],
    }
    const action = addToFavorites(mockProduct)
    const state = favoritesReducer(existingState, action)
    expect(state.items).toHaveLength(1)
  })

  it('should handle removeFromFavorites', () => {
    const existingState = {
      items: [mockProduct],
    }
    const action = removeFromFavorites(mockProduct.id)
    const state = favoritesReducer(existingState, action)
    expect(state.items).not.toContainEqual(mockProduct)
    expect(state.items).toHaveLength(0)
  })
})

