import { Recipe } from "src/module/recipe/entity/recipe.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];
}
