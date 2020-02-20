import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FacturaEntity } from "./factura.entity";
import { FacturaService } from "./factura.service";
import { FacturaController } from "./factura.controller";
import { ParqueEntity } from "../Parque/parque.entity";
import { ParejaEntity } from "../Pareja/pareja.entity";
import { ParqueService } from "../Parque/parque.service";
import { ParejaService } from "../Pareja/pareja.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FacturaEntity,
            ParqueEntity,
            ParejaEntity
        ],
            'default'
        )
    ],
    controllers: [
        FacturaController
    ],
    providers: [
        FacturaService,
        ParqueService,
        ParejaService
    ],
    exports: [
        FacturaService,
        ParqueService,
        ParejaService
    ]
})
export class FacturaModule { }