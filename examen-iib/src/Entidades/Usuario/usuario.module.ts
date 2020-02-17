import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsuarioEntity
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
export class UsuarioModule{}