import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import ProductListing from './ProductListing'
import productsReducer, { fetchProducts } from '../../features/products/productsSlice'
import favoritesReducer from '../../features/favorites/favoritesSlice'
import filtersReducer from '../../features/filters/filtersSlice'
import type { Product } from '../../types/product'
import * as api from '../../services/api'

vi.mock('../../services/api')

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 10.99,
    description: 'Description 1',
    category: 'electronics',
    image: 'https://example.com/1.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Product 2',
    price: 20.99,
    description: 'Description 2',
    category: 'clothing',
    image: 'https://example.com/2.jpg',
    rating: { rate: 4.0, count: 50 },
  },
]

describe('ProductListing', () => {
  const createMockStore = () => {
    return configureStore({
      reducer: {
        products: productsReducer,
        favorites: favoritesReducer,
        filters: filtersReducer,
      },
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays loading state initially', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductListing />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('displays products after loading', async () => {
    vi.mocked(api.api.getProducts).mockResolvedValue(mockProducts as any)

    const store = createMockStore()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductListing />
        </BrowserRouter>
      </Provider>
    )

    store.dispatch(fetchProducts())

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
      expect(screen.getByText('Product 2')).toBeInTheDocument()
    })
  })

  it('displays error message on fetch failure', async () => {
    vi.mocked(api.api.getProducts).mockRejectedValue(new Error('Network error') as any)

    const store = createMockStore()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductListing />
        </BrowserRouter>
      </Provider>
    )

    store.dispatch(fetchProducts())

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument()
    })
  })
})

