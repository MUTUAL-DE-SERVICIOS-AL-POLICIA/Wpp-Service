import { Controller, Post, Body } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send')
  async send(@Body() body: { cellphone: string; message: string }) {
    return this.whatsappService.sendMessage(body.cellphone, body.message);
  }
}
