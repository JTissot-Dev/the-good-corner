import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { Tag } from "../models/Tag";

@Resolver()
class TagResolver {

  @Query(returns => [Tag])
  async tags(): Promise<Tag[]> {
    const tags = await Tag.find({
      relations: {
        ads: true,
      }
    }); 
    return tags;
  }


  @Mutation(returns => Boolean)
  async delTag(@Arg("id") id: number): Promise<boolean> {
    const tagId: number = Number(id);
    Tag.delete(tagId);
    return true;
  }
};

export default TagResolver;
