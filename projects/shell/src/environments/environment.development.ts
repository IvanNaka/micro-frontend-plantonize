export const environment = {
  production: false,
  microfrontends: {
    shell: {
      url: 'http://localhost:4200/',
      port: 4200
    },
    agenda: {
      url: 'http://localhost:4201/',
      port: 4201
    },
    financeiro: {
      url: 'http://localhost:4202/',
      port: 4202
    },
  },
  api: {
    baseUrl: 'http://localhost:3000/api', // Use local BFF para dev
    timeout: 30000,
    endpoints: {
      invoices: '/notasfiscais',
      payments: '/payments',
      reports: '/reports',
      transactions: '/transactions'
    }
  },
  msal: {
    // TEMPORÁRIO: Use popup ao invés de redirect para dev local
    // Isso evita problemas de redirect URI enquanto Azure propaga
    clientId: '92bb689b-a298-479e-999f-cdf03e0ad18f',
    tenantId: '5f3d3de5-5d5f-45b9-bccf-6b8d5aea1a03',
    redirectUri: 'http://localhost:4200/',
    authority: 'https://login.microsoftonline.com/5f3d3de5-5d5f-45b9-bccf-6b8d5aea1a03',
    // Flag para usar popup em dev
    usePopupInDev: true
  }
};
