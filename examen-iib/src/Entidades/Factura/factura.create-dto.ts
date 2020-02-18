import { IsNotEmpty, IsNumber, IsString, Min, MinLength, IsBoolean } from 'class-validator';

export class FacturaCreateDto{

  @IsNotEmpty()
  @IsString()
  fecha: string;

  @IsNotEmpty()
  @IsNumber()
  total: number

  @IsNotEmpty()
  @IsString()
  direccion: string
}
