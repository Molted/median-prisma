import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ConnectionArgsDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  first: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  last: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  after: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  before: string;
}
