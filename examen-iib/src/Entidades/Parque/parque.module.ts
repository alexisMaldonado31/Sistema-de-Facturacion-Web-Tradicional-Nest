import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParqueEntity } from "./parque.entity";
import { ParqueService } from "./parque.service";
import { ParqueController } from "./parque.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParqueEntity
        ],
        'default'
        )
    ],
    controllers: [
        ParqueController
    ],
    providers: [
        ParqueService
    ],
    exports: [
        ParqueService
    ]
})
export class ParqueModule{}