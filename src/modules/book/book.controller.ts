import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Patch,
    Delete,
    ParseIntPipe,
    HttpStatus,

} from "@nestjs/common";
import {book as BookModel } from "@prisma/client";
import { createBookDto, patchBookDto } from "src/dto/book";
import { PrismaService } from "../prisma/prisma.service";
import { CustomParseIntPipe } from "src/pipes/parseInt.pipe";



@Controller()
export class BookController {
    constructor(private readonly prismaService: PrismaService) {} //add service

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


    // @Post('create-book')
    // async createBook(
    //     @Body() postData: createBookDto,
    // ): Promise<BookModel> {
    //     // create new book and return
    //     // validate req body with the right info
    // }

    // @Patch('update-book')
    // async updateBook(
    //     @Body() patchData: patchBookDto,
    // ): Promise<BookModel> {
    //     // do patch here
    //     // validate obj has at least some props
    //     // needed for update
    // }

    // @Delete('remove-book/:id')
    // async deleteBook(@Param('id') id: string): string {
    //     // try rm resource
    //     // raise error if did not
    //     // return 'complete' if deletion is goooood
    // }

}