---
title: 'Step by Step Install Docker and Docker Compose on Ubuntu'
seoTitle: 'docker'
slug: 'install-docker-on-ubuntu'
description: 'Documentation Install Docker and Docker Compose on Ubuntu'
pubDate: '2025-02-25'
updatedDate: '2025-02-25'
tags: ["Docker","Devops"]
---

## Step 1: Update System Packages
```sh
sudo apt update && sudo apt upgrade -y
```

## Step 2: Install Required Dependencies
```sh
sudo apt install -y ca-certificates curl gnupg
```

## Step 3: Add Docker’s Official GPG Key
```sh
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.gpg > /dev/null
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

## Step 4: Add Docker Repository
```sh
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

## Step 5: Install Docker Engine, CLI, and Containerd
```sh
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Step 6: Verify Docker Installation
```sh
docker --version
sudo systemctl enable docker
sudo systemctl start docker
sudo systemctl status docker
```

## Step 7: Install Docker Compose (Standalone)
```sh
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep "tag_name" | cut -d '"' -f 4)
sudo curl -L "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Step 8: Verify Docker Compose Installation
```sh
docker-compose --version
```

## Step 9: Add User to Docker Group (Optional, to run Docker without sudo)
```sh
sudo usermod -aG docker $USER
newgrp docker
```

## Step 10: Test Docker and Docker Compose
Run a simple container:
```sh
docker run hello-world
```
Test Docker Compose:
```sh
echo -e "version: '3'\nservices:\n  web:\n    image: nginx" > docker-compose.yml
docker-compose up -d
docker ps
docker-compose down
```

## Uninstall Docker and Docker Compose
```sh
sudo apt remove -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
sudo rm -f /usr/local/bin/docker-compose
```

## Conclusion
You have successfully installed Docker and Docker Compose on Ubuntu! 🎉

