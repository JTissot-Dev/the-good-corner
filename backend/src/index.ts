import "reflect-metadata";
import express from "express";
import { dataSource } from "./database/database";
import { Ad } from "./models/Ad";


const app = express();


app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

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


app.post("/ads", (req, res) => {
  const postAd = req.body;

  const ad = new Ad();
  ad.title = postAd.title;
  ad.description = postAd.description;
  ad.owner = postAd.owner;
  ad.price = postAd.price;
  ad.picture = postAd.picture;
  ad.location = postAd.location;
  ad.createdAt = postAd.createdAt;
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
  const ad = await Ad.findOneBy({id: adId});
  ad.title = postAd.title;
  ad.description = postAd.description;
  ad.owner = postAd.owner;
  ad.price = postAd.price;
  ad.picture = postAd.picture;
  ad.location = postAd.location;
  ad.createdAt = postAd.createdAt;
  ad.save();

  res.status(200).send();
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Exemple app listening on port ${port}`)
});