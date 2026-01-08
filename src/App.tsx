import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProductListing from './pages/ProductListing/ProductListing'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Favorites from './pages/Favorites/Favorites'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductListing />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  )
}

export default App
