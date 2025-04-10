# ESP Keyboard Mimic - Technology Architecture

## 1. Development Platforms & Technologies

### 1.1 ESP32 Firmware Development

#### 1.1.1 Development Framework
- **ESP-IDF** (Espressif IoT Development Framework)
  - Version: 4.4 or newer
  - Rationale: Native support for ESP32 features, comprehensive API access, and direct hardware control

#### 1.1.2 Bluetooth HID Implementation
- **ESP32 Bluetooth Stack**
  - Integrated with ESP-IDF
  - Provides Bluetooth HID device emulation
  - Support for keyboard, mouse, and composite devices
  - Bluetooth Classic and BLE support

#### 1.1.3 Bluetooth Stack
- **ESP32 Bluedroid Stack**
  - BLE 4.2+ support
  - GATT services and characteristics for data transfer
  - Secure connection features

#### 1.1.4 Programming Language
- **C/C++**
  - For firmware development
  - Optimized for embedded systems resources

#### 1.1.5 Build System
- **CMake with ESP-IDF Build System**
  - Project configuration
  - Dependency management
  - Binary generation and flashing

### 1.2 Desktop Application Development

#### 1.2.1 Application Framework
- **Electron**
  - Version: 14.0 or newer
  - Rationale: Cross-platform support, modern UI capabilities, and native OS integration

#### 1.2.2 Programming Languages
- **TypeScript/JavaScript**
  - Frontend & application logic
  - Strong typing with TypeScript for better code reliability
- **HTML/CSS**
  - UI rendering
  - Styling with CSS frameworks

#### 1.2.3 UI Framework
- **React**
  - Component-based architecture
  - Efficient rendering with virtual DOM
  - Extensive ecosystem of libraries

#### 1.2.4 CSS Framework
- **Tailwind CSS**
  - Utility-first approach
  - Customizable design system
  - Responsive layouts

#### 1.2.5 Bluetooth Communication
- **Web Bluetooth API** (primary)
  - For Chrome and supported browsers
- **Noble** (Node.js Bluetooth library)
  - For broader platform support through Electron's Node.js integration

#### 1.2.6 State Management
- **Redux** with **Redux Toolkit**
  - Centralized state management
  - Predictable state updates
  - DevTools for debugging

#### 1.2.7 Database/Storage
- **IndexedDB** (browser)
  - For snippet storage and settings
- **Electron Store**
  - For application configuration
- **SQLite** (optional)
  - For more complex data storage needs

#### 1.2.8 Build Tools
- **Webpack**
  - Module bundling
  - Code splitting
  - Asset optimization
- **Electron Forge**
  - Application packaging and distribution
  - Platform-specific builds

### 1.3 Web Configuration Portal

#### 1.3.1 Implementation
- **ESP32 Web Server**
  - Lightweight HTTP server
  - Captive portal for configuration
  - REST API for settings management

#### 1.3.2 Frontend Technologies
- **Vanilla JavaScript** or **Preact**
  - Lightweight alternative to React for resource-constrained environments
- **Minimal CSS**
  - Custom styles or minimal framework like **PicoCSS**

## 2. Technology Integration Points

### 2.1 Dual-Device Connection Architecture

#### 2.1.1 Connection Topology Challenge
- **Key Challenge**: ESP32 must simultaneously:
  1. Act as a Bluetooth HID keyboard to the target device (where text will be typed)
  2. Communicate with the controller device (running our desktop application)

#### 2.1.2 Solution Architecture
- **Bluetooth HID Connection**: Primary connection to target device
  - ESP32 connects to target device via Bluetooth
  - Acts as standard HID keyboard device
  - No special software required on target device

- **WiFi Connection**: Secondary connection to controller device
  - ESP32 creates WiFi access point
  - Desktop controller application connects to this network
  - Text content transferred over this separate connection
  - Completely independent from the Bluetooth HID connection

![Dual-Device Connection Architecture](/diagrams/dual-connection-architecture.png)

#### 2.1.3 WiFi Access Point Security Implementation

- **Limited Connection WiFi Hotspot**
  - ESP32 creates a secure WiFi access point with maximum 1 client capacity
  - Prevents multiple connections that could lead to unauthorized access
  - Client MAC address whitelisting for additional security

- **Password Management**
  - Standard default password across all devices for ease of use
  - Option to change password via desktop application
  - Password stored in encrypted non-volatile storage on ESP32
  - Password change requires current connected session for verification

