import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, } from "@nestjs/common";
import { IAuthenticatedRequest } from "src/module/authentication/interface/authenticated-request.interface";
import { AuthenticationGuard } from "src/module/authentication/guard/authentication.guard";
import { RecipeService } from "../service/recipe.service";
import { CreateRecipeDto } from "../dto/create-recipe.dto";
import { UpdateRecipeDto } from "../dto/update-recipe.dto";
import { Recipe } from "../entity/recipe.entity";
import FileUploadHandler from "../decorator/file-upload-handler.decorator";

@Controller("recipe")
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  @Get()
  async getAll(): Promise<Recipe[]> {
    return this.recipeService.getAll();
  }

  @Get("mine")
  @UseGuards(AuthenticationGuard)
  async getAllByUserId(
    @Req() request: IAuthenticatedRequest,
  ): Promise<Recipe[]> {
    return this.recipeService.getAllByUserId(
      request.user.id
    );
  }

  @Get(":id")
  async getOneById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Recipe> {
    return this.recipeService.getOneById(id);
  }

  @Post()
  @FileUploadHandler("image", "./uploads")
  @UseGuards(AuthenticationGuard)
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @Req() request: IAuthenticatedRequest,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Recipe> {
    return this.recipeService.create(
      createRecipeDto,
      request.user.id,
      image
    );
  }

  @Patch(":id")
  @FileUploadHandler("image", "./uploads")
  @UseGuards(AuthenticationGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Req() request: IAuthenticatedRequest,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Recipe> {
    return this.recipeService.update(
      id,
      updateRecipeDto,
      request.user.id,
      image
    );
  }

  @Delete(":id")
  @UseGuards(AuthenticationGuard)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: IAuthenticatedRequest,
  ): Promise<void> {
    return this.recipeService.delete(
      id,
      request.user.id
    );
  }
}
