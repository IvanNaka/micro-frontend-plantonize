export const environment = {
  production: true,
  microfrontends: {
    shell: {
      url: 'https://shell.plantonize.com',
      port: 443
    },
    agenda: {
      url: 'https://agenda.plantonize.com',
      port: 443
    },
    financeiro: {
      url: 'https://financeiro.plantonize.com',
      port: 443
    },
  },
  api: {
    baseUrl: 'https://api.plantonize.com/api',
    timeout: 30000
  }
};
