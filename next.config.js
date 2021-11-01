module.exports = {
  async headers() {
    return [
      {
        source: '/:slug/index',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          }
        ],
      },
      {
        source: '/:slug/edit',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          }
        ],
      },
    ]
  },
}
