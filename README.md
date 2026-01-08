# Product Dashboard - Frontend Assignment

A modern product dashboard application built with React, Redux Toolkit, and TypeScript, featuring product listing, search, filtering, sorting, and favorites management.

## 🚀 Features

- **Product Listing Page**: Displays products in a responsive grid layout
- **Search & Filter**: 
  - Debounced search by product title
  - Filter by category
  - Sort by price (ascending/descending)
- **Product Detail Page**: Shows complete product information with ability to add/remove from favorites
- **Favorites Page**: View and manage favorited products
- **State Management**: Redux Toolkit with async thunks and selectors
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Testing**: Comprehensive unit and integration tests with Vitest

## 🛠️ Tech Stack

- **React 19** - UI library with functional components and hooks
- **Redux Toolkit** - State management with thunks and selectors
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** - Testing framework
- **Axios** - HTTP client for API calls
- **Fake Store API** - Product data source

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Assigment_Neura Dynamics"
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Test Coverage
```bash
npm run test:coverage
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Main layout with navigation
│   ├── ProductCard/    # Product card component
│   ├── SearchBar/      # Search input with debouncing
│   └── Filters/        # Category and sort filters
├── features/           # Redux feature slices
│   ├── products/       # Products state and async thunks
│   ├── favorites/      # Favorites state management
│   └── filters/        # Search, category, and sort filters
├── pages/              # Page components
│   ├── ProductListing/ # Main product listing page
│   ├── ProductDetail/  # Individual product detail page
│   └── Favorites/      # Favorites page
├── services/           # API service layer
│   └── api.ts         # Fake Store API integration
├── store/              # Redux store configuration
│   ├── store.ts       # Store setup
│   └── hooks.ts       # Typed Redux hooks
├── types/              # TypeScript type definitions
│   └── product.ts     # Product interface
├── integration/        # Integration tests
└── App.tsx            # Main app component with routes
```

## 🎯 Key Implementation Details

### State Management
- **Redux Toolkit** for centralized state management
- **Async Thunks** for API calls (`fetchProducts`, `fetchProductById`)
- **Selectors** for computed state (filtered/sorted products)
- **Typed Hooks** (`useAppDispatch`, `useAppSelector`) for type safety

### Search & Filtering
- **Debounced Search**: 300ms delay to reduce API calls
- **Category Filter**: Dynamic categories fetched from API
- **Price Sorting**: Ascending and descending options
- **Combined Filters**: All filters work together seamlessly

### Favorites Management
- Favorites stored in Redux store (persists during session)
- Add/remove favorites from product cards and detail page
- Badge showing favorite count in navigation

### Testing Strategy
- **Unit Tests**: Redux slices, selectors, and components
- **Integration Tests**: End-to-end user flows (search, filter, favorites)
- **Mocking**: API calls mocked for reliable tests

## 🌐 API Integration

The application uses the [Fake Store API](https://fakestoreapi.com):
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `GET /products/categories` - Fetch all categories

## 🚢 Deployment

### Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

### Netlify
1. Push code to GitHub
2. Create new site from Git in Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

### Render
1. Push code to GitHub
2. Create new Static Site in Render
3. Connect repository
4. Build command: `npm run build`
5. Publish directory: `dist`

## 📝 Notes

- The application uses client-side state management. Favorites are stored in Redux and persist during the session but are not saved to a backend.
- Search is debounced to improve performance and reduce unnecessary re-renders.
- All components are fully responsive and accessible.
- The UI follows modern design principles with a dark theme.

## 🎨 UI Features

- Dark theme with slate color palette
- Responsive grid layout (1-4 columns based on screen size)
- Hover effects and smooth transitions
- Loading states and error handling
- Empty states for better UX
- Accessible form controls and buttons

## 📄 License

This project is created as part of a frontend developer assignment.
