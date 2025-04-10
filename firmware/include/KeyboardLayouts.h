#ifndef KEYBOARD_LAYOUTS_H
#define KEYBOARD_LAYOUTS_H

#include <Arduino.h>

// Layout enum to identify different keyboard layouts
enum KeyboardLayout {
  LAYOUT_US = 0,
  LAYOUT_UK = 1,
  LAYOUT_GERMAN = 2,
  LAYOUT_FRENCH = 3,
  LAYOUT_SPANISH = 4,
  LAYOUT_ITALIAN = 5,
  // Add more layouts as needed
};

// Structure to hold mapping from ASCII to HID code with shift modifier
struct KeyMapping {
  uint8_t hidCode;
  bool needShift;
};

// US layout mapping (default)
const KeyMapping US_LAYOUT[128] = {
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, // 0-7
  {0x2a, false}, {0x2b, false}, {0x28, false}, {0, false}, {0, false}, {0x28, false}, {0, false}, {0, false}, // 8-15
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, // 16-23
  {0, false}, {0, false}, {0, false}, {0x29, false}, {0, false}, {0, false}, {0, false}, {0, false}, // 24-31
  {0x2c, false}, {0x1e, true}, {0x34, true}, {0x20, true}, {0x21, true}, {0x22, true}, {0x24, true}, {0x34, false}, // 32-39
  {0x26, true}, {0x27, true}, {0x25, true}, {0x2e, true}, {0x36, false}, {0x2d, false}, {0x37, false}, {0x38, false}, // 40-47
  {0x27, false}, {0x1e, false}, {0x1f, false}, {0x20, false}, {0x21, false}, {0x22, false}, {0x23, false}, {0x24, false}, // 48-55
  {0x25, false}, {0x26, false}, {0x33, true}, {0x33, false}, {0x36, true}, {0x2e, false}, {0x37, true}, {0x38, true}, // 56-63
  {0x1f, true}, {0x04, true}, {0x05, true}, {0x06, true}, {0x07, true}, {0x08, true}, {0x09, true}, {0x0a, true}, // 64-71
  {0x0b, true}, {0x0c, true}, {0x0d, true}, {0x0e, true}, {0x0f, true}, {0x10, true}, {0x11, true}, {0x12, true}, // 72-79
  {0x13, true}, {0x14, true}, {0x15, true}, {0x16, true}, {0x17, true}, {0x18, true}, {0x19, true}, {0x1a, true}, // 80-87
  {0x1b, true}, {0x1c, true}, {0x1d, true}, {0x2f, false}, {0x31, false}, {0x30, false}, {0x23, true}, {0x2d, true}, // 88-95
  {0x35, false}, {0x04, false}, {0x05, false}, {0x06, false}, {0x07, false}, {0x08, false}, {0x09, false}, {0x0a, false}, // 96-103
  {0x0b, false}, {0x0c, false}, {0x0d, false}, {0x0e, false}, {0x0f, false}, {0x10, false}, {0x11, false}, {0x12, false}, // 104-111
  {0x13, false}, {0x14, false}, {0x15, false}, {0x16, false}, {0x17, false}, {0x18, false}, {0x19, false}, {0x1a, false}, // 112-119
  {0x1b, false}, {0x1c, false}, {0x1d, false}, {0x2f, true}, {0x31, true}, {0x30, true}, {0x35, true}, {0, false} // 120-127
};

// German layout placeholder (would need to be properly defined)
const KeyMapping GERMAN_LAYOUT[128] = {
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, // 0-7
  {0x2a, false}, {0x2b, false}, {0x28, false}, {0, false}, {0, false}, {0x28, false}, {0, false}, {0, false}, // 8-15
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, // 16-23
  {0, false}, {0, false}, {0, false}, {0x29, false}, {0, false}, {0, false}, {0, false}, {0, false}, // 24-31
  {0x2c, false}, {0x1e, true}, {0x1f, true}, {0x31, false}, {0x21, true}, {0x22, true}, {0x23, true}, {0x31, true}, // 32-39
  {0x25, true}, {0x26, true}, {0x30, true}, {0x30, false}, {0x36, false}, {0x38, false}, {0x37, false}, {0x24, false}, // 40-47
  {0x27, false}, {0x1e, false}, {0x1f, false}, {0x20, false}, {0x21, false}, {0x22, false}, {0x23, false}, {0x24, false}, // 48-55
  {0x25, false}, {0x26, false}, {0x37, true}, {0x36, true}, {0x64, false}, {0x38, true}, {0x64, true}, {0x2d, true}, // 56-63
  {0x14, true}, {0x04, true}, {0x05, true}, {0x06, true}, {0x07, true}, {0x08, true}, {0x09, true}, {0x0a, true}, // 64-71
  {0x0b, true}, {0x0c, true}, {0x0d, true}, {0x0e, true}, {0x0f, true}, {0x10, true}, {0x11, true}, {0x12, true}, // 72-79
  {0x13, true}, {0x14, true}, {0x15, true}, {0x16, true}, {0x17, true}, {0x18, true}, {0x19, true}, {0x1a, true}, // 80-87
  {0x1b, true}, {0x1c, true}, {0x1d, true}, {0x2f, false}, {0x64, false}, {0x32, false}, {0x64, true}, {0x2d, true}, // 88-95
  {0x35, false}, {0x04, false}, {0x05, false}, {0x06, false}, {0x07, false}, {0x08, false}, {0x09, false}, {0x0a, false}, // 96-103
  {0x0b, false}, {0x0c, false}, {0x0d, false}, {0x0e, false}, {0x0f, false}, {0x10, false}, {0x11, false}, {0x12, false}, // 104-111
  {0x13, false}, {0x14, false}, {0x15, false}, {0x16, false}, {0x17, false}, {0x18, false}, {0x19, false}, {0x1a, false}, // 112-119
  {0x1b, false}, {0x1c, false}, {0x1d, false}, {0x2f, true}, {0x64, false}, {0x32, true}, {0x35, true}, {0, false} // 120-127
};

// French layout placeholder (would need to be properly defined)
const KeyMapping FRENCH_LAYOUT[128] = {
  // ... (similar structure as above, but mapping for French keyboard)
  // This is just a placeholder and would need proper implementation
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
  {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false}, {0, false},
};

#endif // KEYBOARD_LAYOUTS_H
