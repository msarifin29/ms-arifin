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
sudo apt update && sudo apt upgrade
```

## Step 2: Install Required Dependencies
```sh
sudo apt install ca-certificates curl
```

## Step 3: Add Docker’s Official GPG Key
```sh
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

## Step 4: Add Docker Repository
```sh
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```
then `sudo apt update`


## Step 5: Verify Docker Installation
```sh
docker --version
sudo systemctl enable docker
sudo systemctl start docker
sudo systemctl status docker
```

## Step 6: Install Docker Compose (Standalone)
```sh
curl -SL https://github.com/docker/compose/releases/download/v5.6.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Step 7: Verify Docker Compose Installation
```sh
docker-compose version
```

## Step 8: Add User to Docker Group (Optional, to run Docker without sudo)
```sh
sudo usermod -aG docker $USER
newgrp docker
```

## Step 9: Verify that the installation is successful
Run a simple container:
```sh
docker run hello-world
```


## Uninstall Docker and Docker Compose
Uninstalling DOcker Engine
```sh
sudo apt purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```
To delete all images, containers, and volumes
```sh
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```
Remove source list and keyrings
```sh
sudo rm /etc/apt/sources.list.d/docker.sources
sudo rm /etc/apt/keyrings/docker.asc
```
Uninstalling Docker Compose
```sh
sudo apt-get remove docker-compose-plugin
```
Remove for all users
```sh
rm /usr/local/lib/docker/cli-plugins/docker-compose
```

## Conclusion
You have successfully installed Docker and Docker Compose on Ubuntu! 🎉

