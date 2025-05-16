# Raven Exchange Frontend

This project is a cryptocurrency exchange frontend built with React and Vite, following Atomic Design and BEM CSS conventions.

## Features
- Responsive layout with header, main content, and footer
- Atomic Design structure (atoms, molecules, organisms, pages)
- React Router for navigation and lazy loading
- Integrated CoinGecko API for trading pairs, order book, and candlestick chart data
- Dynamic candlestick chart with volume visualization
- Pagination and error handling for open orders and trade history
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
- `src/pages/` - Page-level components
- `src/router.js` - Routing setup
- `src/styles.css` - Main styles (BEM)

## API Integration
This project uses the CoinGecko API to fetch:
- **Trading Pairs**: Displays trading pairs with price and 24h price change.
- **Order Book**: Displays asks and bids for the selected trading pair.
- **Candlestick Chart**: Displays OHLC and volume data for the selected trading pair and timeframe.

### Testing API Features
1. Select a trading pair from the dashboard.
2. View the candlestick chart and order book for the selected pair.
3. Change the timeframe to see updated candlestick data.

## To Do
- Verify responsiveness and cross-browser compatibility
- Add unit tests for API functions and key components
- Complete Auth/Profile page with Gravatar and GitHub integration
- Add footer and additional responsive improvements

## License
MIT
