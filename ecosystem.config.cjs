module.exports = {
  apps: [
    {
      name: 'k-m-construction',
      script: './.output/server/index.mjs',
      exec_mode: 'cluster',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
        PORT: 4030
      }
    }
  ]
};

