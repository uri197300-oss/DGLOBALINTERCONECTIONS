# 🚀 Guía de Despliegue en VPS de Hostinger con GitHub

Esta guía explica paso a paso cómo subir este proyecto a **GitHub** y desplegarlo en un **VPS de Hostinger** (Ubuntu/Debian) de forma segura y profesional con **Node.js**, **PM2** y **Nginx**.

---

## 📌 Paso 1: Subir el proyecto a GitHub

1. En tu computadora (o desde este workspace), abre la terminal y asegúrate de guardar todos los cambios.
2. Si aún no has vinculado tu repositorio local a GitHub:
   ```bash
   git init
   git add .
   git commit -m "Preparado para despliegue en Hostinger VPS"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITTORIO.git
   git push -u origin main
   ```

---

## 📌 Paso 2: Conectarte a tu VPS de Hostinger vía SSH

Desde tu terminal (Mac, Linux o PowerShell en Windows):
```bash
ssh root@IP_DE_TU_VPS_HOSTINGER
```
*(Reemplaza `IP_DE_TU_VPS_HOSTINGER` por la IP que te proporciona Hostinger).*

---

## 📌 Paso 3: Instalar Node.js, Git, PM2 y Nginx en el VPS

Ejecuta los siguientes comandos en tu servidor VPS para instalar los requerimientos:

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (versión 20 LTS) y Git
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx certbot python3-certbot-nginx

# Instalar PM2 globalmente para mantener la app activa 24/7
sudo npm install -g pm2
```

---

## 📌 Paso 4: Clonar el proyecto e Instalar Dependencias

```bash
# Ir al directorio web habitual
cd /var/www

# Clonar tu repositorio desde GitHub
git clone https://github.com/TU_USUARIO/TU_REPOSITTORIO.git mundo-sabila
cd mundo-sabila

# Crear el archivo .env con tus variables
nano .env
```

Agrega en el archivo `.env`:
```env
PORT=3000
NODE_ENV=production
GEMINI_API_KEY=tu_clave_de_gemini_aqui
APP_URL=https://tu-dominio.com
```
*(Guarda con `Ctrl + O`, presiona `Enter`, y sal con `Ctrl + X`).*

```bash
# Instalación de paquetes y compilación
npm install
npm run build
```

---

## 📌 Paso 5: Iniciar la aplicación con PM2

```bash
# Iniciar usando la configuración preconfigurada
pm2 start ecosystem.config.cjs

# Guardar PM2 para que inicie automáticamente si se reinicia el VPS
pm2 save
pm2 startup
```

---

## 📌 Paso 6: Configurar Nginx como Proxy Inverso

Crea el archivo de configuración en Nginx:
```bash
sudo nano /etc/nginx/sites-available/mundo-sabila
```

Pega la siguiente configuración (reemplaza `tu-dominio.com` por tu dominio real):

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Activa la configuración y reinicia Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/mundo-sabila /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📌 Paso 7: Obtener Certificado SSL Gratis (HTTPS)

```bash
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```
Sigue las instrucciones en pantalla. Certbot configurará automáticamente HTTPS.

---

## 🔄 Actualizaciones Futuras (Despliegues continuos)

Cada vez que hagas cambios en GitHub, para actualizar tu VPS de Hostinger simplemente ejecuta en el VPS:
```bash
cd /var/www/mundo-sabila
bash deploy.sh
```
O manualmente:
```bash
git pull origin main
npm install
npm run build
pm2 reload ecosystem.config.cjs
```
