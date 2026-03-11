#!/bin/bash
# deploy.sh — Deploy do UNI Gestão de Pessoas na VPS
# VPS: 144.91.95.180 (Contabo) — compartilhada com gleetalentos
# Domínio: https://uni.gleetalentos.com.br

set -e

VPS="root@144.91.95.180"
REMOTE_DIR="/var/www/unigestao"
FRONTEND_DIR="$(dirname "$0")/../frontend"

echo "▶ Build do frontend..."
cd "$FRONTEND_DIR"
npm run build
cd -

echo "▶ Upload para VPS..."
rsync -avz --delete "$FRONTEND_DIR/dist/" "$VPS:$REMOTE_DIR/"

echo "▶ Verificando Nginx..."
ssh "$VPS" "nginx -t && systemctl reload nginx"

echo ""
echo "✅ Deploy concluído!"
echo "   https://uni.gleetalentos.com.br"
