import { IsNotEmpty, IsNumber, IsString, Min, MinLength, IsBoolean } from 'class-validator';

export class ParejaUpdateDto{

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  anios: number

  @IsNotEmpty()
  @IsBoolean()
  sonCasados: boolean

  @IsNotEmpty()
  @IsNumber()
  precio: number

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  id:number;
}
