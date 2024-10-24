import { IsOptional, IsString} from "class-validator";

export class HymnalSongsCreateDto {
  @IsString()
  id_hymnal: string;
  @IsString()
  name: string;
  @IsString()
  content: string;
  @IsString()
  @IsOptional()
  number: string;
}
