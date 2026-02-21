ifneq ("$(wildcard .env)","")
    include .env
    export $(shell sed 's/=.*//' .env)
endif

.PHONY: release login build tag push

# The combined command
release: build tag push

# Secure Login using the variable from .env
# We use 'stdin' to avoid the password showing up in process logs
login:
	@echo "Logging into Docker Hub as $(DOCKER_USER)..."
	@echo $(DOCKER_PASSWORD) | docker login -u $(DOCKER_USER) --password-stdin

build:
	@echo "Building for $(IMAGE_NAME)..."
	docker build -t $(IMAGE_NAME) .

tag:
	docker tag $(IMAGE_NAME) $(DOCKER_USER)/$(IMAGE_NAME):$(VERSION)

push:
	docker push $(DOCKER_USER)/$(IMAGE_NAME):$(VERSION)
