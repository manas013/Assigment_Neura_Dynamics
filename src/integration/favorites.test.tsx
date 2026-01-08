import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import ProductListing from '../pages/ProductListing/ProductListing'
import Favorites from '../pages/Favorites/Favorites'
import productsReducer, { fetchProducts } from '../features/products/productsSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'
import filtersReducer from '../features/filters/filtersSlice'
import type { Product } from '../types/product'
import * as api from '../services/api'

vi.mock('../services/api')

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 },
}

describe('Favorites Integration', () => {
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
    vi.mocked(api.api.getProducts).mockResolvedValue([mockProduct])
    vi.mocked(api.api.getProduct).mockResolvedValue(mockProduct)
  })

  it('adds product to favorites from product card', async () => {
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
      expect(screen.getByText('Test Product')).toBeInTheDocument()
    })

    const favoriteButton = screen.getByLabelText('Add to favorites')
    await user.click(favoriteButton)

    // Navigate to favorites page
    const favoritesLink = screen.getByText('Favorites')
    await user.click(favoritesLink)

    await waitFor(() => {
      expect(screen.getByText('Favorites (1)')).toBeInTheDocument()
      expect(screen.getByText('Test Product')).toBeInTheDocument()
    })
  })

  it('removes product from favorites', async () => {
    const store = configureStore({
      reducer: {
        products: productsReducer,
        favorites: favoritesReducer,
        filters: filtersReducer,
      },
      preloadedState: {
        favorites: {
          items: [mockProduct],
        },
      },
    })
    const user = userEvent.setup()

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('Favorites (1)')).toBeInTheDocument()

    const removeButton = screen.getByLabelText('Remove from favorites')
    await user.click(removeButton)

    await waitFor(() => {
      expect(screen.getByText('No favorites yet')).toBeInTheDocument()
    })
  })
})

