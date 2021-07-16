module.exports = {
  base: '/loki-javascript-client/wiki/',
  title: 'Loki JavaScript Client',
  description: 'Documentation for the Loki JavaScript Client library',
  dest: 'wiki',
  plugins: [
    [
      'flexsearch',
      {
        maxSuggestions: 10
      }
    ],
  ],
  themeConfig: {
    sidebar: [
      {
        title: 'Introduction',
        collapsable: false, // optional, defaults to true
        children: [
          '/introduction/what-is-loki-javascript-client',
          '/introduction/get-started'
        ]
      },
      {
        title: 'Configuration',
        collapsable: false, // optional, defaults to true
        children: [
          '/configuration/initializing-loki',
          '/configuration/package-json-template'
        ]
      },
      {
        title: 'APIs',
        collapsable: false, // optional, defaults to true
        children: [
          '/apis/referencing-loki-apis',
          '/apis/data',
          '/apis/environ',
          '/apis/model',
          '/apis/urn',
          '/apis/web',
        ]
      },
    ]
  }
}