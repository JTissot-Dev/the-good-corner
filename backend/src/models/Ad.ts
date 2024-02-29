import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './Category';


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

  @ManyToOne(() => Category, category => category.ads)
  @JoinColumn({ name: 'category_id' })
  category: Category;

}

