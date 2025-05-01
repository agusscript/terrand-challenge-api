import { Injectable } from "@nestjs/common";
import { ICreateUserDto } from "../dto/create-user.dto.interface";
import { User } from "../entity/user.entity";

@Injectable()
export class UserMapper {
  fromCreateUserDtoToUser(createUserDto: ICreateUserDto): User {
    const user = new User();

    user.name = createUserDto.name;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return user;
  }
}
