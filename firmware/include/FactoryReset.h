#ifndef FACTORY_RESET_H
#define FACTORY_RESET_H

#include <Arduino.h>
#include <Preferences.h>

class FactoryReset {
public:
  FactoryReset(uint8_t buttonPin = 0);
  void begin();
  void check();
  
private:
  uint8_t resetButtonPin;
  unsigned long buttonPressStartTime;
  bool buttonPressed;
  const unsigned long FACTORY_RESET_PRESS_DURATION = 10000; // 10 seconds
  
  void resetToDefaults();
  void flashLED(int times);
};

#endif // FACTORY_RESET_H
