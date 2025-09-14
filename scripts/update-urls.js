#!/usr/bin/env node

/**
 * Script para atualizar URLs dos microfrontends em todos os arquivos environment
 */

const fs = require('fs');
const path = require('path');

// Configurações baseadas no microfrontend.config.ts
const CONFIGS = {
  development: {
    shell: 'http://localhost:4200',
    agenda: 'http://localhost:4201',
    financeiro: 'http://localhost:4202',
    clientes: 'http://localhost:4203'
  },
  production: {
    shell: 'https://shell.plantonize.com',
    agenda: 'https://agenda.plantonize.com',
    financeiro: 'https://financeiro.plantonize.com',
    clientes: 'https://clientes.plantonize.com'
  },
  custom: {
    shell: 'http://localhost:3000',
    agenda: 'http://localhost:3001',
    financeiro: 'http://localhost:3002',
    clientes: 'http://localhost:3003'
  }
};

function updateEnvironmentFile(projectPath, config, isProduction = false) {
  const envFile = isProduction ? 'environment.prod.ts' : 'environment.ts';
  const filePath = path.join(projectPath, 'src', 'environments', envFile);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Arquivo não encontrado: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Atualizar URLs dos microfrontends
  Object.keys(config).forEach(key => {
    const urlPattern = new RegExp(`${key}:\\s*{[^}]*url:\\s*['"]([^'"]*)['"],[^}]*}`, 'g');
    const portPattern = new RegExp(`(${key}:\\s*{[^}]*port:\\s*)\\d+`, 'g');
    
    const url = new URL(config[key]);
    const port = url.port || (url.protocol === 'https:' ? '443' : '80');
    
    content = content.replace(urlPattern, (match, oldUrl) => {
      return match.replace(oldUrl, config[key]);
    });
    
    content = content.replace(portPattern, `$1${port}`);
  });

  fs.writeFileSync(filePath, content);
  console.log(`✅ Atualizado: ${filePath}`);
}

function main() {
  const environment = process.argv[2] || 'development';
  
  if (!CONFIGS[environment]) {
    console.error(`❌ Ambiente inválido: ${environment}`);
    console.log('Ambientes disponíveis:', Object.keys(CONFIGS).join(', '));
    process.exit(1);
  }

  console.log(`🔄 Atualizando URLs para ambiente: ${environment}`);
  
  const config = CONFIGS[environment];
  const projectsPath = path.join(__dirname, '..', 'projects');
  
  // Atualizar cada projeto
  ['shell', 'agenda', 'financeiro', 'clientes'].forEach(project => {
    const projectPath = path.join(projectsPath, project);
    
    if (fs.existsSync(projectPath)) {
      console.log(`\n📁 Atualizando projeto: ${project}`);
      updateEnvironmentFile(projectPath, config, false);  // environment.ts
      updateEnvironmentFile(projectPath, config, true);   // environment.prod.ts
    } else {
      console.log(`❌ Projeto não encontrado: ${project}`);
    }
  });

  console.log('\n🎉 Atualização concluída!');
  console.log('\n📋 Próximos passos:');
  console.log('1. Reinicie os servidores de desenvolvimento');
  console.log('2. Limpe o cache do navegador se necessário');
}

if (require.main === module) {
  main();
}

module.exports = { CONFIGS, updateEnvironmentFile };
