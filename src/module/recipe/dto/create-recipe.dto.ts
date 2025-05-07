import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(250)
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  ingredients: string[];

  @IsOptional()
  image?: File;

  @IsString()
  @IsOptional()
  imagePath: string;
}
