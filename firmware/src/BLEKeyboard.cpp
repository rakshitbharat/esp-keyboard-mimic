#include "BLEKeyboard.h"

// HID report descriptor for keyboard
static const uint8_t hidReportDescriptor[] = {
  0x05, 0x01,        // Usage Page (Generic Desktop)
  0x09, 0x06,        // Usage (Keyboard)
  0xA1, 0x01,        // Collection (Application)
  0x85, 0x01,        //   Report ID (1)
  0x05, 0x07,        //   Usage Page (Key Codes)
  0x19, 0xE0,        //   Usage Minimum (224)
  0x29, 0xE7,        //   Usage Maximum (231)
  0x15, 0x00,        //   Logical Minimum (0)
  0x25, 0x01,        //   Logical Maximum (1)
  0x75, 0x01,        //   Report Size (1)
  0x95, 0x08,        //   Report Count (8)
  0x81, 0x02,        //   Input (Data, Variable, Absolute)
  0x95, 0x01,        //   Report Count (1)
  0x75, 0x08,        //   Report Size (8)
  0x81, 0x01,        //   Input (Constant) reserved byte(1)
  0x95, 0x06,        //   Report Count (6)
  0x75, 0x08,        //   Report Size (8)
  0x15, 0x00,        //   Logical Minimum (0)
  0x25, 0x65,        //   Logical Maximum (101)
  0x05, 0x07,        //   Usage Page (Key codes)
  0x19, 0x00,        //   Usage Minimum (0)
  0x29, 0x65,        //   Usage Maximum (101)
  0x81, 0x00,        //   Input (Data, Array) Key array(6 bytes)
  0xC0               // End Collection
};

// ASCII to HID code mapping
const uint8_t asciiToHID[] = {
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x2a, 0x2b, 0x28, 0x00, 0x00, 0x28, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x29, 0x00, 0x00, 0x00, 0x00,
  0x2c, 0x1e, 0x34, 0x20, 0x21, 0x22, 0x24, 0x34, 0x26, 0x27, 0x25, 0x2e, 0x36, 0x2d, 0x37, 0x38,
  0x27, 0x1e, 0x1f, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x33, 0x33, 0x36, 0x2e, 0x37, 0x38,
  0x1f, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12,
  0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x2f, 0x31, 0x30, 0x23, 0x2d,
  0x35, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12,
  0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x2f, 0x31, 0x30, 0x35, 0x00
};

// Callback class for connection events
class BLEKeyboardCallbacks : public NimBLEServerCallbacks {
public:
  BLEKeyboardCallbacks(BLEKeyboard* keyboard) : pKeyboard(keyboard) {}
  
  void onConnect(NimBLEServer* pServer) {
    pKeyboard->onConnect(pServer);
  }
  
  void onDisconnect(NimBLEServer* pServer) {
    pKeyboard->onDisconnect(pServer);
  }
  
private:
  BLEKeyboard* pKeyboard;
};

// Constructor
BLEKeyboard::BLEKeyboard() : pServer(nullptr), pHIDDevice(nullptr), pInputCharacteristic(nullptr), 
                            connected(false), currentLayout(LAYOUT_US) {
  resetKeyBuffer();
}

// Initialize the BLE keyboard
void BLEKeyboard::begin(std::string deviceName) {
  // Initialize BLE device
  NimBLEDevice::init(deviceName);
  
  // Create BLE server
  pServer = NimBLEDevice::createServer();
  
  // Set callbacks for connect/disconnect
  BLEKeyboardCallbacks* callbacks = new BLEKeyboardCallbacks(this);
  pServer->setCallbacks(callbacks);
  
  // Create a HID device
  pHIDDevice = new NimBLEHIDDevice(pServer);
  
  // Set manufacturer name
  pHIDDevice->manufacturer()->setValue("ESP32 Keyboard Mimic");
  
  // Set HID report map
  pHIDDevice->reportMap()->setValue(hidReportDescriptor, sizeof(hidReportDescriptor));
  
  // Setup input characteristic
  setupKeyboardCharacteristic();
  
  // Start HID service
  pHIDDevice->startServices();
  
  // Start advertising
  setupAdvertising();
  
  Serial.println("BLE Keyboard initialized. Waiting for connections...");
}

