import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParejaEntity } from "./pareja.entity";
import { ParejaService } from "./pareja.service";
import { ParejaController } from "./pareja.controller";
import { ParqueService } from "../Parque/parque.service";
import { ParqueEntity } from "../Parque/parque.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParejaEntity,
            ParqueEntity
        ],
        'default'
        )
    ],
    controllers: [
        ParejaController
    ],
    providers: [
        ParejaService,
        ParqueService
    ],
    exports: [
        ParejaService,
        ParqueService
    ]
})
export class ParejaModule{}