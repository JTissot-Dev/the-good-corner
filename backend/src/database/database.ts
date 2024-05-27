import { DataSource } from "typeorm";
import { Ad } from "../models/Ad";
import { Category } from "../models/Category";
import { Tag } from "../models/Tag";
import { User } from "../models/User";
import { CreateFirstMigration1709302934154 } from "./migrations/1709302934154-CreateFirstMigration";
import { AddUserEntity1716827409694 } from "./migrations/1716827409694-addUserEntity";


export const dataSource = new DataSource({
  type: "postgres",
  host: "tgcdb",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Ad, Category, Tag, User],
  synchronize: false,
  migrations: [
    CreateFirstMigration1709302934154,
    AddUserEntity1716827409694
  ],
});

