# Usamos la imagen oficial de Node.js LTS
FROM node:20-slim

# Variables de entorno recomendadas
ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Instalamos dependencias necesarias para Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libasound2 \
    libnss3 \
    libatk1.0-0 \
    libx11-xcb1 \
    libxcursor1 \
    libxdamage1 \
    libxcomposite1 \
    libxrandr2 \
    libxss1 \
    libxi6 \
    libxtst6 \
 && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (sin instalar Chromium de Puppeteer)
RUN npm install --omit=dev

# Copiar todo el proyecto
COPY . .

# Compilar TypeScript si tu proyecto usa TS
RUN npm run build

# Puerto que usará la aplicación
EXPOSE 3010

# Comando por defecto
CMD ["node", "dist/main.js"]
