import { describe, it, expect } from 'vitest'
import productsReducer, { fetchProducts, fetchProductById } from './productsSlice'
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

describe('productsSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
  }

  it('should return initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type }
    const state = productsReducer(initialState, action)
    expect(state.loading).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should handle fetchProducts.fulfilled', () => {
    const products = [mockProduct]
    const action = { type: fetchProducts.fulfilled.type, payload: products }
    const state = productsReducer(initialState, action)
    expect(state.loading).toBe(false)
    expect(state.items).toEqual(products)
  })

  it('should handle fetchProducts.rejected', () => {
    const error = 'Network error'
    const action = { type: fetchProducts.rejected.type, error: { message: error } }
    const state = productsReducer(initialState, action)
    expect(state.loading).toBe(false)
    expect(state.error).toBe(error)
  })

  it('should handle fetchProductById.fulfilled and add new product', () => {
    const action = { type: fetchProductById.fulfilled.type, payload: mockProduct }
    const state = productsReducer(initialState, action)
    expect(state.loading).toBe(false)
    expect(state.items).toContainEqual(mockProduct)
  })

  it('should handle fetchProductById.fulfilled and update existing product', () => {
    const existingState = {
      items: [mockProduct],
      loading: false,
      error: null,
    }
    const updatedProduct = { ...mockProduct, title: 'Updated Title' }
    const action = { type: fetchProductById.fulfilled.type, payload: updatedProduct }
    const state = productsReducer(existingState, action)
    expect(state.items).toHaveLength(1)
    expect(state.items[0].title).toBe('Updated Title')
  })
})

