import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RecipeRepository } from "../repository/recipe.repository";
import { UserService } from "src/module/user/service/user.service";
import { CreateRecipeDto } from "../dto/create-recipe.dto";
import { UpdateRecipeDto } from "../dto/update-recipe.dto";
import { RecipeMapper } from "../mapper/recipe.mapper";
import { Recipe } from "../entity/recipe.entity";

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly recipeMapper: RecipeMapper,
    private readonly userService: UserService,
  ) { }

  async getAll(): Promise<Recipe[]> {
    return await this.recipeRepository.getAll();
  }

  async getOneById(id: number): Promise<Recipe> {
    return await this.recipeRepository.getOneById(id);
  }

  async create(
    createRecipeDto: CreateRecipeDto,
    userId: number,
  ): Promise<Recipe> {
    const user = await this.userService.getOneById(userId);

    const mappedRecipe = this.recipeMapper.fromCreateRecipeDtoToRecipe(
      createRecipeDto,
      user,
    );

    return await this.recipeRepository.create(mappedRecipe);
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
    userId: number,
  ): Promise<Recipe> {
    const recipeToUpdate = await this.recipeRepository.getOneById(id);

    if (recipeToUpdate.user.id !== userId) {
      throw new UnauthorizedException("You cannot edit this recipe");
    }

    return await this.recipeRepository.update(id, updateRecipeDto);
  }

  async delete(id: number, userId: number): Promise<void> {
    const recipeToDelete = await this.recipeRepository.getOneById(id);

    if (recipeToDelete.user.id !== userId) {
      throw new UnauthorizedException("You cannot delete this recipe");
    }

    return await this.recipeRepository.delete(id);
  }
}
