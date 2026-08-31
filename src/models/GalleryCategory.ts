import mongoose, { Schema, Document, Model } from "mongoose";
import { GalleryImage } from "@/lib/types";

export interface IGalleryCategory extends Document {
  name: string;
  slug: string;
  description: string;
  images: GalleryImage[];
  order: number;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const GalleryCategorySchema = new Schema<IGalleryCategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    images: { type: [GalleryImageSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const GalleryCategory: Model<IGalleryCategory> =
  mongoose.models.GalleryCategory ||
  mongoose.model<IGalleryCategory>("GalleryCategory", GalleryCategorySchema);

export default GalleryCategory;
