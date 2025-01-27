import { IsNotEmpty, IsNumber, IsString, Min, MinLength, IsBoolean, IsNumberString } from 'class-validator';

export class DetalleFacturaCreateDto{

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  precio: number;
}
