const introduction = [
  { text: 'What is Loki JavaScript Client?', link: '/introduction/what-is-loki-javascript-client' },
  { text: 'Get started', link: '/introduction/get-started' }
]

module.exports = {
  base: '/loki-javascript-client/docs_dist/',
  title: 'Loki JavaScript Client',
  description: 'Documentation for the Loki JavaScript Client library',
  dest: 'docs_dist',
  themeConfig: {
    // sidebar: {
    //   '/': [
    //     {
    //       text: "Introduction",
    //       children: introduction
    //     },
    //   ],
    // } 
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