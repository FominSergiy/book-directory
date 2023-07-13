import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Author } from '../author/author.model';

@ObjectType()
export class Book {
    @Field(type => ID)
    id: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field()
    title: string;

    @Field(type => Author)
    author: Author;

    @Field()
    year: Date;

    @Field({ nullable: true })
    description: string
}