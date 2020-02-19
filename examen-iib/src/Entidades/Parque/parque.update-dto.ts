import { IsNotEmpty, IsNumber, IsString, Min, MinLength, IsBoolean } from 'class-validator';

export class ParqueUpdateDto{

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
  @Min(100)
  area: number

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  id:number;
}
