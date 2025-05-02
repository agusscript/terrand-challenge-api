import { UpdateRecipeDto } from "../dto/update-recipe.dto";
import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Recipe } from "../entity/recipe.entity";
import { Repository } from "typeorm";

export class RecipeRepository {
  constructor(
    @InjectRepository(Recipe)
    private readonly repository: Repository<Recipe>
  ) { }

  async getAll(): Promise<Recipe[]> {
    return await this.repository.find();
  }

  async getOneById(id: number): Promise<Recipe> {
    const recipe = await this.repository.findOne({
      where: { id },
      relations: { user: true }
    });

    if (!recipe) {
      throw new BadRequestException("Recipe not found");
    }

    return recipe;
  }

  async create(recipe: Recipe): Promise<Recipe> {
    return await this.repository.save(recipe);
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const recipeToUpdate = await this.repository.preload({
      ...updateRecipeDto,
      id,
    });

    if (!recipeToUpdate) {
      throw new BadRequestException("Recipe not found");
    }

    return this.repository.save(recipeToUpdate);
  }

  async delete(id: number): Promise<void> {
    const recipeToDelete = await this.repository.findOne({
      where: { id }
    });

    if (!recipeToDelete) {
      throw new BadRequestException("Recipe not foundasd");
    }

    await this.repository.softDelete(id);
  }
}
