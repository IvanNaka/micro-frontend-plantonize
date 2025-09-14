export const environment = {
  production: false,
  microfrontends: {
    shell: {
      url: 'http://localhost:4200',
      port: 4200
    },
    agenda: {
      url: 'http://localhost:4201',
      port: 4201
    },
    financeiro: {
      url: 'http://localhost:4202',
      port: 4202
    },
    clientes: {
      url: 'http://localhost:4203',
      port: 4203
    }
  },
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 30000
  }
};
