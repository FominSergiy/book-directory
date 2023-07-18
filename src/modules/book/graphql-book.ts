import {
    IsString,
  } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql'; 

@ArgsType()
export class CreateBookArgs {
    @Field() //graphql
    @IsString()
    title: string;

    @Field()
    @IsString()
    authorFirstName: string;

    @Field({ nullable: true })
    authorMiddleName?: string

    @Field()
    @IsString()
    authorLastName: string;

    @Field()
    @IsString()
    year: string

    @Field({ nullable: true })
    description?: string;
}


@ArgsType()
export class PatchBookArgs {
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    authorFirstName?: string;

    @Field({ nullable: true })
    authorMiddleName?: string;

    @Field({ nullable: true })
    authorLastName?: string;

    @Field()
    year: string;

    @Field({ nullable: true })
    description?: string;
}