import { IsString } from "class-validator";


export class HymnalCreateDto {
  @IsString()
  name: string;
  @IsString()
  total_songs: string;
  @IsString()
  dowlnloads: string;
}
