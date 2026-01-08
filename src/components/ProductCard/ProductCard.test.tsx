import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from './ProductCard'
import type { Product } from '../../types/product'
import productsReducer from '../../features/products/productsSlice'
import favoritesReducer from '../../features/favorites/favoritesSlice'
import filtersReducer from '../../features/filters/filtersSlice'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 },
}

const createMockStore = (initialFavorites: Product[] = []) => {
  return configureStore({
    reducer: {
      products: productsReducer,
      favorites: favoritesReducer,
      filters: filtersReducer,
    },
    preloadedState: {
      favorites: {
        items: initialFavorites,
      },
    },
  })
}

describe('ProductCard', () => {
  it('renders product information', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$19.99')).toBeInTheDocument()
    expect(screen.getByText('electronics')).toBeInTheDocument()
  })

  it('shows favorite icon when product is favorited', () => {
    const store = createMockStore([mockProduct])
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    )

    const favoriteButton = screen.getByLabelText('Remove from favorites')
    expect(favoriteButton).toBeInTheDocument()
  })

  it('shows non-favorite icon when product is not favorited', () => {
    const store = createMockStore([])
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    )

    const favoriteButton = screen.getByLabelText('Add to favorites')
    expect(favoriteButton).toBeInTheDocument()
  })
})

