import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';


@Entity()
export class Ad  {
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
}

