import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParqueEntity } from './Entidades/Parque/parque.entity';
import { ParejaEntity } from './Entidades/Pareja/pareja.entity';
import { FacturaEntity } from './Entidades/Factura/factura.entity';
import { DetalleFacturaEntity } from './Entidades/DetalleFactura/detalleFactura.entity';
import { UsuarioEntity } from './Entidades/Usuario/usuario.entity';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ParqueModule } from './Entidades/Parque/parque.module';
import { ParejaModule } from './Entidades/Pareja/pareja.module';
import { FacturaModule } from './Entidades/Factura/factura.module';
import { DetalleFacturaModule } from './Entidades/DetalleFactura/detalleFactura.module';
import { UsuarioModule } from './Entidades/Usuario/usuario.module';

@Module({
  imports: [
    ParqueModule,
    ParejaModule,
    FacturaModule,
    DetalleFacturaModule,
    UsuarioModule,
    TypeOrmModule.forRoot(
      {
          name: 'default',
          type: 'mysql',
          host: '127.0.0.1',
          port: 32769,
          username: 'root',
          password: 'root',
          database: 'examen',
          dropSchema: false,
          entities: [
            ParqueEntity,
            ParejaEntity,
            FacturaEntity,
            DetalleFacturaEntity,
            UsuarioEntity
          ],
          synchronize: true, // Crear -> true , Conectar -> false
      }
  )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
