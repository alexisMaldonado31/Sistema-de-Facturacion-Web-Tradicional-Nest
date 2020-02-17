import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { validate } from 'class-validator';
import { ParqueService } from './parque.service';
import { ParqueEntity } from './parque.entity';
import { ParqueCreateDto } from './parque.create-dto';

@Controller('pokemon')
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
  buscarUnPokemon(
    @Param('id') id: string,
    ):Promise<ParqueEntity | undefined>{
    return this._parqueService.buscarUnParque(Number(id));
  }

  @Get()
  buscarPokemons(
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
