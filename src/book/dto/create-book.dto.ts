import { Category } from '../schemas/book.schema';

export class CreateBookDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly price: number;
  readonly rating: number;
  readonly category: Category;
  readonly picture: string;
}
