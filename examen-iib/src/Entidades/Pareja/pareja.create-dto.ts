import { IsNotEmpty, IsNumber, IsString, Min, MinLength, IsBoolean, IsBooleanString, IsNumberString } from 'class-validator';

export class ParejaCreateDto{

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  anios: number

  @IsNotEmpty()
  @IsBooleanString()
  sonCasados: boolean

  @IsNotEmpty()
  @IsNumber()
  precio: number
}
