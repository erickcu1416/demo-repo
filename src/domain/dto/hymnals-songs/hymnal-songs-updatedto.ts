import { IsOptional, IsString } from "class-validator";

export class HymnalSongsUpdateDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  content: string;
  @IsString()
  @IsOptional()
  number: string;
}
