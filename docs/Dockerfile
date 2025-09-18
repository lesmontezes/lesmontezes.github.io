FROM ruby:3.4-alpine

# Avoid interactive prompts and set UTF-8 locale
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    BUNDLE_APP_CONFIG=.bundle

RUN apk add --no-cache \
    build-base \
    git \
    nodejs \
    npm

WORKDIR /app

# Install and update bundler first
RUN gem install bundler

COPY docs/Gemfile docs/Gemfile.lock ./

RUN bundle install

COPY docs/ ./

EXPOSE 4000

ENV JEKYLL_ENV=development

CMD ["bundle", "exec", "jekyll", "serve", "--config", "_config.yml,_config_dev.yml", "--host", "0.0.0.0", "--port", "4000", "--livereload"]
