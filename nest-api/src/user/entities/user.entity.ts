import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Factory } from 'nestjs-seeder';

@Schema({ timestamps: true })
export class User {
  @Factory(
    (faker) =>
      `${faker.person.firstName().toLowerCase()}.${faker.person.lastName().toLowerCase()}@${faker.company
        .buzzAdjective()
        .toLowerCase()}.com`,
  )
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Factory((_faker, ctx) => ctx.password)
  @Prop({
    select: false,
    required: false,
  })
  password: string;

  @Factory(null)
  @Prop()
  accessHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
