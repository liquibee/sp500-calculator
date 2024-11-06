.PHONY: install clean dev build setup

# Default target
all: install dev

# Install dependencies
install:
	@echo "Installing dependencies..."
	bun install
	bun add recharts lucide-react
	bun add -D tailwindcss postcss autoprefixer
	bunx tailwindcss init -p

# Clean installation
clean:
	@echo "Cleaning..."
	rm -rf node_modules
	rm -rf dist
	rm -f bun.lockb

# Start development server
dev:
	@echo "Starting development server..."
	bun run dev

# Build for production
build:
	@echo "Building for production..."
	bun run build

# Help command
help:
	@echo "Available commands:"
	@echo "  make install  - Install all dependencies"
	@echo "  make clean    - Remove dependencies and build files"
	@echo "  make dev      - Start development server"
	@echo "  make build    - Build for production"
	@echo "  make help     - Show this help message"