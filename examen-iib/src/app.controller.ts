import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  async rutaMostrarUsuarios(
      @Res() res,
  ){
      res.render('login/login',
        {
          datos: {
            tipoMensaje: 0
          }
        }
      );
  }
}
