1. Clonar el proyecto

2. Instalar dependencias necesarias a Linux

apt-get update && apt-get install -y \
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

3. Instalar Dependencias
/**
  yarn install
 */

4. Levantar servidor
/**
  yarn start || yarn start:dev
 */

PUERTO EN EL EL 3100