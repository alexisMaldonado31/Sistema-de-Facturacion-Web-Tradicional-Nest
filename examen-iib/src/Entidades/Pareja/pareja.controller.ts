import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { validate } from 'class-validator';
import { ParejaService } from './pareja.service';
import { ParejaEntity } from './pareja.entity';
import { ParejaCreateDto } from './pareja.create-dto';
import { ParejaUpdateDto } from './pareja.update-dto';
import { Like } from 'typeorm';
import { ParqueService } from '../Parque/parque.service';

@Controller('pareja')
export class ParejaController {
  constructor(
    private readonly _parejaService: ParejaService,
    private readonly _parqueService: ParqueService
  ) {
  }

  @Get('ruta/mostrar-parejas')
  async rutaMostrarPareja(
    @Query('mensaje') mensaje: string,
    @Query('error') error: string,
    @Query('consultarPareja') consultarPareja: string,
    @Res() res,
    @Session() session
  ) {
    if (session.usuario) {
      let consultaServicio;
      if (consultarPareja) {
        consultaServicio = [
          {
            nombre: Like('%' + consultarPareja + '%')
          },
          {
            anios: Like('%' + consultarPareja + '%')
          },
        ];
      }

      const parejas = await this._parejaService.buscarParejas(consultaServicio)
      console.log(parejas);
      res.render('pareja/rutas/ruta_mostrar_pareja',
        {
          datos: {
            parejas,
            mensaje,
            error
          }
        }
      );
    } else {
      res.redirect('/login');
    }

  }

  @Get('ruta/crear-pareja')
  async rutaCrearPareja(
    @Res() res,
    @Session() session
  ) {
    if (session.usuario) {
      const parques = await this._parqueService.buscarParques();
      res.render('pareja/rutas/ruta_crear_pareja',
        {
          datos: {
            parques,
            tipoMensaje: 0,
          }
        }
      );
    } else {
      res.redirect('/login');
    }

  }

  @Get('ruta/editar-pareja/:idPareja')
  async rutaEditarPareja(
    @Param('idPareja') idPareja: string,
    @Res() res,
    @Session() session
  ) {
    if (session.usuario) {
      const pareja = await this._parejaService.buscarUnaPareja(+idPareja);
      const parques = await this._parqueService.buscarParques();
      try {
        if (pareja) {
          res.render('pareja/rutas/ruta_crear_pareja',
            {
              datos: {
                tipoMensaje: 0,
                pareja,
                parques
              }
            }
          );

        }
      } catch (e) {

      }
    } else {
      res.redirect('/login');
    }

  }

  @Post()
  async ingresarPareja(
    @Body() pareja: ParejaEntity,
    @Res() res,
    @Session() session
  ): Promise<void> {
    if (session) {
      const parques = await this._parqueService.buscarParques();
      if (session.usuario.roles.includes('Administrador')) {
        const parejaCreateDto = new ParejaCreateDto();
        parejaCreateDto.nombre = pareja.nombre;
        parejaCreateDto.anios = +pareja.anios;
        parejaCreateDto.sonCasados = pareja.sonCasados;
        parejaCreateDto.precio = +pareja.precio;

        const errores = await validate(parejaCreateDto);
        if (errores.length > 0) {
          res.render('pareja/rutas/ruta_crear_pareja',
            {
              datos: {
                parques,
                tipoMensaje: 2,
                mensaje: "Error en los datos ingresados"
              }
            }
          );
        } else {
          try {
            await this._parejaService.crearPareja(pareja);
            res.render('pareja/rutas/ruta_crear_pareja',
              {
                datos: {
                  parques,
                  tipoMensaje: 1,
                  mensaje: "La Pareja a sido ingresada correctamente"
                }
              }
            );
          } catch (e) {
            res.render('pareja/rutas/ruta_crear_pareja',
              {
                datos: {
                  parques,
                  tipoMensaje: 2,
                  mensaje: "Error en el ingreso de la pareja"
                }
              }
            );
          }
        }
      } else {
        res.render('pareja/rutas/ruta_crear_pareja',
          {
            datos: {
              parques,
              tipoMensaje: 2,
              mensaje: "No tiene permisos de administrador"
            }
          }
        );
      }
    }
  }

  @Get(':id')
  buscarUnaPareja(
    @Param('id') id: string,
  ): Promise<ParejaEntity | undefined> {
    return this._parejaService.buscarUnaPareja(Number(id));
  }

  @Get()
  buscarParejas(
    @Query('skip') skip?: string | number,
    @Query('take') take?: string | number,
    @Query('where') where?: string,
    @Query('order') order?: string
  ): Promise<ParejaEntity[] | undefined> {
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
    @Session() session
  ): Promise<void> {
    if (session) {
      const parques = await this._parqueService.buscarParques();
      if (session.usuario.roles.includes('Administrador')) {
        const parejaUpdateDto = new ParejaUpdateDto();
        parejaUpdateDto.nombre = pareja.nombre;
        parejaUpdateDto.anios = +pareja.anios;
        parejaUpdateDto.sonCasados = pareja.sonCasados;
        parejaUpdateDto.precio = +pareja.precio;
        parejaUpdateDto.id = +id;
        const errores = await validate(parejaUpdateDto);
        if (errores.length > 0) {
          res.render('pareja/rutas/ruta_crear_pareja',
            {
              datos: {
                pareja,
                parques,
                tipoMensaje: 2,
                mensaje: errores
              }
            }
          );
        } else {
          try {
            const parejaEditar = await this._parejaService.actualizarParejas(+id, pareja);
            res.render('pareja/rutas/ruta_crear_pareja',
              {
                datos: {
                  parques,
                  pareja: parejaEditar,
                  tipoMensaje: 1,
                  mensaje: "La Pareja a sido modificada correctamente"
                }
              }
            );
          } catch (e) {
            res.render('pareja/rutas/ruta_crear_pareja',
              {
                datos: {
                  pareja,
                  parques,
                  tipoMensaje: 2,
                  mensaje: "No se pudo modificar la pareja"
                }
              }
            );
          }

        }
      } else {
        res.render('pareja/rutas/ruta_crear_pareja',
          {
            datos: {
              pareja,
              parques,
              tipoMensaje: 2,
              mensaje: "No tiene permisos de Administrador"
            }
          }
        );
      }
    }

  }

  @Post('eliminar/:id')
  async eliminarPareja(
    @Param('id') id: string,
    @Res() res,
    @Session() session
  ): Promise<void> {
    if (session) {
      if (session.usuario.roles.includes('Administrador')) {
        try {
          await this._parejaService.borrarPareja(+id);
          const parejas = await this._parejaService.buscarParejas();
          res.render('pareja/rutas/ruta_mostrar_pareja',
            {
              datos: {
                parejas,
                mensaje: "La Pareja ha sido eliminada",
              }
            }
          );
        } catch (error) {
          throw new BadRequestException();
        }
      } else {
        res.send("No cuenta con permisos de Administrador");
      }
    }

  }
}
