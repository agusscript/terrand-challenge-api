import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
