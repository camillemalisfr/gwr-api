import { IsEmail, IsNotEmpty, IsString, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  countryOfOrigin: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  countryOfDestination: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  travelDateStart: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  travelDateEnd: Date;
}
