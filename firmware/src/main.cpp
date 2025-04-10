#include <Arduino.h>
#include <WiFi.h>
#include <NimBLEDevice.h>
#include <NimBLEHIDDevice.h>
#include <NimBLEServer.h>
#include <NimBLECharacteristic.h>
#include <ArduinoJson.h>
#include <ESPAsyncWebServer.h>
#include "BLEKeyboard.h"
#include "WifiManager.h"
#include "WebConfig.h"
#include "FactoryReset.h"
#include "BatteryMonitor.h"

// Constants
#define DEVICE_NAME "ESP-Keyboard-Mimic"
#define STOP_BUTTON_PIN 0 // GPIO0 - typically the BOOT button on most ESP32 dev boards
#define BATTERY_PIN 34   // GPIO34 - ADC1_6 channel for battery monitoring

// Global objects
BLEKeyboard bleKeyboard;
WifiManager wifiManager;
WebConfig webConfig;
FactoryReset factoryReset(STOP_BUTTON_PIN);
BatteryMonitor batteryMonitor(BATTERY_PIN);

// Variables
volatile bool typing_active = false;
volatile bool stop_requested = false;
String current_text = "";

// Function prototypes
void setupHardware();
void setupBluetooth();
void setupWifi();
void processIncomingCommand(String command);

void IRAM_ATTR stopButtonISR() {
  stop_requested = true;
}

void setup() {
  Serial.begin(115200);
  Serial.println("ESP Keyboard Mimic - Starting...");
  
  // Setup hardware (buttons, LEDs, etc)
  setupHardware();
  
  // Setup Bluetooth HID keyboard
  setupBluetooth();
  
  // Setup WiFi access point
  setupWifi();
  
  // Initialize factory reset mechanism
  factoryReset.begin();
  
  Serial.println("ESP Keyboard Mimic - Ready!");
}

void loop() {
  // Check for stop button press
  if (stop_requested) {
    typing_active = false;
    stop_requested = false;
    Serial.println("Typing stopped by hardware button");
  }
  
  // Check for factory reset
  factoryReset.check();
  
  // If typing is active and we have text to type
  if (typing_active && current_text.length() > 0) {
    Serial.println("Starting to type: " + current_text);
    
    // Type the text character by character
    for (size_t i = 0; i < current_text.length() && !stop_requested; i++) {
      bleKeyboard.write(current_text.charAt(i));
      delay(50); // Small delay between keypresses
    }
    
    Serial.println("Typing completed");
    typing_active = false;
    current_text = "";
  }
  
  // Check for commands from WiFi client
  wifiManager.checkForCommands(processIncomingCommand);
  
  delay(50); // Small delay to prevent excessive CPU usage
}

void setupHardware() {
  // Set up stop button with interrupt
  pinMode(STOP_BUTTON_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(STOP_BUTTON_PIN), stopButtonISR, FALLING);
  
  // Initialize battery monitoring
  batteryMonitor.begin();
  batteryMonitor.setLowBatteryThreshold(15); // 15% as low battery warning
  
  Serial.println("Hardware setup complete");
}

void setupBluetooth() {
  // Initialize BLE keyboard
  bleKeyboard.begin(DEVICE_NAME);
  
  Serial.println("Bluetooth HID keyboard setup complete");
}

void setupWifi() {
  // Initialize WiFi Access Point
  wifiManager.setupAccessPoint();
  
  // Setup web configuration portal
  webConfig.begin();
  
  Serial.println("WiFi access point setup complete");
}

void processIncomingCommand(String command) {
  // Parse JSON command
  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, command);
  
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
    return;
  }
  
  // Process commands
  String action = doc["action"].as<String>();
  
  if (action == "type") {
    if (!bleKeyboard.isConnected()) {
      Serial.println("Error: Cannot type, Bluetooth not connected");
      return;
    }
    
    current_text = doc["text"].as<String>();
    typing_active = true;
    Serial.println("Received type command with text length: " + String(current_text.length()));
  } 
  else if (action == "stop") {
    typing_active = false;
    current_text = "";
    Serial.println("Received stop command");
  }
  else if (action == "settings") {
    // Process settings changes
    JsonObject settings = doc["settings"].as<JsonObject>();
    webConfig.updateSettings(settings);
    Serial.println("Settings updated");
  }
  else if (action == "status") {
    // Just a status check, no action needed
    Serial.println("Status check received");
  }
  else {
    Serial.println("Unknown action: " + action);
  }
}
