# Raven Exchange Frontend

This project is a cryptocurrency exchange frontend built with React and Vite, following Atomic Design and BEM CSS conventions.

## Features
- Responsive layout with header, main content, and footer
- Atomic Design structure (atoms, molecules, organisms, pages)
- React Router for navigation and lazy loading
- Placeholder components for candlestick chart, trading pairs, order book, and order form
- Auth/profile page with Gravatar integration (to be implemented)
- Styled with BEM methodology

## Getting Started

1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Run the development server:**
   ```powershell
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure
- `src/atoms/` - Basic UI elements
- `src/molecules/` - Combinations of atoms
- `src/organisms/` - Complex UI sections
- `src/pages/` - Page-level components (to be completed)
- `src/router.js` - Routing setup
- `src/styles.css` - Main styles (BEM)

## To Do
- Implement API integration for trading pairs, order book, and candlestick chart
- Complete Auth/Profile page with Gravatar and GitHub integration
- Add footer and responsive improvements

## License
MIT
