import {Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { type } from "os";
import { ParejaEntity } from "../Pareja/pareja.entity";
import { FacturaEntity } from "../Factura/factura.entity";
@Entity('usuario')
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'usuario_id'
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'username',
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'password'        
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'rol'
    })
    rol: string;

    @OneToMany(
        type => FacturaEntity,
        detalleFactura => detalleFactura.usuario
    )
    facturas: FacturaEntity[]
    
}