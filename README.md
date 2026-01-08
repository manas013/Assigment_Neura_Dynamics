# Product Dashboard - Frontend Assignment

## 🚢 Deployment link:https://serene-nasturtium-9263a5.netlify.app/

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






