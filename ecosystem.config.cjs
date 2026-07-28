module.exports = {
  apps: [
    {
      name: "mundo-sabila-app",
      script: "dist/server.cjs",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
