import { PrismaClient } from "@prisma/client";
import { book as BookModel } from "@prisma/client";
import { author as AuthorModel } from "@prisma/client";

const prisma = new PrismaClient();

interface author {
    firstName: string;
    middleName?: string;
    lastName: string;
}

const createNewBook = async (
    title: string,
    year: Date,
    author: author,
    description: string
): Promise<BookModel> => {
    // async is shit :()
    // authors will not be unique - TODO - fix async problems
    const authorExist = await prisma.author.findFirst({
        where: {
            firstName: author.firstName,
            middleName: author?.middleName,
            lastName: author.lastName
        }
    })
    console.log(`author exist? :${authorExist}`);

    if ( authorExist ) {
        console.log('no new author is created here')
        return await prisma.book.create({
            data: {
                title: title,
                author: {
                    connect: {
                        id: authorExist.id
                    }
                },
                year: year,
                description: description,
            }
        })
    }
    console.log('why, Carl, why?')

    return await prisma.book.create({
        data: {
            title: title,
            author: {
                create: {
                    firstName: author.firstName,
                    middleName: author?.middleName,
                    lastName: author.lastName
                }
            },
            year: year,
            description: description,
        }
    })
}

const authors: author[] = [
    {
        'firstName': 'Marry',
        'lastName': 'Boe'
    },
    {
        'firstName': 'Dairy',
        'lastName': 'Queen',
    },
    {
        'firstName': 'Alan',
        'middleName': 'Sick',
        'lastName': 'Turing',
    }
];

const bookTitles: string[] = [
    'Mistfits of Neverlands',
    'Corporate Slaves Under Ciege',
    'Finance Bros Are Mummies',
    'Uber Revolution: Toronto Strikes Back'
]

// double nesting, but wo cares?
const main = async (): Promise<BookModel[]> => {

    const createdBooks: BookModel[] = []
    authors.forEach(
        async (author) => {
            bookTitles.forEach(
                async (bookTitle) => {
                    const book: BookModel = await createNewBook(
                        bookTitle,
                        new Date(2023,1 + authors.indexOf(author),0),
                        author,
                        'fancy description for any book!'
                    )
                    console.log('Created new book!')
                    createdBooks.push(book)
                }
            )
        }
    )

    return createdBooks;
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
