import "reflect-metadata";
import express from "express";
import { dataSource } from "./database/database";
import { Like } from "typeorm";
import { In } from "typeorm";
import { Ad } from "./models/Ad";
import { Category } from "./models/Category";
import { Tag } from "./models/Tag";


const app = express();


app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// *** Route ads
app.get("/ads", async (req, res) => {
  const categoryParam: string | undefined = req.query.category && 
    req.query.category.toString();

  const tagsParam: string[] = req.query.tags ? 
    req.query.tags.toString().split(",") : 
    [];

  console.log(tagsParam);

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
});


app.post("/ads", async (req, res) => {
  const postAd = req.body;

  const category: Category = await Category.findOne({
    where: {
      name: postAd.category,
    },
    relations: {
      ads: true,
    }
  });

  const tags: Tag[] = req.body.tags ? req.body.tags.map(async tag => {
    const tagFound = await Tag.findOneBy({ name: tag});
    if (tagFound) return tagFound;

    const newTag = new Tag();
    newTag.name = tag;
    await newTag.save();
    return newTag;
  }) : [];

  const ad = new Ad();
  ad.title = postAd.title;
  ad.description = postAd.description;
  ad.owner = postAd.owner;
  ad.price = postAd.price;
  ad.picture = postAd.picture;
  ad.location = postAd.location;
  ad.category = category;
  ad.tags = await Promise.all(tags);
  ad.save();

  res.status(201).send();
});

app.delete("/ads/:id", (req, res) => {
  const adId = parseInt(req.params.id);
  Ad.delete(adId);
  res.status(200).send();
});

app.put("/ads/:id", async (req, res) => {
  const adId = parseInt(req.params.id);
  const postAd = req.body;

  const category = await Category.findOne({
    where: {
      name: postAd.category,
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

  const ad = await Ad.findOneBy({id: adId});
  ad.title = postAd.title;
  ad.description = postAd.description;
  ad.owner = postAd.owner;
  ad.price = postAd.price;
  ad.picture = postAd.picture;
  ad.location = postAd.location;
  ad.createdAt = postAd.createdAt;
  ad.category = category;
  ad.tags = await Promise.all(tags);
  ad.save();

  res.status(200).send();
});

// *** Route categories
app.get("/categories", async (req, res) => {

  const name = req.query.name;

  if (name) {
    const categories = await Category.find({
      where: {
        name: Like(`%${name}%`),
      }
    });
    return res.status(200).send(categories);
  }

  const categories = await Category.find();
  res.status(200).send(categories);
});

// *** Route tags
app.get("/tags", async (req, res) => {

  const name = req.query.name;

  if (name) {
    const tags = await Tag.find({
      where: {
        name: Like(`%${name}%`),
      }
    });
    return res.status(200).send(tags);
  } 
  const tags = await Tag.find();
  res.status(200).send(tags);
  
});

app.delete("/tags/:id", (req, res) => {
  const tagId: number = parseInt(req.params.id);
  Tag.delete(tagId);
  res.status(200).send();
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Exemple app listening on port ${port}`)
});