import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ParejaEntity } from "./pareja.entity";
import { Repository, DeleteResult } from "typeorm";

@Injectable()
export class ParejaService{
    constructor(
        @InjectRepository(ParejaEntity)
        private _repositorioPareja: Repository<ParejaEntity>
    ){}

    buscarUnaPareja(id: number): Promise<ParejaEntity | undefined>{
        return this._repositorioPareja.findOne(id);
    }

    crearPareja(pareja: ParejaEntity){
        return this._repositorioPareja.save(pareja);
    }

    borrarPareja(id: number): Promise<DeleteResult>{
        return this._repositorioPareja.delete(id);
    }
    
    actualizarParejas(id: number, pareja: ParejaEntity): Promise<ParejaEntity>{
    pareja.id = id;
    return  this._repositorioPareja.save(pareja);
    }
    
    buscarParejas(
    where: any = {},
    skip: number = 0,
    take: number = 10,
    order: any = {
        nombre: 'DESC'
       }
    ): Promise<ParejaEntity[]>{
    return  this._repositorioPareja.find(
        {
        where: where,
        skip: skip,
        take: take,
        order: order
        }
    );
    }
}