import { InputType, Field, Float } from "type-graphql";
import { User } from "../../models/User";


@InputType()
class UserInput implements Partial<User> {
  @Field(_type => String)
  email: string;

  @Field(_type => String)
  password: string;
};

export default UserInput;