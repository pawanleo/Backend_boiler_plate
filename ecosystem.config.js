module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'dist/index.js', // Path to  app's entry file
      instances: 'max',        // Use all available CPU cores
      exec_mode: 'cluster',    // Enable clustering
      watch: false,            // Disable file watching for production as it can cause performance issues
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
    },
  ],
};
