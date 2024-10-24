import { IsString } from "class-validator";


export class HymnalUpdateDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  total_songs: string;
  @IsString()
  dowlnloads: string;
}
