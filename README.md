# S&P 500 Investment Calculator

A React-based calculator that lets you analyze historical S&P 500 investment scenarios from 1926 to 2024. This tool helps you understand the potential outcomes of long-term investment strategies by showing how your investments would have performed over different time periods.

![S&P 500 Investment Calculator Screenshot](/api/placeholder/800/400)

## Features

- Historical S&P 500 returns from 1926 to 2024
- Customizable start year, initial investment, and monthly contributions
- Interactive chart showing investment growth over time
- Detailed yearly breakdown of:
  - Total investment amount
  - Portfolio value
  - Market returns
  - Portfolio growth
  - S&P 500 index tracking
- Support for USD ($) and EUR (€) display
- Key statistics including:
  - Total return
  - Growth percentage
  - Average annual growth rate

## Prerequisites

- [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
make install
```

## Development

Start the development server:
```bash
make dev
```

The application will be available at `http://localhost:5173`

## Available Commands

The project includes a Makefile with the following commands:

- `make install` - Install project dependencies
- `make dev` - Start development server
- `make build` - Create production build
- `make clean` - Remove dependencies and build files

## Project Structure

```
├── src/
│   ├── components/
│   │   └── InvestmentCalculator.tsx    # Main calculator component
│   ├── App.tsx                         # Application entry point
│   ├── index.css                       # Global styles and Tailwind imports
│   └── main.tsx                        # React entry point
├── Makefile                            # Project commands
├── index.html                          # HTML entry point
├── tailwind.config.js                  # Tailwind CSS configuration
└── postcss.config.js                   # PostCSS configuration
```

## Technologies Used

- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Data visualization
- [Lucide React](https://lucide.dev/) - Icons
- [Vite](https://vitejs.dev/) - Build tool

## Data Source

The calculator uses historical S&P 500 returns data from 1926 to 2024. The data includes:
- Annual total returns (including dividends)
- Data up to April 2024
- Returns are adjusted for inflation

## Calculations

The calculator performs the following calculations:

1. **Investment Growth**: 
   - Applies monthly contributions throughout the investment period
   - Compounds returns annually based on historical S&P 500 performance

2. **Portfolio Value**: 
   - Initial investment + Monthly contributions + Market returns
   - Takes into account compound interest effects

3. **Performance Metrics**:
   - Total Return = Final Value - Total Invested
   - Growth Percentage = (Total Return / Total Invested) × 100
   - Average Annual Growth = Sum of yearly returns / Number of years

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by long-term investment analysis tools
- Thanks to the open source community for the amazing tools

## Contact

[Hannes Lehmann] - [hannes.lehmann@sistemica.de]

Project Link: [https://github.com/liquibee/sp500-calculator](https://github.com/liquibee/sp500-calculator)