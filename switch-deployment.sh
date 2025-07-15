#!/bin/sh

# Script para alternar entre métodos de deploy

echo "Escolha o método de deploy:"
echo "1) Git (Recomendado) - Configuração atual"
echo "2) Docker - Método alternativo"
read -p "Digite sua escolha (1 ou 2): " choice

case $choice in
  1)
    echo "✅ Configuração Git já está ativa!"
    echo "Use o arquivo easypanel.yml para deploy no Easypanel"
    echo "Comando: git push origin main"
    ;;
  2)
    echo "🐳 Ativando configuração Docker..."
    if [ -f "Dockerfile.alternative" ]; then
      cp Dockerfile.alternative Dockerfile
      echo "✅ Dockerfile ativado"
    fi
    if [ -f "docker-compose.alternative.yml" ]; then
      cp docker-compose.alternative.yml docker-compose.yml
      echo "✅ docker-compose.yml ativado"
    fi
    echo "Para usar Docker, execute: chmod +x deploy-docker.sh && ./deploy-docker.sh"
    ;;
  *)
    echo "❌ Opção inválida"
    exit 1
    ;;
esac