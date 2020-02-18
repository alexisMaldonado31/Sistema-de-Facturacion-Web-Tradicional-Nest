import {Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { type } from "os";
import { ParejaEntity } from "../Pareja/pareja.entity";
@Entity('parque')
export class ParqueEntity{
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'parque_id'
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'parque_nombre',
        unique: true
    })
    nombre: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'parque_descripcion'        
    })
    descripcion: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'parque_ciudad',        
    })
    ciudad: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'parque_direccion'        
    })
    direccion: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'parque_sector'        
    })
    sector: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'parque_codigo_postal',
        unique: true
    })
    codigoPostal: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        nullable: false,
        name: 'parque_area',
    })
    area: number;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'parque_tipo',
    })
    tipo: string;

    @Column({
        type: 'boolean',
        nullable: false,
        name: 'parque_es_destino_turistico',
    })
    esDestinoTuristico: boolean;

     @OneToMany(
         type => ParejaEntity,
         pareja => pareja.parque
     )
     parejas: ParejaEntity[]
}