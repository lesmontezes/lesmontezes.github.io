# Jekyll Container Management Makefile (Dual Targets)

# Configuration
IMAGE_NAME := jekyll-custom:latest
CONTAINER_NAME := lesmontezes
PORT_MAIN := 4000

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

.PHONY: help build-jekyll-custom-image dev-main stop-main logs-main build-main

help: ## Show this help message
	@echo "Jekyll Container Management"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-16s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "Container Runtime: $(CONTAINER_RUNTIME)"
	@echo "Image Name: $(IMAGE_NAME)"
	@echo ""

build-jekyll-custom-image: ## Build the custom Jekyll Docker image
	@echo -e "$(GREEN)[INFO]$(NC) Building custom Jekyll Docker image..."
	$(CONTAINER_RUNTIME) build -t $(IMAGE_NAME) -f docs/Dockerfile .

dev-main: stop-main ## Run main site container on port 4000
	@echo -e "$(GREEN)[INFO]$(NC) Starting main site on :$(PORT_MAIN)..."
ifeq ($(shell basename $(CONTAINER_RUNTIME)),podman)
	$(CONTAINER_RUNTIME) run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT_MAIN):4000 \
		-v "$$(pwd)/docs:/app:Z" \
		-w /app \
		$(IMAGE_NAME) jekyll serve --host 0.0.0.0 --port 4000
else
	$(CONTAINER_RUNTIME) run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT_MAIN):4000 \
		-v "$$(pwd)/docs:/app" \
		-w /app \
		$(IMAGE_NAME) jekyll serve --host 0.0.0.0 --port 4000
endif
	@echo -e "$(GREEN)[INFO]$(NC) Main site running at: http://localhost:$(PORT_MAIN)"

stop-main: ## Stop and remove main site container
	@echo -e "$(GREEN)[INFO]$(NC) Stopping main site container..."
	@$(CONTAINER_RUNTIME) stop $(CONTAINER_NAME) >/dev/null 2>&1 || true
	@$(CONTAINER_RUNTIME) rm $(CONTAINER_NAME) >/dev/null 2>&1 || true

logs-main: ## Show logs for main site container
	@echo -e "$(GREEN)[INFO]$(NC) Showing main site logs..."
	$(CONTAINER_RUNTIME) logs -f $(CONTAINER_NAME)

build-main: ## Build the Jekyll main site
	@echo -e "$(GREEN)[INFO]$(NC) Building Jekyll main site..."
ifeq ($(shell basename $(CONTAINER_RUNTIME)),podman)
	$(CONTAINER_RUNTIME) run --rm -v "$$(pwd)/docs:/app:Z" -w /app $(IMAGE_NAME) jekyll build
else
	$(CONTAINER_RUNTIME) run --rm -v "$$(pwd)/docs:/app" -w /app $(IMAGE_NAME) jekyll build
endif
	@echo -e "$(GREEN)[INFO]$(NC) Main site built successfully in _site directory!"
