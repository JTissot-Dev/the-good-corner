import { DataSource } from "typeorm";
import { Ad } from "../models/Ad";


export const dataSource = new DataSource({
  type: "sqlite",
  database: "good_corner_orm.sqlite",
  entities: [Ad],
  synchronize: true,
});

