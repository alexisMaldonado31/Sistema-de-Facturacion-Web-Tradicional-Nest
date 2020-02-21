import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { validate } from 'class-validator';
import { FacturaService } from './factura.service';
import { FacturaEntity } from './factura.entity';
import { FacturaCreateDto } from './factura.create-dto';
import { detalleFactura } from './detalleFactura';
import { ParqueService } from '../Parque/parque.service';
import { ParejaService } from '../Pareja/pareja.service';
import { UsuarioEntity } from '../Usuario/usuario.entity';
import e = require('express');

@Controller('factura')
export class FacturaController {
  constructor(
    private readonly _facturaService: FacturaService,
    private readonly _parqueService: ParqueService,
    private readonly _parejaService: ParejaService
  ) {
  }

  @Get('ruta/crear-factura')
  async rutaCrearFactura(
    @Res() res,
    @Session() session
  ) {
    if (session.usuario) {
      var facturas = await this._facturaService.buscarFacturas(
        {
          usuario: session.usuario.userId,
          estado: 0
        }
      );

      if (facturas.length > 0) {
        res.render('factura/rutas/ruta-crear-factura',
          {
            datos: {
              tipoMensaje: 2,
              mensaje: "No se puede seguir ingresando facturas mientras no haya sido finalizada la factura actual",
            }
          }
        );
      } else {
        res.render('factura/rutas/ruta-crear-factura',
          {
            datos: {
              tipoMensaje: 0,
            }
          }
        );
      }

    } else {
      res.redirect('/login');
    }
  }

  @Post('ruta/ingresarFactura')
  async rutaIngresarFactura(
    @Body() factura:FacturaEntity,
    @Res() res,
    @Session() session
  ): Promise<void>{
    if (session.usuario) {
      if (session.usuario.roles.includes('Usuario')) {
        const facturaCreateDto = new FacturaCreateDto();
        facturaCreateDto.fecha = factura.fecha;
        facturaCreateDto.direccion = factura.direccion;
        const errores = await validate(facturaCreateDto);
        if (errores.length > 0) {
          throw new BadRequestException(errores);
        } else {
          try {
            factura.total = 0;
            factura.estado = false;
            let usuario = new UsuarioEntity();
            usuario.id = session.usuario.userId;
            factura.usuario = usuario;
            var facturaCreada = await this._facturaService.crearFactura(factura);
            var parejas = await this._parejaService.buscarParejas();
            res.render('factura/rutas/ruta-crear-factura-con-detalles',
              {
                datos: {
                  factura: facturaCreada,
                  detalles: [],
                  parejas,
                  tipoMensaje: 0
                }
              }
            );
          } catch (e) {
            throw new BadRequestException(e);
          }
        }
      } else {
        res.send("No cuenta con permisos de Usuario");
      }
    }else{
      res.redirect('/login');
    }
  }

  @Get('ruta/mostrar-facturas')
  async rutaMostrarFacturas(
    @Res() res,
    @Session() session
  ) {
    if (session.usuario) {
      const facturas = await this._facturaService.buscarFacturas({ usuario: session.usuario.userId })
      res.render('factura/rutas/ruta-mostrar-facturas',
        {
          datos: {
            facturas
          }
        }
      );
    } else {
      res.redirect('/login');
    }

  }


  @Post()
  async ingresarFactura(
    @Body() factura: FacturaEntity,
    @Res() res,
    @Session() session
  ): Promise<void> {
    if (session) {
      if (session.usuario.roles.includes('Usuario')) {
        const facturaCreateDto = new FacturaCreateDto();
        facturaCreateDto.fecha = factura.fecha;
        facturaCreateDto.direccion = factura.direccion;
        const errores = await validate(facturaCreateDto);
        if (errores.length > 0) {
          throw new BadRequestException(errores);
        } else {
          try {
            factura.total = 0;
            factura.estado = false;
            let usuario = new UsuarioEntity();
            usuario.id = session.usuario.userId;
            factura.usuario = usuario;
            var facturaCreada = await this._facturaService.crearFactura(factura);
            var parejas = await this._parejaService.buscarParejas();
            res.render('factura/rutas/ruta-crear-factura-con-detalles',
              {
                datos: {
                  factura: facturaCreada,
                  detalles: [],
                  parejas,
                  tipoMensaje: 0
                }
              }
            );
          } catch (e) {
            throw new BadRequestException(e);
          }
        }
      } else {
        res.send("No cuenta con permisos de Usuario");
      }
    }
  }

  @Post('actualizarTotal/:id')
  async actualizarTotalFactura(
    @Param('id') id: string,
    @Query('total') total: string,
    @Res() res
  ): Promise<void> {
    await this._facturaService.editarTotal(+id, +total);
    res.send('ok');
  }

  @Post('finalizar/:id')
  async finalizarFactura(
    @Param('id') id: string,
    @Res() res
  ): Promise<void> {
    await this._facturaService.finalizarFactura(+id);
    res.redirect('/factura/ruta/crear-factura');
  }

  @Get(':id')
  buscarUnaFactura(
    @Param('id') id: string
  ): Promise<FacturaEntity | undefined | void> {
    return this._facturaService.buscarUnaFactura(Number(id));
  }

  @Get()
  buscarFacturas(
    @Query('skip') skip?: string | number,
    @Query('take') take?: string | number,
    @Query('where') where?: string,
    @Query('order') order?: string,
  ): Promise<FacturaEntity[] | undefined | void> {

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
      return this._facturaService.buscarFacturas(
        where,
        skip as number,
        take as number,
        order
      );  
  }
}
