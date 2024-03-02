import express from 'express';
import { In } from 'typeorm';
import { validate } from 'class-validator';
import AdData from '../types/AdData';
import { Ad } from '../models/Ad';
import { Category } from '../models/Category';
import { Tag } from '../models/Tag';


const adWs = express.Router();

adWs.get("/ads", async (req, res) => {

  try {

    const categoryParam: string | undefined = req.query.category && 
    req.query.category.toString();

    const tagsParam: string[] = req.query.tags ? 
      req.query.tags.toString().split(",") : 
      [];

    if (categoryParam && tagsParam.length === 0) {
      const ads: Ad[] = await Ad.find({
        relations: {
          category: true,
        },
        where: {
          category: {
            name: categoryParam,
          },
        },
      });
      return res.status(200).send(ads);

    } else if (!categoryParam && tagsParam.length > 0) {
      
      const ads: Ad[] = await Ad.find({
        relations: {
          tags: true,
        },
        where: {
          tags: {
            name: In(tagsParam)
          },
        },
      });
      return res.status(200).send(ads);
      
    } else if (categoryParam && tagsParam.length > 0) {
      
      const ads: Ad[] = await Ad.find({
        relations: {
          tags: true,
          category: true,
        },
        where: {
          tags: {
            name: In(tagsParam)
          },
          category: {
            name: categoryParam
          },
        },
      });
      return res.status(200).send(ads);

    }
    const ads = await Ad.find();
    res.status(200).send(ads);

  } catch (error) {

      console.log(error);
      res.status(500).send();

  }
  
});

adWs.post("/ads", async (req, res) => {

  try {

    const postAd: AdData = req.body;
    const category: Category = await Category.findOne({
      where: {
        name: postAd.category,
      }
    });
  
    const tags: Tag[] = req.body.tags ? req.body.tags.map(async (tag: string) => {
      const tagFound = await Tag.findOneBy({ name: tag});
      if (tagFound) return tagFound;
  
      const newTag = new Tag();
      newTag.name = tag;
      await newTag.save();
      return newTag;
    }) : [];
  
    const ad: Ad = new Ad();
    ad.title = postAd.title;
    ad.description = postAd.description;
    ad.owner = postAd.owner;
    ad.price = postAd.price;
    ad.picture = postAd.picture;
    ad.location = postAd.location;
    ad.category = category;
    ad.tags = await Promise.all(tags);
  
    const errors = await validate(ad);
    if (errors.length > 0) {
      return res.status(422).send(errors);
    }
  
    ad.save();
    res.status(201).send();

  } catch (error) {

      console.log(error);
      res.status(500).send();

  }
  
});

adWs.put("/ads/:id", async (req, res) => {

  try {

    const adId: number = parseInt(req.params.id);
    const putAd: AdData = req.body;
  
    const category: Category = await Category.findOne({
      where: {
        name: putAd.category,
      },
      relations: {
        ads: true,
      }
    });
  
    const tags: Tag[] = req.body.tags.map(async tag => {
      const tagFound = await Tag.findOneBy({ name: tag});
      if (tagFound) return;
  
      const newTag = new Tag();
      newTag.name = tag;
      await newTag.save();
      return newTag;
    });
  
    const ad: Ad = await Ad.findOneBy({id: adId});
    ad.title = putAd.title;
    ad.description = putAd.description;
    ad.owner = putAd.owner;
    ad.price = putAd.price;
    ad.picture = putAd.picture;
    ad.location = putAd.location;
    ad.category = category;
    ad.tags = await Promise.all(tags);

    const errors = await validate(ad);

    if (errors.length > 0) {
      return res.status(422).send(errors);
    }
    
    ad.save();
  
    res.status(200).send();

  } catch(error) {
      
      console.log(error);
      res.status(500).send();
      
  }

});

adWs.delete("/ads/:id", async (req, res) => {
  
  try {

    const adId: number = parseInt(req.params.id);
    const ad: Ad = await Ad.findOneBy({id: adId});
  
    const tagsToRemoveId: number[] = ad.tags.map(tag => tag.id);
    const updatedTags: Tag[] = ad.tags.filter(tag => !tagsToRemoveId.includes(tag.id));
  
    ad.tags = updatedTags;
    await ad.save();
    Ad.delete(adId);
    res.status(200).send();

  } catch(errors) {

      console.log(errors);
      res.status(500).send(); 

  }
});



export default adWs;