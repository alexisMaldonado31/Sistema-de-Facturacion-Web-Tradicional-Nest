import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { validate } from 'class-validator';
import { ParqueService } from './parque.service';
import { ParqueEntity } from './parque.entity';
import { ParqueCreateDto } from './parque.create-dto';
import { ParqueUpdateDto } from './parque.update-dto';
import { Like } from 'typeorm';

@Controller('parque')
export class ParqueController {
  constructor(
    private readonly _parqueService: ParqueService
  ) {
  }

  @Get('ruta/mostrar-parques')
  async rutaMostrarParque(
    @Query('mensaje') mensaje: string,
    @Query('error') error: string,
    @Query('consultarParque') consultarParque: string,
    @Res() res,
  ) {
    let consultaServicio;
    if (consultarParque) {
      consultaServicio = [
        {
          nombre: Like('%' + consultarParque + '%')
        },
        {
          ciudad: Like('%' + consultarParque + '%')
        },
        {
          codigoPostal: Like('%' + consultarParque + '%')
        }
      ];
    }
    const parques = await this._parqueService.buscarParques(consultaServicio);
    res.render('parque/rutas/ruta-mostrar-parque',
      {
        datos: {
          parques,
          mensaje,
          error
        }
      }
    );
  }

  @Get('ruta/crear-parque')
  rutaCrearParque(
    @Res() res,
    @Query() tipoMensaje
  ) {
    res.render('parque/rutas/ruta-crear-parque',
      {
        datos: {
          tipoMensaje: 0,
        }
      }
    );
  }

  @Post()
  async ingresarParque(
    @Body() parque: ParqueEntity,
    @Res() res,
    @Session() session,
  ): Promise<void> {
    if (session) {
      if (session.usuario.roles.includes('Administrador')) {
        const parqueCreateDto = new ParqueCreateDto();
        parqueCreateDto.nombre = parque.nombre;
        parqueCreateDto.area = +parque.area;
        parqueCreateDto.ciudad = parque.ciudad;
        parqueCreateDto.codigoPostal = parque.codigoPostal;
        parqueCreateDto.descripcion = parque.descripcion;
        parqueCreateDto.direccion = parque.direccion;
        parqueCreateDto.sector = parque.sector;
        const errores = await validate(parqueCreateDto);
        if (errores.length > 0) {
          throw new BadRequestException(errores);
        } else {
          try {
            await this._parqueService.crearParque(parque);
            res.render('parque/rutas/ruta-crear-parque', {
              datos: {
                tipoMensaje: 1,
                mensaje: "El parque se ingreso Correctamente"
              }
            });
          } catch (e) {
            res.render('parque/rutas/ruta-crear-parque', {
              datos: {
                tipoMensaje: 2,
                mensaje: "El parque no se pudo Ingresar"
              }
            });
          }
        }
      } else {
        res.render('parque/rutas/ruta-crear-parque', {
          datos: {
            tipoMensaje: 2,
            mensaje: "No cuenta con permisos de administrador"
          }
        });
      }
    }
  }

  @Get('ruta/editar-parque/:idUsuario')
  async rutaEditarParque(
    @Param('idUsuario') idUsuario: string,
    @Res() res,
  ) {
    const parque = await this._parqueService.buscarUnParque(+idUsuario);
    try {
      if (parque) {
        res.render('parque/rutas/ruta-crear-parque',
          {
            datos: {
              tipoMensaje : 0,
              parque 
            }
          }
        );
      } else {
        res.render('parque/rutas/ruta-crear-parque', {
          datos: {
            tipoMensaje: 2,
            mensaje: "El parque no se pudo modificar",
            parque
          }
        });
      }

    } catch (e) {
      res.render('parque/rutas/ruta-crear-parque', {
        datos: {
          tipoMensaje: 2,
          mensaje: "No tiene permisos de Administrador",
          parque
        }
      });
    }
  }

  @Get(':id')
  buscarUnParque(
    @Param('id') id: string,
  ): Promise<ParqueEntity | undefined> {
    return this._parqueService.buscarUnParque(Number(id));
  }

  @Get()
  buscarParques(
    @Query('skip') skip?: string | number,
    @Query('take') take?: string | number,
    @Query('where') where?: string,
    @Query('order') order?: string
  ): Promise<ParqueEntity[] | undefined> {
    if (order) {
      try {
        order = JSON.parse(order);
      } catch (e) {
        order = undefined;
      }
    }

    if (where) {
      try {
        where = JSON.parse(where);
      } catch (e) {
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

  @Post('eliminar/:id')
  async eliminarParque(
    @Param('id') id: string,
    @Res() res,
    @Session() session
  ): Promise<void> {
    if (session) {
      if (session.usuario.roles.includes('Administrador')) {
        try {
          await this._parqueService.borrarParque(+id);
          const parques = await this._parqueService.buscarParques();
          res.render('parque/rutas/ruta-mostrar-parque',
            {
              datos: {
                parques,
                mensaje: "El Parque ha sido borrado",
              }
            }
          );
        } catch (e) {
          const parques = await this._parqueService.buscarParques();
          res.render('parque/rutas/ruta-mostrar-parque',
            {
              datos: {
                parques,
                error: "No se ha podido borrar el Parque"
              }
            }
          );
        }
      } else {
        const parques = await this._parqueService.buscarParques();
        res.render('parque/rutas/ruta-mostrar-parque',
          {
            datos: {
              parques,
              error: "No tiene permisos de administrador"
            }
          }
        );
      }
    }

  }

  @Post(':id')
  async actualizarParque(
    @Body() parque: ParqueEntity,
    @Param('id') id: string,
    @Res() res,
    @Session() session
  ): Promise<void> {
    if (session) {
      console.log('editando');
      if (session.usuario.roles.includes('Administrador')) {
        const parqueUpdateDto = new ParqueUpdateDto();
        parqueUpdateDto.nombre = parque.nombre;
        parqueUpdateDto.area = +parque.area;
        parqueUpdateDto.ciudad = parque.ciudad;
        parqueUpdateDto.codigoPostal = parque.codigoPostal;
        parqueUpdateDto.descripcion = parque.descripcion;
        parqueUpdateDto.direccion = parque.direccion;
        parqueUpdateDto.id = +id;
        parqueUpdateDto.sector = parque.sector;
        const errores = await validate(parqueUpdateDto);
        if (errores.length > 0) {
          res.render('parque/rutas/ruta-crear-parque',
          {
            datos: {
              tipoMensaje : 2,
              mensaje: "No se pudo actualizar el parque. Datos erroneos",
              parque 
            }
          });
        } else {
          const parqueActualizado = await this._parqueService.actualizarParque(+id, parque);
          res.render('parque/rutas/ruta-crear-parque',
          {
            datos: {
              tipoMensaje : 1,
              mensaje: "El Parque ha sido actualizado con exito",
              parque: parqueActualizado 
            }
          }
        );
        }
      } else {
        res.render('parque/rutas/ruta-crear-parque',
          {
            datos: {
              tipoMensaje : 2,
              mensaje: "No cuenta con permisos de administrador",
              parque 
            }
          });
      }
    }

  }


}
