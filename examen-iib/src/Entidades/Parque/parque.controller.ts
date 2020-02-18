import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { validate } from 'class-validator';
import { ParqueService } from './parque.service';
import { ParqueEntity } from './parque.entity';
import { ParqueCreateDto } from './parque.create-dto';
import { ParqueUpdateDto } from './parque.update-dto';

@Controller('parque')
export class ParqueController{
  constructor(
    private readonly _parqueService: ParqueService
  ) {
  }

  @Post()
  async ingresarParque(
    @Body() parque: ParqueEntity,
    @Res() res
  ):Promise<void>{
    const parqueCreateDto = new ParqueCreateDto();
    parqueCreateDto.nombre = parque.nombre;
    parqueCreateDto.area = parque.area;
    parqueCreateDto.ciudad = parque.ciudad;
    parqueCreateDto.codigoPostal = parque.codigoPostal;
    parqueCreateDto.descripcion = parque.descripcion;
    parqueCreateDto.direccion = parque.direccion;
    parqueCreateDto.esDestinoTuristico = parque.esDestinoTuristico;
    parqueCreateDto.parqueTipo = parque.tipo;
    parqueCreateDto.sector = parque.sector;
    const errores = await validate(parqueCreateDto);
    if(errores.length > 0){
      throw new BadRequestException(errores);
    }else{
      try {
        await this._parqueService.crearParque(parque);
        res.send('OK');
      }catch (e) {
        throw new BadRequestException('No se puede ingresar el parque');
      }
    }
  }

  @Get(':id')
  buscarUnParque(
    @Param('id') id: string,
    ):Promise<ParqueEntity | undefined>{
    return this._parqueService.buscarUnParque(Number(id));
  }

  @Get()
  buscarParques(
    @Query('skip') skip?: string | number,
    @Query('take') take?: string | number,
    @Query('where') where?: string,
    @Query('order') order?: string
  ):Promise<ParqueEntity[] | undefined>{
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
    return this._parqueService.buscarParques(
      where,
      skip as number,
      take as number,
      order
    );
  }

  @Post(':id')
  async actualizarParque(
    @Body() parque: ParqueEntity,
    @Param('id') id: string,
    @Res() res,
  ):Promise<void>{
    const parqueUpdateDto = new ParqueUpdateDto();
    parqueUpdateDto.nombre = parque.nombre;
    parqueUpdateDto.area = parque.area;
    parqueUpdateDto.ciudad = parque.ciudad;
    parqueUpdateDto.codigoPostal = parque.codigoPostal;
    parqueUpdateDto.descripcion = parque.descripcion;
    parqueUpdateDto.direccion = parque.direccion;
    parqueUpdateDto.esDestinoTuristico = parque.esDestinoTuristico;
    parqueUpdateDto.id = +id;
    parqueUpdateDto.parqueTipo = parque.tipo;
    parqueUpdateDto.sector = parque.sector;
    const errores = await validate(parqueUpdateDto);
    if(errores.length > 0){
      throw new BadRequestException();
    }else{
      await this._parqueService.actualizarParque(+id, parque);
      res.send('Ok')
    }
  }

  @Post(':id')
  async eliminarParque(
    @Param('id') id: string,
    @Res() res
  ): Promise<void>{
    try {
      await this._parqueService.borrarParque(+id);
      res.send('Ok');
    }catch (error) {
      throw new BadRequestException();
    }
  }
}
