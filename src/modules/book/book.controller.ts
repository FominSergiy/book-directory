import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Patch,
    Delete,
    ValidationPipe,

} from "@nestjs/common";
import { book as BookModel } from "@prisma/client";
import { createBookDto, patchBookDto } from "src/dto/book";
import { PrismaService } from "../prisma/prisma.service";
import { CustomParseIntPipe } from "src/pipes/parseInt.pipe";
import { CustomValidateDatePipe } from "src/pipes/parseDate.pipe";


@Controller()
export class BookController {
    constructor(private readonly prismaService: PrismaService) {}

    @Get('books')
    async getFilteredBooks(): Promise<BookModel[]> {
        return this.prismaService.book.findMany({
            orderBy: {
                updatedAt: 'asc'
            }
        });
    }

    @Get('book/:id')
    async getBookById(
        @Param('id', new CustomParseIntPipe()) id: number
    ): Promise<BookModel> {
     return this.prismaService.book.findUnique({
        where: { id: id }
     })
    }

    @Post('create-book')
    async createBook(
        @Body(
            new ValidationPipe(),
            new CustomValidateDatePipe()
        ) postData: createBookDto,
    ): Promise<BookModel> {
        const {
            title,
            authorFirstName,
            authorLastName,
            year,
        } = postData

        const author = await this.prismaService.author.findFirst(
            { where: {
                firstName: authorFirstName,
                lastName: authorLastName,
                middleName: postData?.authorMiddleName,
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
                            middleName: postData?.authorMiddleName
                        }
                    },
                    year: new Date(year),
                    description: postData?.description
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
                description: postData?.description
            }
        })
    }

    @Patch('update-book/:id')
    async updateBook(
        @Param('id', new CustomParseIntPipe()) id: number,
        @Body(
            new ValidationPipe(),
            new CustomValidateDatePipe()
        ) patchData: patchBookDto,
    ): Promise<BookModel> {

        // could be a pipe
        const data = {
            title: patchData?.title,
            year:  patchData.year ? new Date(patchData.year) : undefined,
            description: patchData?.description,
        }
        // remove any undefined values
        Object.keys(data).forEach(
            key => data[key] === undefined && delete data[key]
        )

        return this.prismaService.book.update({
            where: {id: id},
            data: data
        })
    }

    @Delete('remove-book/:id')
    async deleteBook(
        @Param(
            'id', new CustomParseIntPipe()
        ) id: number): Promise<BookModel> {
            return this.prismaService.book.delete({
                where: {id: id}
            })
    }

}