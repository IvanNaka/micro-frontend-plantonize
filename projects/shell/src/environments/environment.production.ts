export const environment = {
  production: true,
  microfrontends: {
    shell: {
      url: 'https://master.d2kuxr0jk1zwy.amplifyapp.com/',
      port: 443
    },
    agenda: {
      url: 'https://master.d3z8w3c6s9hwh0.amplifyapp.com/',
      port: 443
    },
    financeiro: {
      url: 'https://master.d1u5p7q8z3l4j9.amplifyapp.com/',
      port: 443
    },
  },
  api: {
    baseUrl: 'https://api.plantonize.com.br/api', // Production BFF
    timeout: 30000,
    endpoints: {
      invoices: '/notasfiscais',
      payments: '/payments',
      reports: '/reports',
      transactions: '/transactions'
    }
  },
  msal: {
    clientId: '92bb689b-a298-479e-999f-cdf03e0ad18f',
    tenantId: '5f3d3de5-5d5f-45b9-bccf-6b8d5aea1a03',
    // Use Amplify URL for production
    redirectUri: 'https://master.d2kuxr0jk1zwy.amplifyapp.com/',
    authority: 'https://login.microsoftonline.com/5f3d3de5-5d5f-45b9-bccf-6b8d5aea1a03'
  }
};
