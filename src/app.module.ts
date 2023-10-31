import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { LoggerMiddleware } from 'middleware/logger.middleware';
import { BookController } from './book/book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from 'util/TimeoutInterceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config/config.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    BookModule,
    CategoryModule,
    UserModule,
    CommentModule,
  ],
  controllers: [CategoryController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes({ path: 'book*/', method: RequestMethod.ALL });
      .forRoutes(BookController);
  }
}
