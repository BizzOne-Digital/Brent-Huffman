import mongoose, { Schema, Document, Model } from "mongoose";
import { ServiceDetailSection } from "@/lib/types";

export interface IService extends Document {
  slug: string;
  title: string;
  shortDescription: string;
  mainImage: string;
  icon: string;
  order: number;
  isActive: boolean;
  features: string[];
  detailSections: ServiceDetailSection[];
  updatedAt: Date;
}

const DetailSectionSchema = new Schema(
  {
    key: { type: String, required: true },
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const ServiceSchema = new Schema<IService>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    mainImage: { type: String, default: "" },
    icon: { type: String, default: "🔧" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    features: { type: [String], default: [] },
    detailSections: { type: [DetailSectionSchema], default: [] },
  },
  { timestamps: true }
);

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
