import { ForbiddenException, Injectable } from "@nestjs/common";
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

  async getAllByUserId(userId: number): Promise<Recipe[]> {
    const user = await this.userService.getOneById(userId);
    return await this.recipeRepository.getAllByUserId(user.id);
  }

  async getOneById(id: number): Promise<Recipe> {
    return await this.recipeRepository.getOneById(id);
  }

  async create(
    createRecipeDto: CreateRecipeDto,
    userId: number,
    image?: Express.Multer.File,
  ): Promise<Recipe> {
    const user = await this.userService.getOneById(userId);

    const mappedRecipe = this.recipeMapper.fromDtoToEntity(
      createRecipeDto,
      user,
    );
    
    if (image) {
      mappedRecipe.imagePath = image.filename;
    }

    return await this.recipeRepository.create(mappedRecipe);
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
    userId: number,
    image?: Express.Multer.File,
  ): Promise<Recipe> {
    const recipeToUpdate = await this.recipeRepository.getOneById(id);

    if (recipeToUpdate.user.id !== userId) {
      throw new ForbiddenException("You cannot edit this recipe");
    }

    if (image) {
      updateRecipeDto.imagePath = image.filename;
    }

    return await this.recipeRepository.update(id, updateRecipeDto);
  }

  async delete(id: number, userId: number): Promise<void> {
    const recipeToDelete = await this.recipeRepository.getOneById(id);

    if (recipeToDelete.user.id !== userId) {
      throw new ForbiddenException("You cannot delete this recipe");
    }

    return await this.recipeRepository.delete(id);
  }
}
