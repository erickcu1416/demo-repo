import { IsOptional, IsString} from "class-validator";

export class SongsCreateDto {
  @IsString()
  name: string;
  @IsString()
  content: string;
  @IsString()
  @IsOptional()
  number: string;
}