void BLEKeyboard::setupKeyboardCharacteristic() {
  // Create input characteristic for sending keyboard reports
  pInputCharacteristic = pHIDDevice->inputReport(1);
}

void BLEKeyboard::setupAdvertising() {
  // Setup advertising
  NimBLEAdvertising* pAdvertising = NimBLEDevice::getAdvertising();
  pAdvertising->setAppearance(HID_KEYBOARD);
  pAdvertising->addServiceUUID(pHIDDevice->hidService()->getUUID());
  pAdvertising->setScanResponse(true);
  pAdvertising->start();
}

// Called when a client connects
void BLEKeyboard::onConnect(NimBLEServer* pServer) {
  connected = true;
  Serial.println("BLE Client connected");
}

// Called when a client disconnects
void BLEKeyboard::onDisconnect(NimBLEServer* pServer) {
  connected = false;
  Serial.println("BLE Client disconnected");
  
  // Restart advertising to allow new connections
  NimBLEDevice::getAdvertising()->start();
}

bool BLEKeyboard::isConnected() {
  return connected;
}

// Write a single character
void BLEKeyboard::write(char c) {
  if (!connected) return;
  
  // Get key mapping based on current layout
  KeyMapping mapping = getKeyMapping(c);
  
  // Apply shift if needed
  if (mapping.needShift) {
    keyBuffer[0] |= 0x02;  // Left shift modifier
  } else {
    keyBuffer[0] &= ~0x02; // Clear shift modifier
  }
  
  // Press and release key
  press(mapping.hidCode);
  delay(5);
  release(mapping.hidCode);
}

// Get current keyboard layout
KeyboardLayout BLEKeyboard::getLayout() const {
  return currentLayout;
}

// Write a string
void BLEKeyboard::write(const char* str) {
  if (!connected) return;
  
  for (size_t i = 0; i < strlen(str); i++) {
    write(str[i]);
    delay(5);
  }
}

// Press a key
void BLEKeyboard::press(uint8_t k) {
  if (!connected) return;
  
  // Shift modifier for capital letters or symbols
  bool needsShift = (k & 0x80);
  k &= 0x7F;  // Remove shift bit
  
  // Set key in buffer
  if (needsShift) {
    keyBuffer[0] |= 0x02;  // Left shift
  }
  
  // Find an empty slot in the buffer
  for (int i = 2; i < 8; i++) {
    if (keyBuffer[i] == 0) {
      keyBuffer[i] = k;
      break;
    }
  }
  
  sendReport(keyBuffer);
}

// Release a key
void BLEKeyboard::release(uint8_t k) {
  if (!connected) return;
  
  k &= 0x7F;  // Remove shift bit
  
  // Reset shift
  keyBuffer[0] &= ~0x02;
  
  // Find the key in the buffer
  for (int i = 2; i < 8; i++) {
    if (keyBuffer[i] == k) {
      keyBuffer[i] = 0;
    }
  }
  
  sendReport(keyBuffer);
}

// Release all keys
void BLEKeyboard::releaseAll() {
  if (!connected) return;
  
  resetKeyBuffer();
  sendReport(keyBuffer);
}

// Reset key buffer to zeros
void BLEKeyboard::resetKeyBuffer() {
  for (int i = 0; i < 8; i++) {
    keyBuffer[i] = 0;
  }
}

// Send the HID report
void BLEKeyboard::sendReport(uint8_t* keyBuffer) {
  if (connected && pInputCharacteristic != nullptr) {
    pInputCharacteristic->setValue(keyBuffer, 8);
    pInputCharacteristic->notify();
  }
}

// Get key mapping based on current layout
KeyMapping BLEKeyboard::getKeyMapping(char c) {
  if (c < 0 || c > 127) {
    KeyMapping emptyMapping = {0, false};
    return emptyMapping;
  }

  switch (currentLayout) {
    case LAYOUT_US:
      return US_LAYOUT[c];
    case LAYOUT_GERMAN:
      return GERMAN_LAYOUT[c];
    case LAYOUT_FRENCH:
      return FRENCH_LAYOUT[c];
    default:
      // Default to US layout
      return US_LAYOUT[c];
  }
}

// Set the keyboard layout
void BLEKeyboard::setLayout(KeyboardLayout layout) {
  currentLayout = layout;
  Serial.print("Keyboard layout set to: ");
  Serial.println(layout);
}
