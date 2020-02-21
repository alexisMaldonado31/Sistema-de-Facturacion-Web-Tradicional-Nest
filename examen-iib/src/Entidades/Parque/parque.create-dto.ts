import { IsNotEmpty, IsNumber, IsString, Min, MinLength, IsBoolean, IsNumberString } from 'class-validator';

export class ParqueCreateDto{

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string

  @IsNotEmpty()
  @IsString()
  ciudad: string

  @IsNotEmpty()
  @IsString()
  direccion: string

  @IsNotEmpty()
  @IsString()
  sector: string

  @IsNotEmpty()
  @IsString()
  codigoPostal: string

  @IsNotEmpty()
  @IsNumber()
  area: number

}
