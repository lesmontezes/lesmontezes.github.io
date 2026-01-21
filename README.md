# Le Domaine de l'Olivier des Montèzes - Website

A Jekyll 4.4 website for Le Domaine de l'Olivier des Montèzes, built with modern Jekyll and containerized for easy development.

## Quick Start

### Prerequisites
- Docker or Podman

### Development

1. **Build the Jekyll image** (first time only):

   ```bash
   make build-jekyll-image
   ```

2. **Start the development server**:

   ```bash
   make dev
   ```

3. **View your site**:
   Open [http://localhost:4000](http://localhost:4000) in your browser

4. **View logs**:

   ```bash
   make logs
   ```

5. **Stop the server**:

   ```bash
   make stop
   ```

### Building for Production

```bash
make build
```

### Cleaning Build Files

```bash
make clean
```

## Features

- **Jekyll 4.4** - Latest stable version
- **Modern Plugins**: SEO tags, sitemap, feed generation
- **Docker/Podman Support** - No local Ruby installation required
- **Live Reload** - Automatic browser refresh during development
- **Clean Structure** - Modern Jekyll best practices

## Project Structure

```txt
├── _config.yml          # Jekyll configuration
├── index.md             # Homepage
├── Gemfile              # Ruby dependencies
├── Dockerfile           # Container definition
├── Makefile             # Development commands
└── backup_content/      # Your original content (preserved)
    ├── docs/            # Your original pages
    └── img/             # Your images
```

## Available Commands

Run `make help` to see all available commands:

```bash
make help
```
