
import { Field, ID, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Author {
    @Field(type => ID)
    id: number;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}