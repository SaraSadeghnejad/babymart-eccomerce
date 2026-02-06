import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "deliveryMan"],
      default: "user",
    },
    addresses: [
      {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        isDefualt: {
          type: Boolean,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
 }
userSchema.pre("save", async function (next) {
  if (!this.isModified(password)) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.pre("save", async function (next) {
  if (this.isModified("addresses")) {
    const defaultAddress = this.addresses.find((addr) => addr.isDefualt);
    if (defaultAddress) {
      this.addresses.forEach((addr) => {
        if (addr !== defaultAddress) addr.isDefualt = false;
      });
    }
  }
  next();
});
const User = mongoose.model("User", userSchema);
export default User;
