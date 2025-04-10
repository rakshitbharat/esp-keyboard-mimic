#ifndef BLE_KEYBOARD_H
#define BLE_KEYBOARD_H

#include <Arduino.h>
#include <NimBLEDevice.h>
#include <NimBLEHIDDevice.h>
#include <NimBLEServer.h>
#include "KeyboardLayouts.h"

// Forward declaration
class BLEKeyboardCallbacks;

class BLEKeyboard
{
  friend class BLEKeyboardCallbacks;

public:
  BLEKeyboard();
  void begin(std::string deviceName);
  bool isConnected();
  void write(char c);
  void write(const char *str);
  void press(uint8_t k);
  void release(uint8_t k);
  void releaseAll();
  void setLayout(KeyboardLayout layout);
  KeyboardLayout getLayout() const;

protected:
  void onConnect(NimBLEServer *pServer);
  void onDisconnect(NimBLEServer *pServer);

private:
  NimBLEServer *pServer;
  NimBLEHIDDevice *pHIDDevice;
  NimBLECharacteristic *pInputCharacteristic;
  bool connected;
  uint8_t keyBuffer[8];
  KeyboardLayout currentLayout;

  void sendReport(uint8_t *keyBuffer);
  void resetKeyBuffer();
  KeyMapping getKeyMapping(char c);
  void setupKeyboardCharacteristic();
  void setupCallbacks();
  void setupAdvertising();
};

#endif // BLE_KEYBOARD_H
