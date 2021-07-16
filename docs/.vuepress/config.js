module.exports = {
  base: '/loki-javascript-client/wiki/',
  title: 'Loki JavaScript Client',
  description: 'Documentation for the Loki JavaScript Client library',
  dest: 'wiki',
  themeConfig: {
    sidebar: [
      {
        title: 'Introduction',   // required
        collapsable: false, // optional, defaults to true
        children: [
          '/introduction/what-is-loki-javascript-client',
          '/introduction/get-started'
        ]
      },
    ]
  }
}