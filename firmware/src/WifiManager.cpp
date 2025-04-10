#include "WifiManager.h"
#include <Preferences.h>

const char* DEFAULT_AP_PASSWORD = "keyboardmimic";
const char* WIFI_PREFS_NAMESPACE = "wificonfig";

// Queue to store incoming commands
String commandQueue = "";
bool newCommand = false;

WifiManager::WifiManager() : server(80), clientConnected(false) {
  // Generate a unique SSID based on ESP32's MAC address
  uint8_t mac[6];
  WiFi.macAddress(mac);
  char macStr[18];
  snprintf(macStr, sizeof(macStr), "%02X%02X%02X%02X%02X%02X", 
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
  
  apSSID = String("ESP-KeyMimic-") + String(macStr).substring(6);
  
  // Load password from preferences, or use default
  Preferences preferences;
  preferences.begin(WIFI_PREFS_NAMESPACE, true);
  apPassword = preferences.getString("ap_password", DEFAULT_AP_PASSWORD);
  preferences.end();
}

void WifiManager::setupAccessPoint() {
  // Stop any existing WiFi
  WiFi.disconnect(true);
  delay(500);
  
  // Configure access point with unique SSID and password
  WiFi.mode(WIFI_AP);
  bool success = WiFi.softAP(apSSID.c_str(), apPassword.c_str(), 1, false, 1); // Channel 1, not hidden, max 1 connection
  
  if (!success) {
    Serial.println("Failed to create WiFi access point. Retrying...");
    delay(1000);
    WiFi.softAP(apSSID.c_str(), apPassword.c_str(), 1, false, 1);
  }
  
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);
  
  // Setup web server routes
  server.on("/", HTTP_GET, [this](AsyncWebServerRequest *request) {
    this->handleRoot(request);
  });
  
  // Add status endpoint for connectivity testing
  server.on("/status", HTTP_GET, [this](AsyncWebServerRequest *request) {
    JsonDocument doc;
    doc["status"] = "online";
    doc["deviceName"] = apSSID;
    doc["clientConnected"] = clientConnected;
    
    // Add battery status if available (using external batteryMonitor)
    extern BatteryMonitor batteryMonitor;
    doc["batteryPercentage"] = batteryMonitor.getBatteryPercentage();
    doc["batteryVoltage"] = batteryMonitor.getBatteryVoltage();
    doc["lowBattery"] = batteryMonitor.isLowBattery();
    
    String response;
    serializeJson(doc, response);
    request->send(200, "application/json", response);
  });
  
  // Handle commands via POST requests
  server.on("/command", HTTP_POST, 
    [](AsyncWebServerRequest *request) {},
    [](AsyncWebServerRequest *request, String filename, size_t index, uint8_t *data, size_t len, bool final) {},
    [this](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
      this->handleCommand(request, data, len, index, total);
    }
  );
  
  // Setup captive portal
  setupCaptivePortal();
  
  // Start server
  server.begin();
  Serial.println("Web server started");
}

void WifiManager::setupCaptivePortal() {
  // Setup DNS server for captive portal
  dnsServer.start(53, "*", WiFi.softAPIP());
  
  // Handle DNS requests
  server.onNotFound([](AsyncWebServerRequest *request) {
    request->redirect("/");
  });
}

void WifiManager::handleRoot(AsyncWebServerRequest *request) {
  String html = "<!DOCTYPE html><html><head>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1'>";
  html += "<style>body{font-family:Arial;margin:0;padding:20px;}";
  html += "h1{color:#0066cc;}button{padding:10px;margin:5px;}</style>";
  html += "<title>ESP Keyboard Mimic</title></head><body>";
  html += "<h1>ESP Keyboard Mimic</h1>";
  html += "<p>Configuration portal will be available in the desktop application.</p>";
  html += "<p>Please launch the ESP Keyboard Mimic desktop application to configure this device.</p>";
  html += "</body></html>";
  
  request->send(200, "text/html", html);
}

void WifiManager::handleCommand(AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
  // Create a string from the received data
  String command = String((char*)data, len);
  
  // Store the command in the queue
  commandQueue = command;
  newCommand = true;
  
  // Store the client MAC address
  clientMacAddress = request->client()->remoteIP().toString();
  clientConnected = true;
  
  // Send a basic response
  request->send(200, "application/json", "{\"status\":\"ok\"}");
}

void WifiManager::checkForCommands(CommandCallback callback) {
  // Check for disconnected clients
  monitorClients();
  
  // Check if there's a new command in the queue
  if (newCommand) {
    callback(commandQueue);
    commandQueue = "";
    newCommand = false;
  }
}

void WifiManager::monitorClients() {
  // Check if any clients are connected to the AP
  if (WiFi.softAPgetStationNum() == 0) {
    clientConnected = false;
  }
}

String WifiManager::getMacAddress() const {
  uint8_t mac[6];
  WiFi.macAddress(mac);
  char macStr[18];
  snprintf(macStr, sizeof(macStr), "%02X:%02X:%02X:%02X:%02X:%02X", 
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
  return String(macStr);
}

bool WifiManager::isClientConnected() const {
  return clientConnected;
}
