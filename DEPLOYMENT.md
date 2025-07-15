# Deployment Guide for Easypanel

Este guia explica como fazer o deploy do projeto no Easypanel.

## Pré-requisitos

1. VPS configurado com Docker e Docker Compose
2. Easypanel instalado no VPS
3. Domínio configurado (opcional)

## Configuração Inicial

### 1. Configure o Supabase (se necessário)
- Atualize as URLs no projeto Supabase para incluir seu domínio de produção
- Configure as variáveis de ambiente no Easypanel

### 2. Configure o domínio
Edite o arquivo `easypanel.yml` e substitua `yourdomain.com` pelo seu domínio.

## Deploy via Easypanel Interface

1. Acesse sua interface do Easypanel
2. Crie um novo projeto
3. Faça upload dos arquivos do projeto
4. Configure as variáveis de ambiente necessárias
5. Inicie o deploy

## Deploy via Docker (Manual)

1. **Clone o repositório no VPS:**
```bash
git clone <seu-repositorio>
cd <nome-do-projeto>
```

2. **Execute o script de deploy:**
```bash
chmod +x deploy.sh
./deploy.sh
```

3. **Ou execute manualmente:**
```bash
# Build da imagem
docker build -t atend-cliente-hub .

# Deploy
docker-compose up -d
```

## Configurações de Produção

### Nginx
O arquivo `nginx.conf` está configurado com:
- Compressão gzip
- Headers de segurança
- Roteamento SPA (Single Page Application)
- Proxy para APIs (se necessário)

### Docker
- Multi-stage build para otimizar o tamanho da imagem
- Baseado em Alpine Linux para menor footprint
- Nginx como servidor web

## Monitoramento

Para monitorar a aplicação:
```bash
# Ver logs
docker-compose logs -f

# Ver status
docker-compose ps

# Restart
docker-compose restart
```

## Troubleshooting

### Problemas comuns:

1. **Erro de CORS:**
   - Verifique as configurações do Supabase
   - Adicione seu domínio nas URLs permitidas

2. **Recursos não carregam:**
   - Verifique se o nginx está servindo os arquivos estáticos
   - Confirme se o build foi executado corretamente

3. **Roteamento não funciona:**
   - Verifique se `try_files $uri $uri/ /index.html;` está no nginx.conf

## Atualizações

Para atualizar a aplicação:
```bash
git pull
./deploy.sh
```

## Backup

Importante fazer backup de:
- Banco de dados Supabase
- Configurações do Easypanel
- Arquivos de configuração personalizados