import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParejaEntity } from "./pareja.entity";

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

    ],
    exports: [

    ]
})
export class ParejaModule{}