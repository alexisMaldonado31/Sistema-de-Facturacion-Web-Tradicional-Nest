import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParqueEntity } from "./parque.entity";
import { ParqueService } from "./parque.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParqueEntity
        ],
        'default'
        )
    ],
    controllers: [

    ],
    providers: [
        ParqueService
    ],
    exports: [
        ParqueService
    ]
})
export class ParqueModule{}