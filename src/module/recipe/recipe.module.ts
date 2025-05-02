import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Recipe } from "./entity/recipe.entity";
import { RecipeController } from "./controller/recipe.controller";
import { RecipeService } from "./service/recipe.service";
import { RecipeRepository } from "./repository/recipe.repository";
import { UserModule } from "../user/user.module";
import { RecipeMapper } from "./mapper/recipe.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), UserModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository, RecipeMapper],
})
export class RecipeModule { }
