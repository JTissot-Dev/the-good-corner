import { DataSource } from "typeorm";
import { Ad } from "../models/Ad";
import { Category } from "../models/Category";


export const dataSource = new DataSource({
  type: "sqlite",
  database: "good_corner_orm.sqlite",
  entities: [Ad, Category],
  synchronize: true,
});

