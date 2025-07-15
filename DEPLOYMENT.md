# Guia de Deploy para VPS com Easypanel

Este guia explica como fazer o deploy da aplicação Atend Cliente Hub em um VPS usando Easypanel.

## ⚠️ Problemas Corrigidos

### Erro do bash resolvido
- Alterado shebang de `#!/bin/bash` para `#!/bin/sh` no deploy.sh
- Removido dependências de bash que causavam erro no build

### Configuração de build otimizada
- Mudança de Docker para Git deploy (mais eficiente)
- Adicionado serve package para servir arquivos estáticos
- Configuração de CSP corrigida para Supabase

## Pré-requisitos

- VPS com Docker instalado
- Easypanel instalado no servidor
- Repositório Git com o código
- Domínio configurado (opcional)

## Método Recomendado: Deploy via Git

### 1. Preparação do repositório

1. **Faça commit de todas as alterações:**
   ```sh
   git add .
   git commit -m "Deploy configuration"
   git push origin main
   ```

### 2. Configuração no Easypanel

1. **Crie um novo serviço:**
   - Vá para "Apps" → "Create App"
   - Escolha "Git Repository"
   - Configure a URL do seu repositório GitHub/GitLab
   - Selecione a branch `main`

2. **Configure os comandos de build:**
   - Build Command: `npm ci && npm run build`
   - Start Command: `npx serve -s dist -l 80`

3. **Configure as variáveis de ambiente:**
   ```
   NODE_ENV=production
   VITE_SUPABASE_URL=https://mmqorugxbsspuyqlraia.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcW9ydWd4YnNzcHV5cWxyYWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDM3MjYsImV4cCI6MjA2NzQ3OTcyNn0.8e3ohcVXPJVBvtw82aKmvAsCpf_8dfOjaB6U2g-hCTE
   ```

4. **Configure recursos:**
   - Memory: 256MB (mínimo) / 512MB (recomendado)
   - Port: 80

### 3. Deploy automático

O Easypanel irá:
1. Clonar o repositório
2. Instalar dependências com `npm ci`
3. Executar build com `npm run build`
4. Servir a aplicação na porta 80

## Método Alternativo: Docker

Se preferir usar Docker, use os arquivos fornecidos:

```sh
# Clone o repositório
git clone <sua-url-do-repo>
cd atend-cliente-hub

# Execute o deploy
chmod +x deploy.sh
./deploy.sh
```

## Configuração de Domínio

1. **Configure o DNS:**
   - Aponte o domínio para o IP do seu VPS
   - Configure um registro A

2. **No Easypanel:**
   - Vá para as configurações do app
   - Adicione o domínio na seção "Domains"
   - Configure SSL automático

## Troubleshooting

### Problemas Comuns Resolvidos

1. **✅ Erro "exec: /bin/bash: no such file or directory"**
   - Solucionado: Alterado para usar `/bin/sh`

2. **✅ Build falha com dependências**
   - Solucionado: Adicionado `serve` package e comandos corretos

3. **✅ CSP bloqueia Supabase**
   - Solucionado: Configurado CSP para permitir conexões Supabase

### Se ainda tiver problemas:

1. **Verifique os logs:**
   - No Easypanel: App → Logs
   - Procure por erros de build ou runtime

2. **Teste local primeiro:**
   ```sh
   npm ci
   npm run build
   npx serve -s dist -l 3000
   ```

3. **Verificar variáveis de ambiente:**
   - Confirme se as chaves do Supabase estão corretas
   - Teste a conexão com o banco

## Monitoramento

- **Logs:** Easypanel → App → Logs
- **Métricas:** Monitor CPU e memória via dashboard
- **Health Check:** A aplicação responde na rota `/`

## Atualizações

Para atualizar:
1. Faça push das mudanças para o repositório
2. O Easypanel fará redeploy automaticamente
3. Monitore os logs durante o deploy

## Suporte Técnico

Todas as configurações foram otimizadas para evitar os erros comuns de deploy. Se ainda encontrar problemas, verifique:

1. ✅ Repositório Git acessível
2. ✅ Node.js versão compatível (18+)
3. ✅ Variáveis de ambiente configuradas
4. ✅ Porta 80 disponível no VPS