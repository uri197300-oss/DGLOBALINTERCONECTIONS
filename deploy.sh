#!/bin/bash
# Script de despliegue automático para Hostinger VPS

echo "🚀 Iniciando despliegue de Mundo Sábila en VPS Hostinger..."

# Pull de los últimos cambios de GitHub
git pull origin main

# Instalación de dependencias
echo "📦 Instalando dependencias..."
npm install

# Compilación de la aplicación
echo "🔨 Compilando proyecto (Vite + Esbuild)..."
npm run build

# Reiniciar servicio con PM2
echo "🔄 Reiniciando aplicación en PM2..."
pm2 reload ecosystem.config.cjs || pm2 start ecosystem.config.cjs

echo "✅ Despliegue completado con éxito!"
