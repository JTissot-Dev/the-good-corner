import { DataSource } from "typeorm";
import { Ad } from "../models/Ad";
import { Category } from "../models/Category";
import { Tag } from "../models/Tag";


export const dataSource = new DataSource({
  type: "sqlite",
  database: "good_corner_orm.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
});

