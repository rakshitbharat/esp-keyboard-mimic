#ifndef BATTERY_MONITOR_H
#define BATTERY_MONITOR_H

#include <Arduino.h>

class BatteryMonitor {
public:
  BatteryMonitor(uint8_t pin);
  void begin();
  int getBatteryPercentage();
  float getBatteryVoltage();
  bool isLowBattery();
  void setLowBatteryThreshold(int percentage);

private:
  uint8_t batteryPin;
  int lowBatteryThreshold;
  int lastReading;
  unsigned long lastReadTime;
  
  // Constants for voltage calculation
  static constexpr int ADC_RESOLUTION = 4095;  // 12-bit ADC (2^12 - 1)
  static constexpr float ADC_REFERENCE = 3.3f; // ESP32 reference voltage
  static constexpr float VOLTAGE_DIVIDER_RATIO = 2.0f; // If using voltage divider
  
  // Battery voltage thresholds (adjust based on your battery)
  static constexpr float MIN_BATTERY_VOLTAGE = 3.2f; // Empty battery
  static constexpr float MAX_BATTERY_VOLTAGE = 4.2f; // Full battery
  
  int readBatteryLevel();
};

#endif // BATTERY_MONITOR_H
