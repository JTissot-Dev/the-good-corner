import { DataSource } from "typeorm";
import { Ad } from "../models/Ad";
import { Category } from "../models/Category";
import { Tag } from "../models/Tag";
import { CreateFirstMigration1709302934154 } from "./migrations/1709302934154-CreateFirstMigration";


export const dataSource = new DataSource({
  type: "sqlite",
  database: "good_corner_migrate.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: false,
  migrations: [
    CreateFirstMigration1709302934154
  ],
});

