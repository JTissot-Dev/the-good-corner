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


@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  @Length(1, 100, {
    message: 'Title is required and max 100 characters'
  })
  title: string;

  @Column({ length: 250})
  @Length(1, 100, {
    message: 'Description is required and max 250 characters'
  })
  description: string;

  @Column({ length: 100})
  @Length(1, 100, {
    message: 'Owner is required and max 250 characters'
  })
  owner: string;

  @Column()
  @IsInt({
    message: 'Price is required and must be a number'
  })
  price: number;

  @Column({ length: 100})
  @Length(1, 100, {
    message: 'Picture is required and max 100 characters'
  })
  picture: string;

  @Column({ length: 50})
  @Length(1, 100, {
    message: 'Location is required and max 50 characters'
  })
  location: string;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  updateCreateDate() {
    this.createdAt = new Date();
  }

  @ManyToOne(() => Category, category => category.ads, { 
    cascade: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads, { 
    cascade: true,
    eager: true
  })
  tags: Tag[];

}

