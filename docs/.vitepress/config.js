const introduction = [
  { text: 'What is Loki JavaScript Client?', link: '/introduction/what-is-loki-javascript-client' },
  { text: 'Get started', link: '/introduction/get-started' }
]

module.exports = {
  title: 'Loki JavaScript Client',
  description: 'Testing.',
  themeConfig: {
    sidebar: {
      '/': [
        {
          text: "Introduction",
          children: introduction
        },
      ],
    } 
  }
}