import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { validate } from 'class-validator';
import { ParejaService } from './pareja.service';
import { ParejaEntity } from './pareja.entity';
import { ParejaCreateDto } from './pareja.create-dto';
import { ParejaUpdateDto } from './pareja.update-dto';

@Controller('pareja')
export class ParejaController{
  constructor(
    private readonly _parejaService: ParejaService
  ) {
  }

  @Post()
  async ingresarPareja(
    @Body() pareja: ParejaEntity,
    @Res() res
  ):Promise<void>{
    const parejaCreateDto = new ParejaCreateDto();
    parejaCreateDto.nombre = pareja.nombre;
    parejaCreateDto.anios = pareja.anios;
    parejaCreateDto.sonCasados = pareja.sonCasados;
    parejaCreateDto.precio = pareja.precio;

    const errores = await validate(parejaCreateDto);
    if(errores.length > 0){
      throw new BadRequestException(errores);
    }else{
      try {
        await this._parejaService.crearPareja(pareja);
        res.send('OK');
      }catch (e) {
        throw new BadRequestException('No se puede ingresar el parque');
      }
    }
  }

  @Get(':id')
  buscarUnaPareja(
    @Param('id') id: string,
    ):Promise<ParejaEntity | undefined>{
    return this._parejaService.buscarUnaPareja(Number(id));
  }

  @Get()
  buscarParejas(
    @Query('skip') skip?: string | number,
    @Query('take') take?: string | number,
    @Query('where') where?: string,
    @Query('order') order?: string
  ):Promise<ParejaEntity[] | undefined>{
    if(order){
      try {
        order = JSON.parse(order);
      }catch (e) {
        order = undefined;
      }
    }

    if(where){
      try {
        where = JSON.parse(where);
      }catch (e) {
        where = undefined;
      }
    }
    return this._parejaService.buscarParejas(
      where,
      skip as number,
      take as number,
      order
    );
  }

  @Post(':id')
  async actualizarPareja(
    @Body() pareja: ParejaEntity,
    @Param('id') id: string,
    @Res() res,
  ):Promise<void>{
    const parejaUpdateDto = new ParejaUpdateDto();
    parejaUpdateDto.nombre = pareja.nombre;
    parejaUpdateDto.anios = pareja.anios;
    parejaUpdateDto.sonCasados = pareja.sonCasados;
    parejaUpdateDto.precio = pareja.precio;
    parejaUpdateDto.id = +id;
    const errores = await validate(parejaUpdateDto);
    if(errores.length > 0){
      throw new BadRequestException();
    }else{
      await this._parejaService.actualizarParejas(+id, pareja);
      res.send('Ok')
    }
  }

  @Post(':id')
  async eliminarPareja(
    @Param('id') id: string,
    @Res() res
  ): Promise<void>{
    try {
      await this._parejaService.borrarPareja(+id);
      res.send('Ok');
    }catch (error) {
      throw new BadRequestException();
    }
  }
}
