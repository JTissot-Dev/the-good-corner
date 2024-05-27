import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(_type => String)
  @Column({ length: 50 })
  name: string;

  @Field(_type => [Ad])
  @OneToMany(_type => Ad, (ad) => ad.category)
  ads: Ad[];

}