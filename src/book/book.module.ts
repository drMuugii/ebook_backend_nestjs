import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookSchema } from './schemas/book.schema';
import { BookController } from './book.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
