module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  // images: {
  //   unoptimized: true
  // },
  images: {
    loader: 'akamai',
    path: '',
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,

  }
};
