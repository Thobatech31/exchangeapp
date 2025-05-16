# Raven Exchange Frontend

This project is a cryptocurrency exchange frontend built with React and Vite, following Atomic Design and BEM CSS conventions.

## Features
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Atomic Design Structure**: Organized into atoms, molecules, organisms, and pages for modularity.
- **React Router**: Enables seamless navigation and lazy loading of components.
- **API Integration**: Uses the CoinGecko API to fetch trading pairs, order book data, and candlestick chart data.
- **Dynamic Candlestick Chart**: Visualizes OHLC and volume data with responsive scaling.
- **Error Handling**: Graceful handling of API errors and fallback logic for missing data.
- **Pagination**: Supports paginated views for open orders and trade history.
- **BEM Methodology**: Ensures consistent and maintainable CSS styling.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/raven-exchange.git
   cd raven-exchange
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser:**
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
- Verify responsiveness and cross-browser compatibility.
- Add unit tests for API functions and key components.
- Complete Auth/Profile page with Gravatar and GitHub integration.
- Add footer and additional responsive improvements.

## Contributing
We welcome contributions to improve this project. To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

## License
MIT
