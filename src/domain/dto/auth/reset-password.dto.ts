import { IsEmail} from "class-validator";

export class ResetPassordDto {
  @IsEmail()
  email: string;
}
