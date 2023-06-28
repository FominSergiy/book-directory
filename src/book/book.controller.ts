import {
    Controller,
    Param,
    Query,
    Body,
    Get,
    Post,
    Patch,
    Delete,

} from "@nestjs/common";
import {book as BookModel } from "@prisma/client";
import { createBookDto, patchBookDto } from "src/dto/book";



@Controller()
export class BookController {
    constructor() {} //add service

    @Get('books')
    async getFilteredBooks(): Promise<BookModel[]> { // has to take the db service
        // return from the client
    }

    @Get('book/:id')
    async getBookById(@Param('id') id: string): Promise<BookModel> {
        // return unique item
    } // add filter for numeric string


    @Post('create-book')
    async createBook(
        @Body() postData: createBookDto,
    ): Promise<BookModel> {
        // create new book and return
        // validate req body with the right info
    }

    @Patch('update-book')
    async updateBook(
        @Body() patchData: patchBookDto,
    ): Promise<BookModel> {
        // do patch here
        // validate obj has at least some props
        // needed for update
    }

    @Delete('remove-book/:id')
    async deleteBook(@Param('id') id: string): string {
        // try rm resource
        // raise error if did not
        // return 'complete' if deletion is goooood
    }

}