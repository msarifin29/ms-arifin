---
title: 'Step by Step Install Virtualbox on Ubuntu'
seoTitle: 'virtualbox'
slug: 'install-virtualbox-on-ubuntu'
description: 'Documentation Step by Step Install Virtualbox on Ubuntu'
pubDate: '2025-01-31'
updatedDate: '2025-01-31'
tags: ["VM","Virtualbox","Devops"]
---

- ### update system
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

- ### Install Required Dependencies
  - build-essential: Provides tools for compiling software.
  - dkms: Dynamic Kernel Module Support, which helps rebuild kernel modules when the kernel is updated.
  - `linux-headers-$(uname -r)`: Installs the kernel headers for your current kernel version.
  ```bash
  sudo apt install build-essential dkms linux-headers-$(uname -r)
  ```

- ### Add the VirtualBox Repository
    - Import the VirtualBox GPG key to verify packages:
    ```bash
    wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | sudo gpg --dearmor --yes --output /usr/share/keyrings/oracle-virtualbox-2016.gpg
    ```
    - Add the VirtualBox repository to your system's APT sources list:
    ```bash
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/oracle-virtualbox-2016.gpg] http://download.virtualbox.org/virtualbox/debian $(lsb_release -cs) contrib" | sudo tee /etc/apt/sources.list.d/virtualbox.list
    ```

- ### Install VirtualBox
    * Update the package list:
    ```bash
    sudo apt update
    ```
    - Install VirtualBox
    ```bash
    sudo apt install virtualbox-7.0
    ```

- ### Rebuild VirtualBox Kernel Modules

  After installation, VirtualBox needs to build and load its kernel modules. This is done automatically, but you can manually trigger it if needed:
  ```bash
  sudo /sbin/vboxconfig
  ```

- ### Verify the Installation

  Check if the vboxdrv kernel module is loaded:
  ```bash
  lsmod | grep vboxdrv
  ```
  If the module is loaded, you should see output similar to:
  ```bash
  vboxdrv                123456  0
  ```

- ### Launch VirtualBox

  You can now launch VirtualBox from the command line or the application menu:
  ```bash
  virtualbox
  ```

  - Add Your User to the vboxusers Group (Optional)
  To allow non-root users to access USB devices in VirtualBox, add your user to the vboxusers group:
  ```bash
  sudo usermod -aG vboxusers $USER
  ```

- ### Troubleshooting

  ```
  vboxdrv.sh: failed: modprobe vboxdrv failed. Please use 'dmesg' to find out why.
  
  There were problems setting up VirtualBox.  To re-start the set-up process, run
    /sbin/vboxconfig
  as root.  If your system is using EFI Secure Boot you may need to sign the
  kernel modules (vboxdrv, vboxnetflt, vboxnetadp, vboxpci) before you can load
  them. Please see your Linux system's documentation for more information.
  ```
  Check Secure Boot Status
  ```bash
  mokutil --sb-state
  ```
  - If the output says SecureBoot enabled, you need to either disable Secure Boot or sign the VirtualBox kernel modules.\
  The easiest solution is to disable Secure Boot in your system's `BIOS/UEFI` settings:
  
    - Reboot your system.
    - Enter the BIOS/UEFI settings (usually by pressing `F2`, `F10`, `Del`, or `Esc` during boot).
    - Locate the Secure Boot option and disable it.
    - Save changes and exit the BIOS/UEFI settings.
  
    - Reboot your system.
  After disabling Secure Boot, rebuild the VirtualBox kernel modules:
  ```bash
  sudo /sbin/vboxconfig
  ```