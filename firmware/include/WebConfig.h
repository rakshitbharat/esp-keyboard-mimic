#ifndef WEB_CONFIG_H
#define WEB_CONFIG_H

#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <Preferences.h>
#include <map>
#include <functional>

class WebConfig {
public:
  WebConfig();
  void begin();
  void updateSettings(JsonObject& settings);
  String getDeviceName() const;
  
private:
  String deviceName;
  std::map<String, String> configValues;
  Preferences preferences;
  
  void loadSettings();
  void saveSettings();
  void handleSettingsUpdate(AsyncWebServerRequest *request, JsonVariant &json);
};

#endif // WEB_CONFIG_H
