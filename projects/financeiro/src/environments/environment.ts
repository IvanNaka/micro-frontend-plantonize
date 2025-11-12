export const environment = {
  production: false,
  microfrontends: {
    shell: {
      // url: 'https://master.d2kuxr0jk1zwy.amplifyapp.com/',
      url: 'http://localhost:4200/',
      port: 4200
    },
    agenda: {
      // url: 'https://master.d38x975wk8l8lt.amplifyapp.com',
      url: 'http://localhost:4201/',
      port: 4201
    },
    financeiro: {
      // url: 'https://master.d3a2j644iqswfl.amplifyapp.com',
      url: 'http://localhost:4202/',
      port: 4202
    },
  },
  api: {
    // baseUrl: 'http://localhost:3000/api',
    baseUrl: 'plantonize-bff-d4e4bvawhyf3a2bg.brazilsouth-01.azurewebsites.net/api',
    timeout: 30000,
    endpoints: {
      invoices: '/notasfiscais',
      payments: '/payments',
      reports: '/reports',
      transactions: '/transactions'
    }
  },
    msal: {
    // Use the same SPA app registration as the Shell to enable SSO when hosted inside the Shell.
    // If you want separate app registrations, ensure they share the same tenant and proper redirect URIs.
    clientId: '41e5e47c-037f-444c-b865-a91427b23c74',
    tenantId: '5f3d3de5-5d5f-45b9-bccf-6b8d5aea1a03',
    redirectUri: window.location.origin + '/',
    authority: 'https://login.microsoftonline.com/5f3d3de5-5d5f-45b9-bccf-6b8d5aea1a03',
    // usePopup can be customized per-environment if needed
    usePopup: true
  }
};
