import mongoose, { Schema, Document, Model } from "mongoose";
import { PageSection } from "@/lib/types";

export interface IPageContent extends Document {
  slug: string;
  title: string;
  sections: PageSection[];
  updatedAt: Date;
}

const PageSectionSchema = new Schema(
  {
    key: { type: String, required: true },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
    extra: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: false }
);

const PageContentSchema = new Schema<IPageContent>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    sections: { type: [PageSectionSchema], default: [] },
  },
  { timestamps: true }
);

const PageContent: Model<IPageContent> =
  mongoose.models.PageContent ||
  mongoose.model<IPageContent>("PageContent", PageContentSchema);

export default PageContent;
