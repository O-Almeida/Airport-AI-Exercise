import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>({
  type: {
    type: String,
    required: [true, "A type is necessary."],
    lowercase: true,
  },
  brand: {
    type: String,
    required: [true, "A brand is necessary."],
    lowercase: true,
  },
  model: {
    type: String,
    required: false,
    lowercase: true,
  },
  location: {
    type: String,
    lowercase: true,
  },
  lostAt: {
    type: Date,
    required: [true, "A lost date is required."],
    lowercase: true,
  },
});

productSchema.index(
  {
    type: "text",
    brand: "text",
    model: "text",
    location: "text",
  },
  { default_language: "english" }
);

export default model<IProduct>("Product", productSchema);
