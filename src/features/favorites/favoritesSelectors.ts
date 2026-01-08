import type { RootState } from '../../store/store'

export const selectFavorites = (state: RootState) => state.favorites.items
export const selectIsFavorite = (state: RootState, productId: number) =>
  state.favorites.items.some(item => item.id === productId)

