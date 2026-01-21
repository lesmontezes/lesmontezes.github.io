# Jekyll 4.4 Container Management Makefile

# Configuration
IMAGE_NAME := jekyll44:latest
CONTAINER_NAME := lesmontezes
PORT := 4000

# Detect container runtime (Docker or Podman)
CONTAINER_RUNTIME := $(shell command -v podman 2>/dev/null || command -v docker 2>/dev/null)

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m

# Check if container runtime is available
ifndef CONTAINER_RUNTIME
$(error Neither Docker nor Podman found. Please install one of them to use this Jekyll setup)
endif

.DEFAULT_GOAL := help

.PHONY: help build-jekyll-image dev stop logs build clean

help: ## Show this help message
	@echo "Jekyll 4.4 Container Management"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "Container Runtime: $(CONTAINER_RUNTIME)"
	@echo "Image Name: $(IMAGE_NAME)"
	@echo ""

build-jekyll-image: ## Build the Jekyll 4.4 Docker image
	@echo -e "$(GREEN)[INFO]$(NC) Building Jekyll 4.4 Docker image..."
	$(CONTAINER_RUNTIME) build -t $(IMAGE_NAME) .

dev: stop ## Run Jekyll development server on port 4000
	@echo -e "$(GREEN)[INFO]$(NC) Starting Jekyll server on :$(PORT)..."
ifeq ($(shell basename $(CONTAINER_RUNTIME)),podman)
	$(CONTAINER_RUNTIME) run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):4000 \
		-v "$$(pwd):/app:Z" \
		-w /app \
		$(IMAGE_NAME)
else
	$(CONTAINER_RUNTIME) run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):4000 \
		-v "$$(pwd):/app" \
		-w /app \
		$(IMAGE_NAME)
endif
	@echo -e "$(GREEN)[SUCCESS]$(NC) Site is running at http://localhost:$(PORT)"

stop: ## Stop the Jekyll container
	@echo -e "$(YELLOW)[INFO]$(NC) Stopping Jekyll container..."
	@$(CONTAINER_RUNTIME) stop $(CONTAINER_NAME) 2>/dev/null || true
	@$(CONTAINER_RUNTIME) rm $(CONTAINER_NAME) 2>/dev/null || true

logs: ## Show container logs
	@$(CONTAINER_RUNTIME) logs -f $(CONTAINER_NAME)

build: ## Build the Jekyll site
	@echo -e "$(GREEN)[INFO]$(NC) Building Jekyll site..."
	$(CONTAINER_RUNTIME) run --rm \
		-v "$$(pwd):/app" \
		-w /app \
		$(IMAGE_NAME) bundle exec jekyll build

clean: ## Clean Jekyll build files
	@echo -e "$(YELLOW)[INFO]$(NC) Cleaning Jekyll build files..."
	@rm -rf _site .jekyll-cache .sass-cache
