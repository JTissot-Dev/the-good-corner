import "reflect-metadata";
import express from "express";
import { dataSource } from "./database/database";
import adWs from "./controllers/adWs";
import categoryWs from "./controllers/categoryWs";
import tagWs from "./controllers/tagWs";

const app = express();

app.use(express.json());

// bind modules router
app.use("/", adWs);
app.use("/", categoryWs);
app.use("/", tagWs);

const port = 3000;

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Exemple app listening on port ${port}`)
});