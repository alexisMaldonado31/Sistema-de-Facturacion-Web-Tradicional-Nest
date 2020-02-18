import { IsNotEmpty, IsNumber, IsString, Min, MinLength, IsBoolean } from 'class-validator';

export class UsuarioCreateDto{

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  rol: string
}
