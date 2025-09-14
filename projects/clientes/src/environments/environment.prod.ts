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
    clientes: {
      url: 'https://clientes.plantonize.com',
      port: 443
    }
  },
  api: {
    baseUrl: 'https://api.plantonize.com/api',
    timeout: 30000,
    endpoints: {
      clients: '/clients',
      patients: '/patients',
      medical_records: '/medical-records',
      insurance_plans: '/insurance-plans'
    }
  }
};
