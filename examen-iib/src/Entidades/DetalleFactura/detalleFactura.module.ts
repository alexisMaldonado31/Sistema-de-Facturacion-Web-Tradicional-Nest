import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetalleFacturaEntity } from "./detalleFactura.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DetalleFacturaEntity
        ],
        'default'
        )
    ],
    controllers: [

    ],
    providers: [

    ],
    exports: [

    ]
})
export class DetalleFacturaModule{}