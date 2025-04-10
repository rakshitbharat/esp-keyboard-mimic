#include "WebConfig.h"

const char* CONFIG_NAMESPACE = "keymimic";

WebConfig::WebConfig() {
  // Default values
  deviceName = "ESP-Keyboard-Mimic";
}

void WebConfig::begin() {
  // Load settings from preferences
  loadSettings();
}

void WebConfig::loadSettings() {
  preferences.begin(CONFIG_NAMESPACE, true);
  
  // Load device name
  deviceName = preferences.getString("device_name", deviceName);
  
  // Load other config values
  configValues["typing_delay"] = preferences.getString("typing_delay", "50");
  configValues["auto_connect"] = preferences.getString("auto_connect", "true");
  configValues["keyboard_layout"] = preferences.getString("keyboard_layout", "US");
  
  preferences.end();
  
  Serial.println("Configuration loaded");
}

void WebConfig::saveSettings() {
  preferences.begin(CONFIG_NAMESPACE, false);
  
  // Save device name
  preferences.putString("device_name", deviceName);
  
  // Save other config values
  for (auto const& pair : configValues) {
    preferences.putString(pair.first.c_str(), pair.second);
  }
  
  preferences.end();
  
  Serial.println("Configuration saved");
}

void WebConfig::updateSettings(JsonObject& settings) {
  bool changed = false;
  
  // Update device name if provided
  if (settings.containsKey("device_name")) {
    String newName = settings["device_name"].as<String>();
    if (newName != deviceName && newName.length() > 0) {
      deviceName = newName;
      changed = true;
    }
  }
  
  // Update other settings
  for (JsonPair kv : settings) {
    String key = kv.key().c_str();
    if (key != "device_name") { // Already handled above
      String value = kv.value().as<String>();
      
      // Check if this is a valid setting key
      if (configValues.find(key) != configValues.end()) {
        if (configValues[key] != value) {
          configValues[key] = value;
          changed = true;
        }
      } else {
        // New key, add it
        configValues[key] = value;
        changed = true;
      }
    }
  }
  
  // Save if anything changed
  if (changed) {
    saveSettings();
  }
}

String WebConfig::getDeviceName() const {
  return deviceName;
}
