import {Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { FacturaEntity } from "../Factura/factura.entity";
import { ParejaEntity } from "../Pareja/pareja.entity";
@Entity('detalleFactura')
export class DetalleFacturaEntity{
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'detalle_factura_id'
    })
    id: number;

    @Column({
        type: 'int',
        nullable: false,
        name: 'cantidad',
    })
    cantidad: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'precio',
    })
    precio: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        nullable: false,
        name: 'subtotal'        
    })
    subtotal: number;

    @ManyToOne(
        type=> FacturaEntity,
        factura => factura.detalles
    )
    factura: FacturaEntity

    @ManyToOne(
        type=> ParejaEntity,
        pareja => pareja.detalles
    )
    pareja: ParejaEntity
}