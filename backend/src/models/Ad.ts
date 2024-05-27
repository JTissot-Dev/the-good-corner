import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  BeforeInsert
} from 'typeorm';
import {
  Length,
  IsInt
} from 'class-validator';
import { Category } from './Category';
import { Tag } from './Tag';
import { ObjectType, Field, Float, ID } from 'type-graphql';


@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(_type => String)
  @Column({ length: 100})
  @Length(1, 100, {
    message: 'Title is required and max 100 characters'
  })
  title: string;

  @Field(_type => String)
  @Column({ length: 250})
  @Length(1, 100, {
    message: 'Description is required and max 250 characters'
  })
  description: string;

  @Field(_type => String)
  @Column({ length: 100})
  @Length(1, 100, {
    message: 'Owner is required and max 250 characters'
  })
  owner: string;

  @Field(_type => Float)
  @Column()
  @IsInt({
    message: 'Price is required and must be a number'
  })
  price: number;

  @Field(_type => String)
  @Column({ length: 100})
  @Length(1, 100, {
    message: 'Picture is required and max 100 characters'
  })
  picture: string;

  @Field(_type => String)
  @Column({ length: 50})
  @Length(1, 100, {
    message: 'Location is required and max 50 characters'
  })
  location: string;

  @Field(_type => String)
  @Column()
  createdAt: Date;

  @BeforeInsert()
  updateCreateDate() {
    this.createdAt = new Date();
  }

  @Field(_type => Category)
  @ManyToOne(_type => Category, category => category.ads, { 
    cascade: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Field(_type => [Tag], { nullable: true })
  @ManyToMany(_type => Tag, (tag) => tag.ads, { 
    cascade: true,
    eager: true
  })
  tags?: Tag[];

}

