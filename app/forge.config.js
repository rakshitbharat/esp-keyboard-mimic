module.exports = {
  packagerConfig: {
    name: "ESP Keyboard Mimic",
    executableName: "esp-keyboard-mimic",
    asar: true,
    prune: true
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {}
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"]
    }
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        devContentSecurityPolicy: "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"
      }
    }
  ]
};
