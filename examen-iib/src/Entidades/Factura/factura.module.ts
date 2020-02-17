import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FacturaEntity } from "./factura.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FacturaEntity
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
export class FacturaModule{}