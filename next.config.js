module.exports = {
  async headers() {
    return [
      {
        source: '/:slug/*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  },
}
