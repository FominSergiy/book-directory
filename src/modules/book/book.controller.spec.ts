import { BookController } from "./book.controller";
import { PrismaService } from "../prisma/prisma.service";
import { book as BookModel } from "@prisma/client";
import { author as AuthorModel } from "@prisma/client";
import { Test, TestingModule } from '@nestjs/testing';
import { createBookDto, patchBookDto } from "src/modules/book/book";

const booksTestArray: BookModel[] = [
    {
        'authorId': 123,
        'createdAt': new Date(),
        'updatedAt': new Date(),
        'title': 'test title1',
        'year': new Date(1971,1,1),
        'id': 1,
        'description': 'my awesome test description'
    },
    {
        'authorId': 3121,
        'createdAt': new Date(),
        'updatedAt': new Date(),
        'title': 'test title2',
        'year': new Date(1971,1,1),
        'id': 1,
        'description': 'my awesome test description',
    },
    {
        'authorId': 3121,
        'createdAt': new Date(),
        'updatedAt': new Date(),
        'title': 'test title2',
        'year': new Date(1971,1,1),
        'id': 1,
        'description': 'my awesome test description',
    },
]

const singleBook: BookModel = booksTestArray[0];
const singleAuthor: AuthorModel = {
    id: 123,
    firstName: 'Aldous',
    lastName: 'Huxley',
    middleName: undefined,
}


const db = {
    book: {
        findMany: jest.fn().mockReturnValue(booksTestArray),
        findUnique: jest.fn().mockReturnValue(singleBook),
        findFirst: jest.fn().mockReturnValue(singleBook),
        create: jest.fn().mockReturnValue(singleBook),
        update: jest.fn().mockReturnValue(singleBook),
        delete: jest.fn().mockReturnValue(singleBook),
    },
    author: {
        findFirst: jest.fn().mockReturnValue(singleAuthor),
    }
}


describe('BookController', () => {
    let controller: BookController;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: PrismaService,
                    useValue: db,
                },
            ],
            controllers: [
                BookController,
            ]
        }).compile();

        controller = module.get<BookController>(BookController);
        prisma = module.get<PrismaService>(PrismaService);
    })

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })

    describe('getFilteredBooks', () => {
        it('Should return all books', async () => {
            const books = await controller.getFilteredBooks();
            expect(books).toEqual(booksTestArray);
            expect(prisma.book.findMany).toHaveBeenCalled();
        })
    })

    describe('getBookById', () => {
        it('Should return a book', async () => {
            const book: BookModel = await controller.getBookById(1);

            expect(book).toEqual(singleBook);
            // can check args passed to methods, NEAT
            expect(prisma.book.findUnique).toHaveBeenCalledWith({
                where: {id: 1}
            })
        })
    })

    describe('createBook', () => {
        it('Should create a book with an existing author', async () => {
            const bookData: createBookDto = {
                title: 'Brave New World',
                authorFirstName: 'Aldous',
                authorLastName: 'Huxley',
                year: '1932-01-01',
            }
            const book: BookModel = await controller.createBook(bookData);

            expect(book).toEqual(singleBook);
            expect(prisma.author.findFirst).toHaveBeenCalled();
            //existing author, connect on authorId
            expect(prisma.book.create).toHaveBeenCalledWith(
                {
                    data: {
                        title: bookData.title,
                        author: {
                            connect: {
                                id: singleAuthor.id
                            }
                        },
                        year: new Date(bookData.year),
                        description: undefined,
                    }
                }
            )
        })

        it('Should create a book and an author', async () => {
            // override prisma service mock return to undefined for author
            db.author.findFirst = jest.fn().mockReturnValue(undefined);

            const bookData: createBookDto = {
                title: 'Brave New World',
                authorFirstName: 'Aldous',
                authorLastName: 'Huxley',
                year: '1932-01-01',
            }
            const book: BookModel = await controller.createBook(bookData);

            expect(book).toEqual(singleBook);
            expect(prisma.author.findFirst).toHaveBeenCalled();
            // call to create a book with an author
            expect(prisma.book.create).toHaveBeenCalledWith(
                {
                    data: {
                        title: bookData.title,
                        author: {
                            create: {
                                firstName: bookData.authorFirstName,
                                lastName: bookData.authorLastName,
                                middleName: undefined
                            },
                        },
                        year: new Date(bookData.year),
                        description: undefined,
                    }
                }
            )
        })
    })

    describe('updateBook', () => {
        it('Updates a book', async () => {
            const updateBookData: patchBookDto = {
                year: '2022-01-01',
                title: 'Fahrenheit 401',
            }
            const id: number = 1;

            const book: BookModel = await controller.updateBook(id, updateBookData);

            expect(book).toEqual(singleBook);
            expect(prisma.book.update).toHaveBeenCalledWith({
                where: { id: id },
                data: {
                    // no description - should have been sanitized as it's undefined
                    year: new Date(updateBookData.year),
                    title: updateBookData.title
                }
            })
        })
    })

    describe('deleteBook', () => {
        it('Deletes a book', async () => {
            const id: number = 1;
            const book: BookModel = await controller.deleteBook(id);

            expect(book).toEqual(singleBook);
            expect(prisma.book.delete).toHaveBeenCalledWith({
                where: {id: id}
            })
        })
    })
})
