module.exports = {
  presets: [
    [
      '@babel/preset-env'
      // {
      //     "modules": false,
      //     "useBuiltIns": "usage",
      //     "corejs": 3,
      //     "targets": {
      //         "chrome": "58",
      //         "ie": "10"
      //     }
      // }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        'corejs': 3
      }
    ]
  ]
}
