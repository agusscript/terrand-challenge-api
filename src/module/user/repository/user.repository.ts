import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common";

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) { }

  async getOneByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email }
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return user;
  }

  async create(user: User): Promise<User> {
    const existingUser = await this.repository.findOne({
      where: { email: user.email }
    });

    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    return await this.repository.save(user);
  }
}
