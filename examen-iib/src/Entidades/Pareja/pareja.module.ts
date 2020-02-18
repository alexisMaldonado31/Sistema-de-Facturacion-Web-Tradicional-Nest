import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParejaEntity } from "./pareja.entity";
import { ParejaService } from "./pareja.service";
import { ParejaController } from "./pareja.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParejaEntity
        ],
        'default'
        )
    ],
    controllers: [
        ParejaController
    ],
    providers: [
        ParejaService
    ],
    exports: [
        ParejaService
    ]
})
export class ParejaModule{}