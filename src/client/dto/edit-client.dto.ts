import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditClientDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
