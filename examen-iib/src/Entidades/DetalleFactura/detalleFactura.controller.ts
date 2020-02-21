import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { validate } from 'class-validator';
import { DetalleFacturaService } from './detalleFactura.service';
import { DetalleFacturaEntity } from './detalleFactura.entity';
import { DetalleFacturaCreateDto } from './detalleFactura.create-dto';
import { FacturaService } from '../Factura/factura.service';
import { ParejaService } from '../Pareja/pareja.service';
import { FacturaEntity } from '../Factura/factura.entity';

@Controller('detallefactura')
export class DetalleFacturaController {
  constructor(
    private readonly _detalleFacturaService: DetalleFacturaService,
    private readonly _facturaService: FacturaService,
    private readonly _parejaService: ParejaService
  ) {
  }

  @Get('ruta-ver-factura/:id')
  async verFactura(
    @Res() res,
    @Param('id') id: number,
    @Session() session
  ): Promise<void> {

    if (session.usuario) {
      let facturaCreada = await this._facturaService.buscarUnaFactura(+id);
      var parejas = await this._parejaService.buscarParejas();
      var detalles = await this._detalleFacturaService.buscarDetallesFactura({ factura: +id });
      res.render('factura/rutas/ruta-crear-factura-con-detalles',
        {
          datos: {
            factura: facturaCreada,
            detalles,
            parejas,
            tipoMensaje: 0,
          }
        }
      );
    } else {
      res.redirect('/login');
    }

  }

  @Post(':id')
  async ingresarDetalleFactura(
    @Param('id') id: string,
    @Body() detallefactura: DetalleFacturaEntity,
    @Res() res,
    @Session() session
  ): Promise<void> {
    if (session) {
      let factura = new FacturaEntity();
      factura.id = +id;
      detallefactura.factura = factura;
      let errores = [];
      if (session.usuario.roles.includes('Usuario')) {
        const detallefacturaCreateDto = new DetalleFacturaCreateDto();
        try {
          detallefacturaCreateDto.cantidad = +detallefactura.cantidad;
          detallefacturaCreateDto.precio = +detallefactura.precio;
          errores = await validate(detallefacturaCreateDto);
        } catch (e) {
          let facturaCreada = await this._facturaService.buscarUnaFactura(+id);
          var parejas = await this._parejaService.buscarParejas();
          var detalles = await this._detalleFacturaService.buscarDetallesFactura({ factura: +id });
          res.render('factura/rutas/ruta-crear-factura-con-detalles',
            {
              datos: {
                factura: facturaCreada,
                detalles,
                parejas,
                tipoMensaje: 2,
                mensaje: "Datos Erroneos"
              }
            }
          );
        }

        if (errores.length > 0) {
          let facturaCreada = await this._facturaService.buscarUnaFactura(+id);
          var parejas = await this._parejaService.buscarParejas();
          var detalles = await this._detalleFacturaService.buscarDetallesFactura({ factura: +id });
          res.render('factura/rutas/ruta-crear-factura-con-detalles',
            {
              datos: {
                factura: facturaCreada,
                detalles,
                parejas,
                tipoMensaje: 2,
                mensaje: "Datos Erroneos"
              }
            }
          );
        } else {
          try {

            detallefactura.subtotal = +detallefactura.cantidad * +detallefactura.precio;
            await this._detalleFacturaService.crearDetalleFactura(detallefactura);
            let facturaCreada = await this._facturaService.buscarUnaFactura(+id);
            console.log('total', facturaCreada.total);
            facturaCreada.total = Number(facturaCreada.total) + Number(detallefactura.subtotal);
            console.log('total', facturaCreada.total);
            await this._facturaService.editarTotal(+id, facturaCreada.total);
            var parejas = await this._parejaService.buscarParejas();
            var detalles = await this._detalleFacturaService.buscarDetallesFactura({ factura: +id });

            res.render('factura/rutas/ruta-crear-factura-con-detalles',
              {
                datos: {
                  factura: facturaCreada,
                  detalles,
                  parejas,
                  tipoMensaje: 0,
                }
              }
            );
          } catch (e) {
            let facturaCreada = await this._facturaService.buscarUnaFactura(+id);
            var parejas = await this._parejaService.buscarParejas();
            var detalles = await this._detalleFacturaService.buscarDetallesFactura({ factura: +id });
            res.render('factura/rutas/ruta-crear-factura-con-detalles',
              {
                datos: {
                  factura: facturaCreada,
                  detalles,
                  parejas,
                  tipoMensaje: 2,
                  mensaje: "Datos Erroneos"
                }
              }
            );
          }
        }
      } else {
        res.send("No cuenta con permisos de Usuario");
      }
    }
  }

  @Post('eliminar/:id')
  async eliminarDetalleFactura(
    @Param('id') id: string,
    @Query('facturaId') facturaId: string,
    @Query('subtotal') subtotal: string,
    @Res() res,
    @Session() session
  ): Promise<void> {
    if (session) {
      if (session.usuario.roles.includes('Usuario')) {
        try {
          await this._detalleFacturaService.borrarDetalleFactura(+id);
          let facturaCreada = await this._facturaService.buscarUnaFactura(+facturaId);
          console.log('subtotal:', subtotal, facturaCreada.total);
          facturaCreada.total = Number(facturaCreada.total) - Number(subtotal);
          console.log('total:', subtotal, facturaCreada.total);
          await this._facturaService.editarTotal(+facturaId, facturaCreada.total);
          var parejas = await this._parejaService.buscarParejas();
          var detalles = await this._detalleFacturaService.buscarDetallesFactura({ factura: +facturaId });
          res.render('factura/rutas/ruta-crear-factura-con-detalles',
            {
              datos: {
                factura: facturaCreada,
                detalles,
                parejas
              }
            }
          );
        } catch (e) {

        }
      } else {

      }
    }

  }


  @Get()
  buscarFacturas(
    @Query('skip') skip?: string | number,
    @Query('take') take?: string | number,
    @Query('where') where?: string,
    @Query('order') order?: string
  ): Promise<DetalleFacturaEntity[] | undefined> {
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
    return this._detalleFacturaService.buscarDetallesFactura(
      where,
      skip as number,
      take as number,
      order
    );
  }
}
