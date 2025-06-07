import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    userName: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
    },
    photo: {
      type: String,
      default: "default-user.jpg",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "guide", "admin"],
    },
    heir: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    occupation: {
      type: String,
      maxlength: 60,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 300,
      trim: true,
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      trim: true,
    },
    socialLinks: [
      {
        type: String,
        platform: String,
        link: String,
      },
    ],
    vaults: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vault",
      },
    ],
    messagesAfterDeath: [
      {
        content: String,
        recipient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        deliverAfter: Date,
      },
    ],
    familyTree: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tree",
    },
    heir: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    memorialEnabled: {
      type: Boolean,
      default: false,
    },
    legacyStory: {
      type: String,
      maxlength: 5000,
    },
    language: {
      type: String,
      default: "en",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", function (next) {
  if (!this.userName && this.email) {
    const generated = this.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "_");
    this.userName = generated.slice(0, 30);
    if (this.userName.length < 3) {
      this.userName = this.userName.padEnd(3, "_");
    }
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
