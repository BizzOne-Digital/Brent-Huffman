import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  service?: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    message: { type: String, required: true },
    service: { type: String, default: "" },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
