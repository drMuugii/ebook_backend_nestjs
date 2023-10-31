import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ANATOMY = 'Anatomy',
  PHYSIOLOGY = 'Physiology',
  SURGERY = 'Surgery',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop({
    required: [true, 'Номын нэрийг оруулна уу'],
    trim: true,
    maxlength: [150, 'Номын нэр 150 тэмдэгтээс хэтрэхгүй  байх ёстой'],
  })
  title: string;

  @Prop({
    required: [true, 'Номны тухай мэдээлэл оруулна уу'],
    maxlength: [5000, 'Номын тухай мэдээлэл дээд тал нь 5000 тэмдэгт'],
  })
  description: string;

  @Prop({ required: [true, 'Зохиогчын нэрийг оруулна уу'] })
  author: string;

  @Prop()
  price: Number;

  @Prop()
  rating: Number;

  @Prop({ required: true })
  category: Category;

  @Prop({})
  picture: String;
}

export const BookSchema = SchemaFactory.createForClass(Book);
