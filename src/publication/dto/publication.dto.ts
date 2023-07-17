import {
  Equals,
  IsDateString,
  IsNotEmpty,
  IsString,
  Matches,
  IsBoolean,
} from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsDateString()
  // @Matches(/^\d{4}-\d{2}-\d{2}$/)
  dateToPublish: string;

  @IsBoolean()
  @Equals(false)
  published: boolean;

  @IsString()
  @IsNotEmpty()
  socialMedia: string;

  userId: number;
}
