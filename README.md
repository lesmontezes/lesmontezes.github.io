# Le Domaine de l'Olivier des Montèzes - website

## Run locally with Docker

```bash
# 1st time only: build the custom Jekyll Docker image
make build-jekyll-custom-image

# Build the Jekyll main site
make build-main

# Serve the main site locally with live reload and view live logs
make dev-main logs-main
```

Then browse to [http://localhost:4000](http://localhost:4000)
