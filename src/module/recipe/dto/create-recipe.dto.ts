import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
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
