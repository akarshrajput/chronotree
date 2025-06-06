import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./userModel";

const vaultSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    photos: {
      type: [
        {
          title: { type: String, required: true, trim: true },
          photoLink: { type: String },
        },
      ],
      validate: [(arr) => arr.length <= 10, "Max 10 photos allowed"],
    },

    // 🔊 Audios - max 5
    audios: {
      type: [
        {
          title: { type: String, required: true, trim: true },
          audioLink: { type: String },
        },
      ],
      validate: [(arr) => arr.length <= 5, "Max 5 audios allowed"],
    },

    // 🎬 Videos - max 1
    videos: {
      type: [
        {
          title: { type: String, required: true, trim: true },
          videoLink: { type: String },
        },
      ],
      validate: [(arr) => arr.length <= 1, "Only 1 video allowed"],
    },

    // 📝 Notes - max 100
    notes: {
      type: [
        {
          title: { type: String, required: true, trim: true },
          content: { type: String, required: true },
        },
      ],
      validate: [(arr) => arr.length <= 100, "Max 100 notes allowed"],
    },

    // 🔐 Security
    password: {
      type: String,
      required: true,
      select: false,
    },
    isLocked: {
      type: Boolean,
      default: true,
    },
    failedAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },

    // 📁 Organization
    theme: {
      type: String,
      enum: ["yellow", "red", "blue", "green", "orange"],
      default: "green",
    },
    vaultType: {
      type: String,
      enum: ["personal", "shared", "archive"],
      default: "personal",
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    coverPhoto: {
      type: String,
    },

    // 👤 Ownership
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔄 Maintenance
    lastAccessedAt: {
      type: Date,
    },
    accessCount: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Virtuals for content counts
vaultSchema.virtual("numberOfPhotos").get(function () {
  return this.photos?.length || 0;
});
vaultSchema.virtual("numberOfAudios").get(function () {
  return this.audios?.length || 0;
});
vaultSchema.virtual("numberOfVideos").get(function () {
  return this.videos?.length || 0;
});
vaultSchema.virtual("numberOfNotes").get(function () {
  return this.notes?.length || 0;
});

// ✅ Auto populate author
vaultSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name email photo verified userName",
  });
  next();
});

// ✅ Hash password before saving
vaultSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Instance method to check password
vaultSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Static method to get vault if password matches
vaultSchema.statics.getVaultIfPasswordMatches = async function (
  vaultId,
  enteredPassword
) {
  const vault = await this.findById(vaultId).select("+password");
  if (!vault) throw new Error("Vault not found");

  const isMatch = await vault.checkPassword(enteredPassword);
  if (!isMatch) throw new Error("Incorrect password");

  return vault;
};

const Vault = mongoose.models.Vault || mongoose.model("Vault", vaultSchema);
export default Vault;
