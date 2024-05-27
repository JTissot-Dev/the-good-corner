import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Ad } from "../models/Ad";
import { Category } from "../models/Category";
import { Tag } from "../models/Tag";
import AdInput from "./types/AdInput";
import { validate } from "class-validator";

@Resolver()
class AdResolver {
  @Query(returns => [Ad])
  async ads(): Promise<Ad[]> {
    const ads = await Ad.find({
      relations: {
        tags: true,
        category: true,
      }
    }); 
    return ads;
  }

  @Query(returns => Ad)
  async ad(@Arg("id") id: number): Promise<Ad> {
    const ad = await Ad.findOne({
      relations: {
        tags: true,
        category: true,
      },
      where: {
        id: id,
      }
    });
    return ad;
  }

  @Mutation(returns => Ad)
  async addAd(@Arg("data") data: AdInput): Promise<Ad> {
    const category: Category = await Category.findOne({
      where: {
        name: data.categoryName,
      }
    });
  
    const tags: Promise<Tag>[] = data.tagsName ? data.tagsName.map(async (tag: string) => {
      const tagFound = await Tag.findOneBy({ name: tag});
      if (tagFound) return tagFound;
  
      const newTag = new Tag();
      newTag.name = tag;
      await newTag.save();
      return newTag;
    }) : [];
  
    const ad: Ad = new Ad();
    ad.title = data.title;
    ad.description = data.description;
    ad.owner = data.owner;
    ad.price = Number(data.price);
    ad.picture = data.picture;
    ad.location = data.location;
    ad.category = category;
    ad.tags = await Promise.all(tags);
    await ad.save();
    return ad;
  }

  @Mutation(returns => Ad)
  async upAd(@Arg("id") id: number, @Arg("data") data: AdInput): Promise<Ad> {
    const adId: number = Number(id);

    const category: Category = await Category.findOne({
      where: {
        name: data.categoryName,
      },
      relations: {
        ads: true,
      }
    });
  
    const tags: Promise<Tag>[] = data.tagsName ? data.tagsName.map(async tag => {
      const tagFound = await Tag.findOneBy({ name: tag });
      if (tagFound) return;
  
      const newTag = new Tag();
      newTag.name = tag;
      await newTag.save();
      return newTag;
    }) : [];
  
    const ad: Ad = await Ad.findOneBy({id: adId});
    ad.title = data.title;
    ad.description = data.description;
    ad.owner = data.owner;
    ad.price = Number(data.price);
    ad.picture = data.picture;
    ad.location = data.location;
    ad.category = category;
    ad.tags = await Promise.all(tags);
    await ad.save();
    return ad;
  }

  @Mutation(returns => Ad)
  async delAd(@Arg("id") id: number): Promise<Ad> {
    const adId: number = Number(id);
    const ad = await Ad.findOneBy({id: id});

    const tagsToRemoveId: number[] = ad.tags.map(tag => tag.id);
    const updatedTags: Tag[] = ad.tags.filter(tag => !tagsToRemoveId.includes(tag.id));
  
    ad.tags = updatedTags;
    await ad.save();
    await Ad.delete(adId);
    return ad;
    
  }
};

export default AdResolver;