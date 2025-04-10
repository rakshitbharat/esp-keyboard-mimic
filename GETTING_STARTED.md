# Getting Started with ESP Keyboard Mimic

This guide will help you set up and start working with the ESP Keyboard Mimic project, even if you're new to programming or hardware development.

## Prerequisites

1. Install Visual Studio Code from: https://code.visualstudio.com/
2. Have an ESP32 development board ready
3. Have a USB cable to connect your ESP32 to your computer

## First Time Setup

1. Open Visual Studio Code
2. Install the PlatformIO IDE extension:

   - Click the Extensions icon in the sidebar (or press Ctrl+Shift+X)
   - Search for "PlatformIO IDE"
   - Click Install

3. Open this project:

   - File -> Open Workspace from File...
   - Select the `esp-keyboard-mimic.code-workspace` file
   - Click "Yes, I trust the authors" when prompted

4. Wait for automatic setup:
   - VS Code will install recommended extensions
   - PlatformIO will initialize the project (this may take a few minutes)

## Building and Uploading

You can use these easy methods to work with your device:

1. Using the Status Bar (easiest):

   - Click the ➡️ arrow icon to build and upload
   - Click the 🔌 icon to open the serial monitor

2. Using Command Palette (Ctrl/Cmd + Shift + P):
   - Type "PlatformIO:" and select from:
     - "Build" - Compile the project
     - "Upload" - Upload to your ESP32
     - "Monitor" - View serial output

## Common Tasks

### Making Changes

1. Source code is in the `firmware/src` folder
2. Header files are in the `firmware/include` folder
3. Changes are auto-saved after a short delay

### Troubleshooting

- If upload fails:
  1. Check if your ESP32 is connected
  2. Check if the correct COM port is selected
  3. Hold the BOOT button while uploading if needed

### Getting Help

1. Check the `docs` folder for detailed documentation
2. Use the "Todo Tree" extension to find TODO comments
3. Use GitLens to understand code history

## Project Structure

- `firmware/` - Main ESP32 code
- `docs/` - Documentation and guides
- `diagrams/` - Visual explanations
- `lib/` - Project libraries

## Next Steps

1. Read `docs/implementation_guide.md` for detailed setup
2. Check `docs/technical_specification.md` for project details
3. Review `docs/wireless_design.md` for network features

Need more help? The project includes detailed documentation in the `docs` folder.
