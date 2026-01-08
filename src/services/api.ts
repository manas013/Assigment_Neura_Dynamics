import axios from 'axios'
import type { Product } from '../types/product'

const API_BASE_URL = 'https://fakestoreapi.com'

export const api = {
  async getProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`)
    return response.data
  },

  async getProduct(id: number): Promise<Product> {
    const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`)
    return response.data
  },

  async getCategories(): Promise<string[]> {
    const response = await axios.get<string[]>(`${API_BASE_URL}/products/categories`)
    return response.data
  },
}

