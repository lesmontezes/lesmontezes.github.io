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

# Copy Gemfile and Gemfile.lock
COPY Gemfile* ./

# Install gems
RUN bundle install

# Expose port 4000
EXPOSE 4000

# Default command
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000", "--livereload"]
