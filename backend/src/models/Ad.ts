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
import { Category } from './Category';
import { Tag } from './Tag';


@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  title: string;

  @Column({ length: 250})
  description: string;

  @Column({ length: 100})
  owner: string;

  @Column()
  price: number;

  @Column({ length: 100})
  picture: string;

  @Column({ length: 50})
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

