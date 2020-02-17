import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParejaEntity } from "./pareja.entity";
import { ParejaService } from "./pareja.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ParejaEntity
        ],
        'default'
        )
    ],
    controllers: [

    ],
    providers: [
        ParejaService
    ],
    exports: [
        ParejaService
    ]
})
export class ParejaModule{}