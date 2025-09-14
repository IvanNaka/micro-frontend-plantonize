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
  
  production: {
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
    },
    clientes: {
      url: 'http://localhost:3003',
      port: 3003
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
