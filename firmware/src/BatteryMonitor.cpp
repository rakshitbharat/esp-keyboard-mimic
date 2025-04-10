#include "BatteryMonitor.h"

BatteryMonitor::BatteryMonitor(uint8_t pin) : 
  batteryPin(pin),
  lowBatteryThreshold(20),  // Default 20% threshold
  lastReading(0),
  lastReadTime(0) {
}

void BatteryMonitor::begin() {
  // Configure ADC pin for battery monitoring
  pinMode(batteryPin, INPUT);
  
  // ADC settings (ESP32 specific)
  analogReadResolution(12);  // 12-bit resolution for ESP32
  
  // Take initial reading
  readBatteryLevel();
  
  Serial.println("Battery monitor initialized");
}

int BatteryMonitor::getBatteryPercentage() {
  // Only read every second to avoid constant ADC readings
  unsigned long currentTime = millis();
  if (currentTime - lastReadTime > 1000) {
    readBatteryLevel();
    lastReadTime = currentTime;
  }
  
  return lastReading;
}

float BatteryMonitor::getBatteryVoltage() {
  // Get raw ADC value
  int rawValue = analogRead(batteryPin);
  
  // Convert to voltage (accounting for voltage divider if used)
  float voltage = (rawValue / (float)ADC_RESOLUTION) * ADC_REFERENCE * VOLTAGE_DIVIDER_RATIO;
  
  return voltage;
}

bool BatteryMonitor::isLowBattery() {
  return getBatteryPercentage() <= lowBatteryThreshold;
}

void BatteryMonitor::setLowBatteryThreshold(int percentage) {
  if (percentage >= 0 && percentage <= 100) {
    lowBatteryThreshold = percentage;
  }
}

int BatteryMonitor::readBatteryLevel() {
  // Get battery voltage
  float voltage = getBatteryVoltage();
  
  // Convert voltage to percentage
  int percentage = 0;
  if (voltage >= MAX_BATTERY_VOLTAGE) {
    percentage = 100;
  } else if (voltage <= MIN_BATTERY_VOLTAGE) {
    percentage = 0;
  } else {
    // Linear interpolation between min and max voltage
    percentage = (int)(((voltage - MIN_BATTERY_VOLTAGE) / 
                        (MAX_BATTERY_VOLTAGE - MIN_BATTERY_VOLTAGE)) * 100.0f);
  }
  
  // Store the reading
  lastReading = percentage;
  
  return percentage;
}
