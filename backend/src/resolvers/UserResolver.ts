import { Query, Resolver, Arg, Mutation } from "type-graphql";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { User } from "../models/User";
import UserInput from "./types/UserInput";

@Resolver()
class UserResolver {

  @Query(_returns => [User])
  async users(): Promise<User[]> {
    const users = await User.find(); 
    return users;
  };

  @Mutation(_returns => String)
  async login(@Arg("userData") userData: UserInput): Promise<String> {
    try {
      const user = await User.findOneByOrFail({ email: userData.email });
      if (!argon2.verify(user.hashedPassword, userData.password)) {
        throw new Error("Invalid password");
      }
      return jwt.sign(
        { email: user.email},
        process.env.SECRET_KEY
      );
    } catch (_error) {
      throw new Error("User not found");
    }
  }

  @Mutation(_returns => String)
  async signup(@Arg("userData") userData: UserInput): Promise<String> {
    const user = new User();
    user.email = userData.email;

    const hashedPassword = await argon2.hash(userData.password);
    user.hashedPassword = hashedPassword;
    await user.save();
    return  jwt.sign(
      { email: user.email}, 
      process.env.SECRET_KEY
    );
  }
};

export default UserResolver;
