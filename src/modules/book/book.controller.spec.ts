import { BookController } from "./book.controller";
import { PrismaService } from "../prisma/prisma.service";
import { book as BookModel } from "@prisma/client";
import { author as AuthorModel } from "@prisma/client";
import { Test, TestingModule } from '@nestjs/testing';

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
    firstName: 'Chuck',
    lastName: 'Cheezy',
    middleName: null,
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
})
