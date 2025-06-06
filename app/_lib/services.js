import User from "../_models/userModel";
import Vault from "../_models/vaultModel";
import connectMongoDB from "./mongoDB";

export async function getUser(email) {
  try {
    await connectMongoDB();
    const user = await User.findOne({ email: email });
    return user ? user : null;
  } catch (err) {
    console.error("Error getting user:", err);
    throw new Error("Error getting user");
  }
}

export async function createUser(data) {
  try {
    await connectMongoDB();
    const newUser = await User.create(data);
    return {
      statusText: "success",
      message: "User created successfully",
      data: newUser,
    };
  } catch (err) {
    console.error("Error creating user:", err);
    return {
      statusText: "error",
      message: "Error creating user",
      error: err.message,
    };
  }
}

export async function createVault(data) {
  try {
    await connectMongoDB();
    const newVault = await Vault.create(data);
    return {
      statusText: "success",
      message: "Vault created successfully",
      data: newVault,
    };
  } catch (err) {
    console.error("Error creating Vault:", err);
    return {
      statusText: "error",
      message: "Error creating Vault",
      error: err.message,
    };
  }
}
