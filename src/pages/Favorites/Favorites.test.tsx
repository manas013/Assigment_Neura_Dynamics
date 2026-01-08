import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import Favorites from './Favorites'
import productsReducer from '../../features/products/productsSlice'
import favoritesReducer from '../../features/favorites/favoritesSlice'
import filtersReducer from '../../features/filters/filtersSlice'
import type { Product } from '../../types/product'

const mockProduct: Product = {
  id: 1,
  title: 'Favorite Product',
  price: 19.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 },
}

describe('Favorites', () => {
  it('displays empty state when no favorites', () => {
    const store = configureStore({
      reducer: {
        products: productsReducer,
        favorites: favoritesReducer,
        filters: filtersReducer,
      },
    })

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('No favorites yet')).toBeInTheDocument()
  })

  it('displays favorite products', () => {
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

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('Favorites (1)')).toBeInTheDocument()
    expect(screen.getByText('Favorite Product')).toBeInTheDocument()
  })
})

