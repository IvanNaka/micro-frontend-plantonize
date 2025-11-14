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
    baseUrl: 'http://localhost:3000/api',
    // baseUrl: 'https://plantonize-bff-d4e4bvawhyf3a2bg.brazilsouth-01.azurewebsites.net/api',
    timeout: 30000,
    endpoints: {
      invoices: '/notasfiscais',
      payments: '/payments',
      reports: '/reports',
      transactions: '/transactions'
    }
  },
  msal: {
    // Replace these placeholders with your Azure AD app registration values
    clientId: '9a860e51-678c-40cf-82d4-3a0660b6edfb4',
    tenantId: '5f3d3de5-5d5f-45b9-bccf-6b8d5aea1a03',
    // Use localhost for development
    redirectUri: 'https://master.d2kuxr0jk1zwy.amplifyapp.com/',
    authority: 'https://login.microsoftonline.com/5f3d3de5-5d5f-45b9-bccf-6b8d5aea1a03',
    // Use popup flow in development to avoid redirect URI issues
    usePopup: true
  }
};
