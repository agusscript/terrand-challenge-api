import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedRequest } from "src/module/authentication/interface/authenticated-request.interface";
import { AuthenticationGuard } from "src/module/authentication/guard/authentication.guard";
import { RecipeService } from "../service/recipe.service";
import { CreateRecipeDto } from "../dto/create-recipe.dto";
import { UpdateRecipeDto } from "../dto/update-recipe.dto";
import { Recipe } from "../entity/recipe.entity";

@Controller("recipe")
@UseGuards(AuthenticationGuard)
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  @Get()
  async getAll(): Promise<Recipe[]> {
    return this.recipeService.getAll();
  }

  @Get(":id")
  async getOneById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Recipe> {
    return this.recipeService.getOneById(id);
  }

  @Post()
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<Recipe> {
    return this.recipeService.create(
      createRecipeDto,
      request.user.id
    );
  }

  @Patch(":id")
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<Recipe> {
    return this.recipeService.update(
      id,
      updateRecipeDto,
      request.user.id
    );
  }

  @Delete(":id")
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ): Promise<void> {
    return this.recipeService.delete(
      id,
      request.user.id
    );
  }
}
