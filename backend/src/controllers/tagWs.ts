import express from 'express';
import { Like } from "typeorm";
import { Tag } from '../models/Tag';

const tagWs = express.Router();


tagWs.get("/tags", async (req, res) => {

  try {

    const name: string = req.query.name as string;

    if (name) {
      const tags: Tag[] = await Tag.find({
        where: {
          name: Like(`%${name}%`),
        }
      });
      return res.status(200).send(tags);
    } 
    const tags: Tag[] = await Tag.find();
    res.status(200).send(tags);

  } catch(error) {

      console.log(error);
      res.status(500).send();
      
  }

  
});

tagWs.delete("/tags/:id", (req, res) => {

  try {

    const tagId: number = parseInt(req.params.id);
    Tag.delete(tagId);
    res.status(200).send();

  } catch(error) {
      
      console.log(error);
      res.status(500).send();

  }

});

export default tagWs;