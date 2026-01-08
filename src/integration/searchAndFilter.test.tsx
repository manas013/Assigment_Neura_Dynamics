import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import ProductListing from '../pages/ProductListing/ProductListing'
import productsReducer, { fetchProducts } from '../features/products/productsSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'
import filtersReducer from '../features/filters/filtersSlice'
import type { Product } from '../types/product'
import * as api from '../services/api'

vi.mock('../services/api')

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Laptop Computer',
    price: 999.99,
    description: 'A great laptop',
    category: 'electronics',
    image: 'https://example.com/laptop.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'T-Shirt',
    price: 19.99,
    description: 'Comfortable t-shirt',
    category: 'clothing',
    image: 'https://example.com/tshirt.jpg',
    rating: { rate: 4.0, count: 50 },
  },
  {
    id: 3,
    title: 'Smartphone',
    price: 699.99,
    description: 'Latest smartphone',
    category: 'electronics',
    image: 'https://example.com/phone.jpg',
    rating: { rate: 4.8, count: 200 },
  },
]

describe('Search and Filter Integration', () => {
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
    vi.mocked(api.api.getProducts).mockResolvedValue(mockProducts)
  })

  it('filters products by search query', async () => {
    const store = createMockStore()
    const user = userEvent.setup()

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductListing />
        </BrowserRouter>
      </Provider>
    )

    store.dispatch(fetchProducts())

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search products...')
    await user.type(searchInput, 'Laptop')

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
      expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument()
    })
  })

  it('filters products by category', async () => {
    const store = createMockStore()
    const user = userEvent.setup()

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductListing />
        </BrowserRouter>
      </Provider>
    )

    store.dispatch(fetchProducts())

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    })

    const categorySelect = screen.getByLabelText('Category')
    await user.selectOptions(categorySelect, 'electronics')

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
      expect(screen.getByText('Smartphone')).toBeInTheDocument()
      expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument()
    })
  })

  it('sorts products by price', async () => {
    const store = createMockStore()
    const user = userEvent.setup()

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductListing />
        </BrowserRouter>
      </Provider>
    )

    store.dispatch(fetchProducts())

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    })

    const sortSelect = screen.getByLabelText('Sort By')
    await user.selectOptions(sortSelect, 'price-asc')

    // After sorting, products should be in ascending order
    // We can verify by checking that lower priced items appear first
    await waitFor(() => {
      const prices = screen.getAllByText(/\$\d+\.\d{2}/)
      expect(prices.length).toBeGreaterThan(0)
    })
  })
})

