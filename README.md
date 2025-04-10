# ESP Keyboard Mimic

A hardware-software solution for wireless automatic keyboard input using ESP32 microcontroller.

## Problem Statement

Many secure systems prevent copy-pasting of sensitive information like passwords or banking details, forcing users to manually type this information. This project provides a secure alternative by emulating physical keyboard input. Additionally, it assists with repetitive typing tasks and text entry where copy-paste functionality is limited or unavailable.

## Features

- ESP32-based Bluetooth HID keyboard emulation
- Floating window application for text capture with one-click typing
- Quick access buttons for frequently used text snippets
- Most recently/frequently used content tracking
- Completely wireless operation with no USB dependency
- WiFi & Bluetooth connectivity for device communication
- Physical stop button for immediate interruption
- Secure text transmission from application to ESP device
- Exclusive device pairing for enhanced security

## Components

### Hardware
- ESP32 development board (WROOM-32 or C3 variant)
- Fully wireless connection to target device
- Battery power option for true wireless mobility
- Optional custom PCB with physical controls
- Future expansion: Physical control panel with up to 50 programmable buttons

### Software
- ESP32 firmware with Bluetooth HID implementation
- Cross-platform desktop application with floating interface
- Quick access hotkeys for frequent text snippets
- Web configuration portal

## Development Roadmap

1. **Phase 1:** ESP32 basic keyboard emulation and connectivity
2. **Phase 2:** Floating window application development with quick access buttons
3. **Phase 3:** Web portal implementation
4. **Phase 4:** Security implementation
   - Bluetooth bonding with paired device only
   - Encryption of text during transmission
   - Device authentication mechanism
   - Secure erase functionality for sensitive data
   - Hardware button confirmation for security operations
5. **Phase 5:** Password/text manager functionality
6. **Phase 6:** Physical control panel with programmable TOP buttons

## License
MIT License
