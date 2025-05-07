import { User } from "src/module/user/entity/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "recipe" })
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("simple-array")
  ingredients: string[];

  @Column({ nullable: true })
  imagePath: string;

  @ManyToOne(() => User, (user) => user.recipes, { nullable: false })
  user: User;

  @DeleteDateColumn()
  deletedAt: Date;
}
