import { IsEmail, IsString, MinLength } from "class-validator";

export class UserUpdateDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  last_name: string;
}
