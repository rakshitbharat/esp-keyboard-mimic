#ifndef WIFI_MANAGER_H
#define WIFI_MANAGER_H

#include <Arduino.h>
#include <WiFi.h>
#include <DNSServer.h>
#include <ESPAsyncWebServer.h>

typedef std::function<void(String)> CommandCallback;

class WifiManager {
public:
  WifiManager();
  void setupAccessPoint();
  void checkForCommands(CommandCallback callback);
  String getMacAddress() const;
  bool isClientConnected() const;
  
private:
  AsyncWebServer server;
  DNSServer dnsServer;
  String apSSID;
  String apPassword;
  bool clientConnected;
  String clientMacAddress;
  
  void setupCaptivePortal();
  void handleRoot(AsyncWebServerRequest *request);
  void handleCommand(AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total);
  void monitorClients();
};

#endif // WIFI_MANAGER_H
