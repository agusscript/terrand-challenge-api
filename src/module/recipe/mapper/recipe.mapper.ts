import { Injectable } from "@nestjs/common";
import { CreateRecipeDto } from "../dto/create-recipe.dto";
import { Recipe } from "../entity/recipe.entity";
import { User } from "src/module/user/entity/user.entity";

@Injectable()
export class RecipeMapper {
  fromDtoToEntity(
    createRecipeDto: CreateRecipeDto,
    user: User
  ): Recipe {
    const recipe = new Recipe();

    recipe.title = createRecipeDto.title;
    recipe.description = createRecipeDto.description;
    recipe.ingredients = createRecipeDto.ingredients;
    recipe.imagePath = createRecipeDto.imagePath;
    recipe.user = user;

    return recipe;
  }
}
