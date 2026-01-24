# Use the official Ruby image as base
FROM ruby:4.0-alpine

# Install system dependencies
RUN apk add --no-cache \
    build-base \
    git \
    tzdata \
    nodejs \
    npm

# Set the working directory
WORKDIR /app

# Copy Gemfile and package.json
COPY Gemfile* ./
COPY package*.json ./

# Install gems and npm dependencies
RUN bundle install && npm install

# Copy source files needed for Tailwind build
COPY assets/ ./assets/
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Build Tailwind CSS in the container
RUN ./node_modules/.bin/tailwindcss -i ./assets/css/main.css -o ./assets/css/style.css --minify

# Expose port 4000
EXPOSE 4000

# Default command
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000", "--livereload"]
