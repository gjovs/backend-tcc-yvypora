module.exports = {
  apps: [
    {
      name: 'yvypora-api',
      script: 'npm run dev',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
