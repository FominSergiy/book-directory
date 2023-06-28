import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { PrismaService } from 'src/modules/prisma/prisma.service';


@Module({
    controllers: [BookController],
    providers: [PrismaService],
    exports: []
})
export class BookModule {}