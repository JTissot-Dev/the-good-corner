import express from 'express';
import { Like } from "typeorm";
import { Category } from '../models/Category';


const categoryWs = express.Router();

categoryWs.get("/categories", async (req, res) => {

  const name = req.query.name;

  if (name) {
    const categories: Category[] = await Category.find({
      where: {
        name: Like(`%${name}%`),
      }
    });
    return res.status(200).send(categories);
  }

  const categories: Category[] = await Category.find();
  res.status(200).send(categories);
});

export default categoryWs;