import mongoose, { Schema, Document, Model } from "mongoose";
import { SocialLinks, SpecialOffers } from "@/lib/types";

export interface ISiteSettings extends Document {
  businessName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  serviceAreas: string[];
  socialLinks: SocialLinks;
  specialOffers: SpecialOffers;
  footerText: string;
  hours: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: "Huffman Heating & Air Conditioning" },
    tagline: { type: String, default: "Quality Heating & Cooling Since 1962" },
    email: {
      type: String,
      default: "brentuffman@huffmanheating.net",
      set: (value: string) => (value ? value.trim().toLowerCase() : value),
    },
    phone: { type: String, default: "828-256-2675" },
    address: { type: String, default: "Newton, North Carolina" },
    serviceAreas: {
      type: [String],
      default: [
        "Catawba County",
        "Conover, NC",
        "Newton, NC",
        "Maiden, NC",
        "Taylorsville, NC",
        "Hickory, NC",
        "Claremont, NC",
      ],
    },
    socialLinks: {
      facebook: { type: String, default: "https://www.facebook.com/share/1C3vvLwWrV/" },
      facebookReel: { type: String, default: "https://www.facebook.com/reel/4538622503052429" },
      facebookPost: { type: String, default: "https://www.facebook.com/share/r/19VeRUK7BP/" },
      googleReview: {
        type: String,
        default: "https://g.page/r/Cf1yypINidZQEBM/review",
      },
    },
    specialOffers: {
      seniors: { type: String, default: "Discount available at time of service at our discretion" },
      lawEnforcement: { type: String, default: "Discount available at time of service at our discretion" },
      military: { type: String, default: "Discount available at time of service at our discretion" },
      firstResponders: { type: String, default: "Discount available at time of service at our discretion" },
    },
    footerText: {
      type: String,
      default: "Family owned and operated since 1962. Quality work at reasonable prices.",
    },
    hours: { type: String, default: "Mon-Fri: 8AM-5PM | Emergency Service Available" },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
