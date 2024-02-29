import "reflect-metadata";
import express from "express";
import { dataSource } from "./database/database";
import { Ad } from "./models/Ad";


const app = express();


app.use(express.json());

const port = 3000;
const adRepository = dataSource.getRepository(Ad);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/ads", async (req, res) => {
  
  const ads = await adRepository.find();
  res.send(ads);
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
  adRepository.save(ad);
  res.status(201).send();
});

app.delete("/ads/:id", (req, res) => {
  const adId = parseInt(req.params.id);
  adRepository.delete(adId);
  res.status(200).send();
});

app.put("/ads/:id", async (req, res) => {
  const adId = parseInt(req.params.id);
  const postAd = req.body;
  const ad = await adRepository.findOneBy({id: adId});
  ad.title = postAd.title;
  ad.description = postAd.description;
  ad.owner = postAd.owner;
  ad.price = postAd.price;
  ad.picture = postAd.picture;
  ad.location = postAd.location;
  ad.createdAt = postAd.createdAt;
  adRepository.save(ad);
  res.status(200).send();
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Exemple app listening on port ${port}`)
});