import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';


export class createBookDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    authorFirstName: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    authorMiddleName?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    authorLastName: string;

    @IsString()
    year: string

    @IsOptional()
    description?: string;
}

export class patchBookDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @IsOptional()
    title?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @IsOptional()
    authorFirstName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    @IsOptional()
    authorMiddleName?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @IsOptional()
    authorLastName?: string;

    @IsString()
    @IsOptional()
    year: string

    @IsOptional()
    description?: string;
}