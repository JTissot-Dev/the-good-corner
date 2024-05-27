import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Ad } from './Ad';
import { Field, ObjectType } from 'type-graphql';


@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(_type => String)
  @Column({ length: 50 })
  name: string;

  @Field(_type => [Ad])
  @ManyToMany(_type => Ad, (ad) => ad.tags, { 
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinTable()
  ads: Ad[];
}
