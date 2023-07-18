import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { BookModule } from './modules/book/book.module';
import { LoggerMiddleware } from './logger.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    PrismaModule,
    BookModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: [process.cwd(), 'src/schema.gql'].join('')
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
