module.exports = {
    apps : [{
      name: 'yvypora-realtime-api',
      script: 'npm run dev',
      instances: '1',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }]
  };
  