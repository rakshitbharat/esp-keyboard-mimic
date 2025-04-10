module.exports = {
  packagerConfig: {
    name: "ESP Keyboard Mimic",
    executableName: "esp-keyboard-mimic",
    asar: true
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {}
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.config.js',
        renderer: {
          config: './webpack.config.js',
          entryPoints: [{
            name: 'main_window',
            html: './index.html',
            js: './src/renderer.tsx',
            preload: {
              js: './src/preload.ts'
            }
          }]
        }
      }
    }
  ]
};
