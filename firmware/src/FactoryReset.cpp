#include "FactoryReset.h"

const char* WIFI_PREFS_NAMESPACE = "wificonfig";
const char* DEFAULT_AP_PASSWORD = "keyboardmimic";

// Constructor
FactoryReset::FactoryReset(uint8_t buttonPin) 
  : resetButtonPin(buttonPin), 
    buttonPressed(false), 
    buttonPressStartTime(0) {
}

void FactoryReset::begin() {
  // Set up reset button pin
  pinMode(resetButtonPin, INPUT_PULLUP);
  
  // Simple LED feedback using built-in LED if available
  #ifdef LED_BUILTIN
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  #endif
  
  Serial.println("Factory reset mechanism initialized");
}

void FactoryReset::check() {
  // Check if button is pressed - we don't use digitalRead directly 
  // as it's also used for the stop button interrupt
  static unsigned long lastCheckTime = 0;
  static bool lastButtonState = false;
  
  if (millis() - lastCheckTime < 100) {
    // Don't check too frequently
    return;
  }
  lastCheckTime = millis();
  
  bool currentState = (digitalRead(resetButtonPin) == LOW);
  
  // Button just pressed
  if (currentState && !buttonPressed && !lastButtonState) {
    buttonPressed = true;
    buttonPressStartTime = millis();
    Serial.println("Button held, continue holding for 10 seconds to factory reset");
  }
  
  // Button still pressed, check duration
  else if (currentState && buttonPressed) {
    unsigned long pressDuration = millis() - buttonPressStartTime;
    
    // If pressed for required duration, perform factory reset
    if (pressDuration >= FACTORY_RESET_PRESS_DURATION) {
      Serial.println("Factory reset initiated");
      resetToDefaults();
      
      // Reset the button state
      buttonPressed = false;
      
      // Flash LED to indicate reset
      flashLED(5);
      
      Serial.println("Factory reset completed");
    }
  }
  
  // Button released before reset duration
  else if (!currentState && buttonPressed) {
    buttonPressed = false;
    Serial.println("Button released, factory reset canceled");
  }
  
  lastButtonState = currentState;
}

void FactoryReset::resetToDefaults() {
  // Reset WiFi password to default
  Preferences preferences;
  preferences.begin(WIFI_PREFS_NAMESPACE, false);
  
  // Set default password
  preferences.putString("ap_password", DEFAULT_AP_PASSWORD);
  
  preferences.end();
  
  Serial.println("WiFi settings reset to defaults");
}

void FactoryReset::flashLED(int times) {
  #ifdef LED_BUILTIN
  for (int i = 0; i < times; i++) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(200);
    digitalWrite(LED_BUILTIN, LOW);
    delay(200);
  }
  #else
  // If no built-in LED, just add a delay to indicate processing
  delay(times * 400);
  #endif
}
