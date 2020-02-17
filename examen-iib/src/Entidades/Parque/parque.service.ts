import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ParqueEntity } from "./parque.entity";
import { Repository, DeleteResult } from "typeorm";

@Injectable()
export class ParqueService{
    constructor(
        @InjectRepository(ParqueEntity)
        private _repositorioParque: Repository<ParqueEntity>
    ){
    }

    buscarUnParque(id: number): Promise<ParqueEntity | undefined>{
        return this._repositorioParque.findOne(id);
    }

    crearParque(parque: ParqueEntity){
        return this._repositorioParque.save(parque);
    }

    borrarParque(id: number): Promise<DeleteResult>{
        return this._repositorioParque.delete(id);
    }
    
    actualizarParque(id: number, parque: ParqueEntity): Promise<ParqueEntity>{
    parque.id = id;
    return  this._repositorioParque.save(parque);
    }
    
    buscarParques(
    where: any = {},
    skip: number = 0,
    take: number = 10,
    order: any = {
        nombre: 'DESC'
       }
    ): Promise<ParqueEntity[]>{
    return  this._repositorioParque.find(
        {
        where: where,
        skip: skip,
        take: take,
        order: order
        }
    );
    }
}