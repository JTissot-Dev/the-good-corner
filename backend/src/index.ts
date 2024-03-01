import "reflect-metadata";
import express from "express";
import { dataSource } from "./database/database";
import { Like } from "typeorm";
import { Ad } from "./models/Ad";
import { Category } from "./models/Category";


const app = express();


app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// *** Route ads
app.get("/ads", async (req, res) => {
  const categoryParam = req.query.category.toString();
  if (categoryParam) {
    const ads = await Ad.find({
      relations: {
        category: true,
      },
      where: {
        category: {
          name: categoryParam,
        },
      },
    });
    res.status(200).send(ads);
    return;
  }
  const ads = await Ad.find();
  res.status(200).send(ads);
});


app.post("/ads", async (req, res) => {
  const postAd = req.body;

  const category = await Category.findOne({
    where: {
      name: postAd.category,
    },
    relations: {
      ads: true,
    }
  });

  const ad = new Ad();
  ad.title = postAd.title;
  ad.description = postAd.description;
  ad.owner = postAd.owner;
  ad.price = postAd.price;
  ad.picture = postAd.picture;
  ad.location = postAd.location;
  ad.category = category;

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

  const ad = await Ad.findOneBy({id: adId});
  ad.title = postAd.title;
  ad.description = postAd.description;
  ad.owner = postAd.owner;
  ad.price = postAd.price;
  ad.picture = postAd.picture;
  ad.location = postAd.location;
  ad.createdAt = postAd.createdAt;
  ad.category = category;

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

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Exemple app listening on port ${port}`)
});