import { InputType, Field, Float, ID } from "type-graphql";
import { Ad } from "../../models/Ad";


@InputType()
class AdInput implements Partial<Ad> {
  @Field(_type => String)
  title: string;

  @Field(_type => String)
  description: string;

  @Field(_type => String)
  owner: string;

  @Field(_type => Float)
  price: number;

  @Field(_type => String)
  picture: string;

  @Field(_type => String)
  location: string;

  @Field(_type => String)
  categoryName: string;

  @Field(_type => [String], { nullable: true })
  tagsName?: string[];
};

export default AdInput;