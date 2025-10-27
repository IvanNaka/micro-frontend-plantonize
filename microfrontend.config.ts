/**
 * Configuração centralizada dos microfrontends
 * 
 * Este arquivo permite alterar facilmente as URLs e portas de todos os microfrontends
 * Para desenvolvimento local, mantenha as URLs com localhost
 * Para produção, altere para os domínios reais
 */

export const MICROFRONTEND_CONFIG = {
  development: {
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
    }
  },

  production: {
    shell: {
      url: 'https://master.d2kuxr0jk1zwy.amplifyapp.com/',
      port: 443
    },
    agenda: {
      url: 'https://master.d38x975wk8l8lt.amplifyapp.com',
      port: 443
    },
    financeiro: {
      url: 'https://master.d3a2j644iqswfl.amplifyapp.com',
      port: 443
    }
  },

  // Para desenvolvimento com diferentes portas (caso necessário)
  custom: {
    shell: {
      url: 'http://localhost:3000',
      port: 3000
    },
    agenda: {
      url: 'http://localhost:3001',
      port: 3001
    },
    financeiro: {
      url: 'http://localhost:3002',
      port: 3002
    }
  }
};

export const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 30000
  },
  production: {
    baseUrl: 'https://api.plantonize.com/api',
    timeout: 30000
  }
};

/**
 * Como usar:
 * 
 * 1. Para alterar URLs de desenvolvimento:
 *    - Modifique as URLs na seção 'development' acima
 * 
 * 2. Para usar configuração customizada:
 *    - Altere o environment.ts de cada projeto para usar MICROFRONTEND_CONFIG.custom
 * 
 * 3. Para produção:
 *    - As URLs de produção já estão configuradas na seção 'production'
 */
