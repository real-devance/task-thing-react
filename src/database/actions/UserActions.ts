import DB from "../DB";
import { UserModel } from "../models/UserModel";

const UserActions = {
  // Add a user or update if exists
  add: async (title: string) => {
    const existingUser = await DB.USER.get("USER");
    if (existingUser) {
      // Update if user already exists
      await DB.USER.update("USER", { title });
    } else {
      // Add new user if not exists
      await DB.USER.add({ id: "USER", title } as UserModel);
    }
  },

  // Delete the specific user
  delete: async () => await DB.USER.delete("USER"),

  // Update user data
  update: async (data: Partial<UserModel>) => await DB.USER.update("USER", data),

  // Get the user data
  get: async () => await DB.USER.get("USER"),

  // Clear all user data
  clear: async () => await DB.USER.clear(),
};

export default UserActions;
