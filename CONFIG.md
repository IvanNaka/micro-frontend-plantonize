# 🔧 Configuração de Microfrontends

Este documento explica como gerenciar as URLs e configurações dos microfrontends do Plantonize.

## 📁 Estrutura de Configuração

```
/
├── microfrontend.config.ts          # Configuração centralizada (principal)
└── projects/
    ├── shell/src/environments/      # Configurações do Shell
    ├── agenda/src/environments/     # Configurações da Agenda
    ├── financeiro/src/environments/ # Configurações do Financeiro
    └── clientes/src/environments/   # Configurações dos Clientes
```

## 🚀 Como Alterar URLs

### Método 1: Configuração Centralizada (Recomendado)

Edite o arquivo `microfrontend.config.ts` na raiz do projeto:

```typescript
export const MICROFRONTEND_CONFIG = {
  development: {
    shell: { url: 'http://localhost:4200', port: 4200 },
    agenda: { url: 'http://localhost:4201', port: 4201 },
    financeiro: { url: 'http://localhost:4202', port: 4202 },
    clientes: { url: 'http://localhost:4203', port: 4203 }
  }
};
```

### Método 2: Por Projeto Individual

Edite os arquivos `environment.ts` em cada projeto:

- **Shell**: `projects/shell/src/environments/environment.ts`
- **Agenda**: `projects/agenda/src/environments/environment.ts`
- **Financeiro**: `projects/financeiro/src/environments/environment.ts`
- **Clientes**: `projects/clientes/src/environments/environment.ts`

## 🛠 Cenários Comuns

### Para Desenvolvimento Local
```typescript
// Mantenha as URLs atuais
agenda: { url: 'http://localhost:4201', port: 4201 }
```

### Para Usar Portas Diferentes
```typescript
// Altere apenas as portas necessárias
agenda: { url: 'http://localhost:5001', port: 5001 }
financeiro: { url: 'http://localhost:5002', port: 5002 }
```

### Para Produção
```typescript
// URLs já configuradas
agenda: { url: 'https://agenda.plantonize.com', port: 443 }
```

## 📋 URLs Atuais

| Microfrontend | Desenvolvimento | Produção |
|---------------|----------------|-----------|
| Shell         | localhost:4200 | shell.plantonize.com |
| Agenda        | localhost:4201 | agenda.plantonize.com |
| Financeiro    | localhost:4202 | financeiro.plantonize.com |
| Clientes      | localhost:4203 | clientes.plantonize.com |

## 🔄 Aplicar Mudanças

Após alterar as configurações:

1. **Parar os servidores** (Ctrl+C em todos os terminais)
2. **Reiniciar os microfrontends**:
   ```bash
   npm run start:all
   # ou individualmente:
   ng serve shell --port 4200
   ng serve agenda --port 4201
   ng serve financeiro --port 4202
   ng serve clientes --port 4203
   ```

## ⚠️ Observações Importantes

- **URLs devem ser consistentes** entre todos os arquivos de environment
- **Portas não devem conflitar** entre diferentes microfrontends
- **CORS pode ser necessário** se usar domínios diferentes
- **HTTPS obrigatório em produção** para iframes funcionarem corretamente

## 🆘 Resolução de Problemas

### Microfrontend não carrega no iframe
1. Verifique se a URL está correta no environment
2. Confirme se o microfrontend está rodando na porta especificada
3. Teste a URL diretamente no navegador

### Erro de CORS
1. Configure CORS no servidor do microfrontend
2. Use proxy configuration se necessário
3. Em desenvolvimento, use `--disable-host-check` se necessário

### Mudanças não aplicadas
1. Limpe o cache do navegador (Ctrl+Shift+R)
2. Reinicie completamente os servidores
3. Verifique se editou o arquivo correto (environment.ts vs environment.prod.ts)
