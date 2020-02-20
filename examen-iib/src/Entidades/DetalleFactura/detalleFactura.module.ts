import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetalleFacturaEntity } from "./detalleFactura.entity";
import { DetalleFacturaController } from "./detalleFactura.controller";
import { DetalleFacturaService } from "./detalleFactura.service";
import { FacturaEntity } from "../Factura/factura.entity";
import { ParejaEntity } from "../Pareja/pareja.entity";
import { FacturaService } from "../Factura/factura.service";
import { ParejaService } from "../Pareja/pareja.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DetalleFacturaEntity,
            FacturaEntity,
            ParejaEntity
        ],
        'default'
        )
    ],
    controllers: [
        DetalleFacturaController
    ],
    providers: [
        DetalleFacturaService,
        FacturaService,
        ParejaService
    ],
    exports: [
        DetalleFacturaService,
        FacturaService,
        ParejaService
    ]
})
export class DetalleFacturaModule{}