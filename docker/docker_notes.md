
---

## 📌 Table of Contents
1. [What is Docker?](#1-what-is-docker)
2. [Docker vs Virtual Machines](#2-docker-vs-virtual-machines)
3. [Core Concepts](#3-core-concepts)
4. [Installation & Setup](#4-installation--setup)
5. [Docker Images](#5-docker-images)
6. [Docker Containers](#6-docker-containers)
7. [Dockerfile](#7-dockerfile)
8. [Docker Volumes](#8-docker-volumes)
9. [Docker Networking](#9-docker-networking)
10. [Docker Compose](#10-docker-compose)
11. [Docker Hub & Registry](#11-docker-hub--registry)
12. [Essential Commands Cheatsheet](#12-essential-commands-cheatsheet)

---

## 1. What is Docker?

- Docker is an **open-source containerization platform** that packages applications and their dependencies into portable, lightweight units called **containers**.
- Ensures the application runs the **same way** in development, testing, and production — eliminating "it works on my machine" problems.
- A key tool in modern **DevOps** and **cloud-native** development workflows.

**Key Benefits:**
-  **Portability** – Run anywhere (local machine, cloud, CI/CD)
-  **Efficiency** – Lighter than VMs; shares the host OS kernel
-  **Isolation** – Each container runs independently
-  **Scalability** – Easily scale up or down

---

## 2. Docker vs Virtual Machines

| Feature | Docker Container | Virtual Machine |
|---|---|---|
| OS | Shares host OS kernel | Full guest OS |
| Startup time | Seconds | Minutes |
| Size | Megabytes | Gigabytes |
| Performance | Near-native | Overhead due to hypervisor |
| Isolation | Process-level | Hardware-level |

---

## 3. Core Concepts

| Term | Description |
|---|---|
| **Image** | Blueprint/template for creating containers (read-only) |
| **Container** | Running instance of an image |
| **Dockerfile** | Script with instructions to build a Docker image |
| **Registry** | Storage for Docker images (e.g., Docker Hub) |
| **Volume** | Persistent storage outside the container filesystem |
| **Network** | Communication layer between containers |
| **Docker Compose** | Tool to define and run multi-container apps using YAML |

---

## 4. Installation & Setup

### Check Docker Version
```bash
docker --version
docker info
docker help
```

### Install Docker Desktop
- Download from [https://www.docker.com](https://www.docker.com)
- Available for **Windows**, **macOS**, and **Linux**

>  On Windows, enable WSL (Windows Subsystem for Linux) and Virtual Machine Platform features before installing.

---

## 5. Docker Images

- An image is a **read-only template** containing app code + dependencies.
- Built in **layers** — each instruction in Dockerfile creates a new layer.
- Stored locally or on a registry like Docker Hub.

### Common Image Commands
```bash
# Pull an image from Docker Hub
docker pull ubuntu

# List all local images
docker images

# Remove an image
docker rmi image_name

# Tag an image
docker tag my-app:1.0 username/my-app:latest

# Push image to Docker Hub
docker push username/my-app:latest
```

---

## 6. Docker Containers

- A container is a **running instance** of an image.
- Containers are **ephemeral** (temporary) by default — data is lost when removed.

### Common Container Commands
```bash
# Run a container
docker run ubuntu

# Run in detached (background) mode
docker run -d --name my-container ubuntu

# Run interactively
docker run -it ubuntu /bin/bash

# Run with port mapping (host:container)
docker run -d -p 8080:80 nginx

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop my-container

# Remove a container
docker rm my-container

# Execute a command in a running container
docker exec -it my-container /bin/bash

# View container logs
docker logs my-container

# Monitor container resource usage
docker stats my-container
```

---

## 7. Dockerfile

A **Dockerfile** is a text file with step-by-step instructions to build a custom Docker image.

### Common Dockerfile Instructions

| Instruction | Purpose |
|---|---|
| `FROM` | Set base image |
| `RUN` | Execute a shell command |
| `COPY` | Copy files from host to image |
| `ADD` | Like COPY, also handles URLs & archives |
| `WORKDIR` | Set working directory inside container |
| `EXPOSE` | Declare port the container listens on |
| `ENV` | Set environment variables |
| `CMD` | Default command to run when container starts |
| `ENTRYPOINT` | Like CMD but harder to override |

### Example Dockerfile (Node.js App)
```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
```

### Build an Image from Dockerfile
```bash
docker build -t my-app:1.0 .
```

---

## 8. Docker Volumes

- Containers are **ephemeral** — data is lost when a container stops/is removed.
- Volumes allow **data persistence** outside the container's writable layer.

### Types of Storage
| Type | Description |
|---|---|
| **Volumes** | Managed by Docker; stored in Docker's directory on host |
| **Bind Mounts** | Maps a specific host directory into the container |
| **tmpfs Mounts** | Stored only in host system memory |

### Volume Commands
```bash
# Create a named volume
docker volume create my-data

# Run container with a volume
docker run -v my-data:/app/data nginx

# List volumes
docker volume ls

# Inspect a volume
docker volume inspect my-data

# Remove a volume
docker volume rm my-data
```

---

## 9. Docker Networking

- Docker networking allows containers to **communicate** with each other and the outside world.
- Docker creates 3 networks automatically: `bridge`, `host`, `none`

### Network Drivers

| Driver | Description |
|---|---|
| **bridge** | Default; used for standalone containers on same host |
| **host** | Removes network isolation; container uses host's network |
| **overlay** | Used in Docker Swarm; connects containers across hosts |
| **macvlan** | Assigns a MAC address to the container |
| **none** | Disables all networking |

### Network Commands
```bash
# List networks
docker network ls

# Create a custom network
docker network create my-network

# Run container on a specific network
docker run --network my-network nginx

# Inspect a network
docker network inspect my-network

# Remove a network
docker network rm my-network
```

> 💡 Containers on the **same user-defined network** can resolve each other by name (DNS).

---

## 10. Docker Compose

- Tool for defining and running **multi-container** Docker applications.
- Uses a **`docker-compose.yml`** YAML file to configure all services.
- Start everything with a single command.

### Example `docker-compose.yml`
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - database

  database:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Docker Compose Commands
```bash
# Start all services
docker-compose up

# Start in background (detached)
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild images
docker-compose build

# View logs
docker-compose logs

# Scale a service
docker-compose up --scale web=3

# Destroy containers and volumes
docker-compose down -v
```

---

## 11. Docker Hub & Registry

- **Docker Hub** is the official cloud-based image registry.
- Hosts thousands of pre-built images (nginx, postgres, python, node, etc.)
- You can push your own custom images to Docker Hub.

```bash
# Login to Docker Hub
docker login

# Pull an image
docker pull nginx:latest

# Push your image
docker push username/my-app:latest
```

---

## 12. Essential Commands Cheatsheet

```bash
# ── Images ──────────────────────────────────
docker pull <image>           # Download image
docker images                 # List images
docker build -t name:tag .    # Build from Dockerfile
docker rmi <image>            # Remove image

# ── Containers ──────────────────────────────
docker run <image>            # Run a container
docker run -d -p 8080:80 nginx  # Run nginx, map port
docker ps                     # Running containers
docker ps -a                  # All containers
docker stop <container>       # Stop container
docker rm <container>         # Remove container
docker exec -it <c> bash      # Shell into container
docker logs <container>       # View logs

# ── Volumes ─────────────────────────────────
docker volume create <name>   # Create volume
docker volume ls              # List volumes
docker volume rm <name>       # Remove volume

# ── Networks ────────────────────────────────
docker network ls             # List networks
docker network create <name>  # Create network
docker network rm <name>      # Remove network

# ── Compose ─────────────────────────────────
docker-compose up -d          # Start services
docker-compose down           # Stop services
docker-compose logs           # View logs

# ── System ──────────────────────────────────
docker system prune           # Remove all unused resources
docker stats                  # Monitor container stats
docker info                   # System-wide info
```

---

