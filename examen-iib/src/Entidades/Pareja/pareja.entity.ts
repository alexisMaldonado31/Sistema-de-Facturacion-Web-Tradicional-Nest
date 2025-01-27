import {Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { ParqueEntity } from "../Parque/parque.entity";
import { DetalleFacturaEntity } from "../DetalleFactura/detalleFactura.entity";
@Entity('pareja')
export class ParejaEntity{
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'pareja_id'
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'pareja_nombre'
    })
    nombre: string;

    @Column({
        type: 'int',
        nullable: false,
        name: 'pareja_anios'        
    })
    anios: string;

    @Column({
        type: 'boolean',
        nullable: false,
        name: 'pareja_son_casados',        
    })
    sonCasados: boolean;

    @Column({
        type: 'float',
        nullable: false,
        precision: 10,
        scale:2,
        name: 'pareja_precio'
    })
    precio: string;

    @ManyToOne(
        type => ParqueEntity,
        parque => parque.parejas
    )
    parque: ParqueEntity

    @OneToMany(
        type => DetalleFacturaEntity,
        detalleFactura => detalleFactura.pareja
    )
    detalles: DetalleFacturaEntity[]
}