- **Factory Reset Mechanism**
  - Hardware-based password reset option
    - Physical button combination (press and hold during boot)
    - Timing-based press pattern for security
  - Resets WiFi password to factory default
  - Visual indicator (LED pattern) to confirm reset
  - Optional: Reset counter in EEPROM to prevent brute force attacks

- **Connection Security**
  - WPA2/WPA3 encryption for WiFi connection
  - Unique session token generated on each connection
  - Connection timeout after period of inactivity
  - HTTPS for web configuration interface

#### 2.1.4 Alternative Connection Options

| Connection Method | Pros | Cons | Recommendation |
|------------------|------|------|----------------|
| WiFi + Bluetooth | Longer range for controller, universal HID support | Higher power consumption | Best for stationary setups |
| WiFi + BLE | Lower power, modern devices | Limited compatibility with older devices | Best for most use cases |
| ESP-NOW + Bluetooth | Very low power, simple protocol | Limited controller features, shorter range | For battery-critical applications |

### 2.2 Communication Protocol Design

#### 2.2.1 Protocol Stack
- **Bluetooth LE**
  - GATT service for keyboard control
  - Characteristic for text transmission
  - Notification characteristic for status updates

#### 2.2.2 Data Format
- **JSON** for configuration data
- **Binary Protocol** for text transmission (efficiency)
- **Protocol Buffers** (optional for complex structured data)

#### 2.2.3 Security Implementation
- **AES-256-CCM** encryption
- Challenge-response authentication
- Secure key exchange

### 2.3 Configuration Synchronization

#### 2.3.1 Local Synchronization
- **Bluetooth LE** for direct sync
- **QR Code** for quick configuration transfer

#### 2.3.2 Future Cloud Sync
- **End-to-end encrypted** synchronization
- **REST API** with JWT authentication
- **WebSocket** for real-time updates

## 3. Development Tools

### 3.1 ESP32 Development
- **VSCode** with ESP-IDF extension
- **PlatformIO** (alternative IDE integration)
- **Logic Analyzer** for hardware debugging

### 3.2 Desktop Application Development
- **VSCode** with JavaScript/TypeScript extensions
- **Chrome DevTools** for debugging
- **Electron DevTools Extension**
- **Redux DevTools**

### 3.3 Testing Tools
- **Jest** for JavaScript unit testing
- **Playwright/Spectron** for E2E testing
- **Unity** for C/C++ unit testing
- **ESLint/Prettier** for code quality

### 3.4 CI/CD
- **GitHub Actions** for automated builds and testing
- **Electron Builder** for automated packaging

## 4. Hardware Technology Selection

### 4.1 Recommended ESP32 Variants
- **ESP32-WROOM-32** (primary recommendation)
  - Bluetooth and BLE capability
  - Dual-core processor for parallel tasks
  - Excellent wireless performance
- **ESP32-C3** (alternative for size-constrained designs)
  - Smaller form factor
  - Lower power consumption
  - Single-core RISC-V processor

### 4.2 Physical Control Panel Components
- **ESP32-based controller** for button interface
- **WS2812B RGB LEDs** for button indicators
- **OLED Display** for status information
- **ESP32-C3** for wireless connectivity

## 5. Technology Selection Rationale

### 5.1 Desktop Application
- **Electron** chosen for:
  - Cross-platform compatibility (Windows, macOS, Linux)
  - Native system access required for keyboard simulation
  - Modern web technologies for UI development
  - Active community and extensive libraries

### 5.2 ESP32 Firmware
- **ESP-IDF** chosen over Arduino for:
  - Full access to ESP32 capabilities
  - Better performance and control
  - Native BLE stack implementation

### 5.3 Bluetooth vs. Other Communication Options
- **Bluetooth LE** selected for:
  - Universal availability across platforms
  - Lower power consumption than Wi-Fi
  - Sufficient bandwidth for text transmission
  - Standard security features

## 6. Technology Constraints & Mitigations

### 6.1 Platform Limitations
- **Web Bluetooth API** limitations:
  - Limited browser support (primarily Chrome)
  - Mitigation: Noble library integration via Electron

### 6.2 Security Considerations
- **ESP32 Secure Boot** implementation
  - Flash encryption for firmware protection
  - Secure key storage in eFuse

### 6.3 Performance Optimization
- **Typescript** for type safety while maintaining performance
- **Binary protocol** for efficient Bluetooth data transfer
- **Local storage** to minimize cloud dependencies
