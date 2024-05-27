import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { Category } from "../models/Category";

@Resolver()
class CategoryResolver {

  @Query(returns => [Category])
  async categories(): Promise<Category[]> {
    const categories = await Category.find({
      relations: {
        ads: true,
      }
    }); 
    return categories;
  }

  @Mutation(returns => Category)
  async addCategory(@Arg("name") name: string): Promise<Category> {
    const category: Category = new Category();
    category.name = name;
    await category.save();
    return category;
  }
};

export default CategoryResolver;