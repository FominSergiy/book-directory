import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Book } from "src/modules/book/book.model";
import { book as BookModel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CustomParseIntPipe } from "src/pipes/parseInt.pipe";
import { CreateBookArgs, PatchBookArgs } from "src/modules/book/graphql-book";
import { ValidationPipe } from "@nestjs/common";
import { CustomValidateDatePipe } from "src/pipes/parseDate.pipe";

@Resolver(of => Book)
export class BookResolver {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    @Query(returns => [Book], { name: 'books'})
    async getBooks(): Promise<BookModel[]> {
        return this.prismaService.book.findMany({
            orderBy: {
                updatedAt: 'asc'
            }
        });
    }

    @Query(returns => Book, {name: 'book'})
    async getBookById(
        @Args('id', {type: () => Int}, new CustomParseIntPipe()) id: number
    ): Promise<BookModel> {
        return await this.prismaService.book.findUnique({
            where: { id: id },
            include: {
                author: true
            }
        })
    }

    @Mutation(returns => Book)
    async createBook(
        @Args(
            new ValidationPipe(),
            new CustomValidateDatePipe()
        ) args: CreateBookArgs
    ): Promise<BookModel> {
        const {
            title,
            authorFirstName,
            authorLastName,
            year,
        } = args

        const author = await this.prismaService.author.findFirst(
            { where: {
                firstName: authorFirstName,
                lastName: authorLastName,
                middleName: args?.authorMiddleName,
            }}
        )

        // add new author if it doesn't exist
        if (!author) {
            return this.prismaService.book.create({
                data: {
                    title: title,
                    author: {
                        create: {
                            firstName: authorFirstName,
                            lastName: authorLastName,
                            middleName: args?.authorMiddleName
                        }
                    },
                    year: new Date(year),
                    description: args?.description
                }
            })
        }


        return this.prismaService.book.create({
            data: {
                title,
                author: {
                    connect: {
                        id: author.id
                    }
                },
                year: new Date(year),
                description: args?.description
            }
        })
    }

    @Mutation(returns => Book)
    async updateBook(
        @Args('id', {type: () => Int}) id: number,
        @Args(
            new ValidationPipe(),
            new CustomValidateDatePipe()
        ) patchBookArgs: PatchBookArgs
    ):  Promise<BookModel> {

        // could be a pipe
        const data = {
            title: patchBookArgs?.title,
            year:  patchBookArgs.year ? new Date(patchBookArgs.year) : undefined,
            description: patchBookArgs?.description,
        }
        // remove any undefined values
        Object.keys(data).forEach(
            key => data[key] === undefined && delete data[key]
        )

        return this.prismaService.book.update({
            where: {id: id},
            data: data,
            include: {
                author: true
            }
        })
    }

    @Mutation(returns => Book)
    async deleteBook(
        @Args('id', {type: () => Int}) id: number
    ): Promise<BookModel> {
        return this.prismaService.book.delete({
            where: {id: id},
            include: {
                author: true
            }
        })
    }


}