import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as T from '@common/enum';
import { timestamp } from 'rxjs';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop()
  profile: string;

  @Prop({ require: true })
  role: T.UserRole;

  @Prop({ required: true })
  status!: T.UserStatusEnum;

  @Prop()
  sub_duration: number;

  @Prop({ type: timestamp })
  validDate: Date;

  @Prop({ type: timestamp })
  createdAt!: Date;

  @Prop({ type: timestamp })
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
