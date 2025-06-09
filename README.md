# Cryptocurrency Dashboard

A React dashboard for tracking live cryptocurrency prices with interactive charts and search.

## Features

- **Live Data**: Real-time crypto prices from CoinGecko API
- **Smart Search**: Autocomplete with keyboard navigation
- **Interactive Charts**: 7-day price history chart
- **Virtual Scrolling**: Handles 250+ coins efficiently
- **Responsive**: Mobile-first design 


## Tech Stack

- React 18 + Tailwind CSS
- Recharts for charts
- CoinGecko API
- Virtual scrolling with react-window

## Architecture

```
src/
├── components/    # UI components
├── hooks/        # Data fetching logic
├── services/     # API with caching
└── pages/        # Main app
```

## Key Implementation

- **Caching**: 1-minute API cache with fallbacks
- **Performance**: Virtual scrolling, lazy loading, memoization
- **Search**:  Matching on coin names/symbols
- **Responsive**: Adaptive layouts for mobile/desktop
- **State**: Local state with props drilling

## Performance Features

- Virtual scrolling for large lists
- Component lazy loading
- API response caching
- Optimized re-renders

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git@github.com:kiprotichabiud/crypto-tracker.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd crypto-tracker
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npm run dev

## Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature-branch`.
3. **Make your changes**.
4. **Commit your changes**: `git commit -m 'Add new feature'`.
5. **Push to the branch**: `git push origin feature-branch`.
6. **Create a Pull Request**.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, please contact:

- **Email**: kiprotichabiud1@gmail.com
- **GitHub**: [(https://github.com/kiprotichabiud)]
