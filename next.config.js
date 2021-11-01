module.exports = {
  async headers() {
    return [
      {
        source: '/:slug/*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, max-age=0, must-revalidate',
          }
        ],
      },
    ]
  },
}
