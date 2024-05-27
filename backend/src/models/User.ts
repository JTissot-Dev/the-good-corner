import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';


@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(_type => String)
  @Column({ unique: true })
  email: string;

  @Field(_type => String)
  @Column()
  hashedPassword: string;

}
