import express from 'express';
import { Like } from "typeorm";
import { Tag } from '../models/Tag';

const tagWs = express.Router();


tagWs.get("/tags", async (req, res) => {

  const name = req.query.name;

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
  
});

tagWs.delete("/tags/:id", (req, res) => {
  const tagId: number = parseInt(req.params.id);
  Tag.delete(tagId);
  res.status(200).send();
});

export default tagWs;