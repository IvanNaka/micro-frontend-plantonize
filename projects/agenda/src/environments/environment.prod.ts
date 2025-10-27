export const environment = {
  production: true,
  microfrontends: {
    shell: {
      url: 'https://master.d2kuxr0jk1zwy.amplifyapp.com/',
      // url: 'http://localhost:4200/',
      port: 4200
    },
    agenda: {
      url: 'https://master.d38x975wk8l8lt.amplifyapp.com',
      // url: 'http://localhost:4201/',
      port: 4201
    },
    financeiro: {
      url: 'https://master.d3a2j644iqswfl.amplifyapp.com',
      // url: 'http://localhost:4202/',
      port: 4202
    },
  },
  api: {
    // baseUrl: 'http://localhost:3000/api',
    baseUrl: 'plantonize-bff-d4e4bvawhyf3a2bg.brazilsouth-01.azurewebsites.net/api',
    timeout: 30000,
    endpoints: {
      appointments: '/appointments',
      doctors: '/doctors',
      specialties: '/specialties'
    }
  }
};
