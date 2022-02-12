module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 1000;
    return config;
  },
};
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/pay",
        destination: "https://sandbox.cashfree.com/pg/orders",
      },
    ];
  },
};
