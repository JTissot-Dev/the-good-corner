import express from 'express';
import { Like } from "typeorm";
import { Category } from '../models/Category';
import CategoriesName from '../types/CategoriesName';


const categoryWs = express.Router();

categoryWs.get("/categories", async (req, res) => {

  try {

    const name: CategoriesName | undefined = req.query.name as CategoriesName;

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

  } catch(error) {

      console.log(error);
      res.status(500).send();
      
  }
  

});

export default categoryWs;