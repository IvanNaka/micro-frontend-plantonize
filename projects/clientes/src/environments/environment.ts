export const environment = {
  production: false,
  microfrontends: {
    shell: {
      url: 'https://master.d2kuxr0jk1zwy.amplifyapp.com/',
      port: 4200
    },
    agenda: {
      url: 'https://master.d38x975wk8l8lt.amplifyapp.com',
      port: 4201
    },
    financeiro: {
      url: 'https://master.d3a2j644iqswfl.amplifyapp.com',
      port: 4202
    },
    clientes: {
      url: 'https://master.d15fxxqhaij1k9.amplifyapp.com',
      port: 4203
    }
  },
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 30000,
    endpoints: {
      clients: '/clients',
      patients: '/patients',
      medical_records: '/medical-records',
      insurance_plans: '/insurance-plans'
    }
  }
};
