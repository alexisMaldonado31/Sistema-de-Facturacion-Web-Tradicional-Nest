import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { DetalleFacturaEntity } from "./detalleFactura.entity";

@Injectable()
export class DetalleFacturaService {
    constructor(
        @InjectRepository(DetalleFacturaEntity)
        private _repositorioFactura: Repository<DetalleFacturaEntity>
    ) {
    }

    crearDetalleFactura(detalleFactura: DetalleFacturaEntity) {
        console.log('aqui stoy');
        console.log(detalleFactura);
        return this._repositorioFactura.save(detalleFactura);
    }

    borrarDetalleFactura(id: number): Promise<DeleteResult>{
        return this._repositorioFactura.delete(id);
    }

    buscarDetallesFactura(
        where: any = {},
        skip: number = 0,
        take: number = 10,
        order: any = {
            id: 'DESC'
        }
    ): Promise<DetalleFacturaEntity[]> {
        return this._repositorioFactura.find(
            {
                where: where,
                skip: skip,
                take: take,
                order: order,
                relations: ["pareja", "factura"]
            }
        );
    }
}