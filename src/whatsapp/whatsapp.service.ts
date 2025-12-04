import { Injectable, Logger } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private client: Client;

  constructor() {
    this.initialize();
  }

  async initialize() {
    this.logger.log('Iniciando WhatsApp Web...');

    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: "nestjs-whatsapp",
        dataPath: "./sessions",
      }),
      puppeteer: {
        executablePath: '/usr/bin/chromium',
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--disable-gpu',
        ],
      },
    });

    this.client.on('qr', (qr) => {
      this.logger.log('Escanea este QR:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      this.logger.log('WhatsApp conectado y listo!');
    });

    this.client.on('authenticated', () => {
      this.logger.log('Autenticado con WhatsApp.');
    });

    this.client.on('auth_failure', (msg) => {
      this.logger.error('Fallo de autenticación');
      this.logger.error(msg);
    });

    // SIRVE PARA CHAT BOT, ESCUCHA MENSAJES ENTRANTES
    // this.client.on('message', async (msg) => {
    //   this.logger.log(`Mensaje recibido: ${msg.body}`);

    //   if (msg.body === 'ping') {
    //     await msg.reply('pong');
    //   }
    // });

    await this.client.initialize();
  }

  async sendMessage(cellphone: string, message: string) {
    const phone = this.formatNumber(cellphone);
    return this.client.sendMessage(phone, message);
  }

  private formatNumber(cellphone: string) {
    const clean = cellphone.replace(/\D/g, "");
    return clean.includes("@c.us") ? clean : `${clean}@c.us`;
  }

}
