import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "users", // This ensures it uses your existing 'users' collection
  }
);

// We check if the model is already defined to prevent errors during hot reloads
const User = models.User || model("User", UserSchema);
export default User;
