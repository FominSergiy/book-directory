import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { BookResolver } from './book.resolver';
import { BookController } from './book.controller';


@Module({
    controllers: [BookController],
    providers: [PrismaService, BookResolver],
    exports: []
})
export class BookModule {}