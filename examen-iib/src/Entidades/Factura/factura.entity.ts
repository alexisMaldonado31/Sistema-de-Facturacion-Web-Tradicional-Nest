import {Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { type } from "os";
import { ParejaEntity } from "../Pareja/pareja.entity";
import { UsuarioEntity } from "../Usuario/usuario.entity";
import { DetalleFacturaEntity } from "../DetalleFactura/detalleFactura.entity";
@Entity('factura')
export class FacturaEntity{
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'factura_id'
    })
    id: number;

    @Column({
        type: 'date',
        nullable: false,
        name: 'factura_fecha',        
    })
    fecha: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        nullable: false,
        name: 'factura_total'        
    })
    total: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'factura_direccion',        
    })
    direccion: string;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.facturas
    )
    usuario: UsuarioEntity

    @OneToMany(
        type => DetalleFacturaEntity,
        detalleFactura => detalleFactura.factura
    )
    detalles: DetalleFacturaEntity[]
}