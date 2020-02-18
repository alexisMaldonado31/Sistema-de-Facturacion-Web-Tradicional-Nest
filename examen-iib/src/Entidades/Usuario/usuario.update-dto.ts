import { IsNotEmpty, IsNumber, IsString, Min, MinLength, IsBoolean, MaxLength } from 'class-validator';

export class UsuarioUpdateDto{

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  rol: string
  
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  id:number;
}
