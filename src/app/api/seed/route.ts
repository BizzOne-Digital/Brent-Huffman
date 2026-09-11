import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import SiteSettings from "@/models/SiteSettings";
import PageContent from "@/models/PageContent";
import Service from "@/models/Service";
import GalleryCategory from "@/models/GalleryCategory";
import Testimonial from "@/models/Testimonial";
import FAQ from "@/models/FAQ";
import {
  defaultPages,
  defaultServices,
  defaultTestimonials,
  defaultFAQs,
  defaultGalleryCategories,
} from "@/lib/seed-data";

export const runtime = "nodejs";

export async function POST() {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@huffmanheating.net";
    const adminPassword = process.env.ADMIN_PASSWORD || "HuffmanAdmin2026!";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashed = await bcrypt.hash(adminPassword, 12);
      await User.create({ email: adminEmail, password: hashed, name: "Admin" });
    }

    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({});
    } else {
      await SiteSettings.updateMany(
        { email: { $regex: /^brentu(ff|f)man@huffmanheating\.net$/i } },
        { $set: { email: "brenthuffman@huffmanheating.net" } }
      );
      await SiteSettings.updateMany(
        {
          address: {
            $in: [
              "Conover, North Carolina",
              "Conover, NC",
              "Newton, North Carolina",
              "Newton, NC",
            ],
          },
        },
        { $set: { address: "Claremont, North Carolina" } }
      );
      await PageContent.updateOne(
        { slug: "about" },
        { $pull: { sections: { key: "helpful-videos" } } }
      );
      await FAQ.deleteMany({ question: "Do you provide emergency service?" });
      await SiteSettings.updateMany({}, { $addToSet: { serviceAreas: "Claremont, NC" } });
      await SiteSettings.updateMany(
        { "socialLinks.googleReview": { $exists: false } },
        { $set: { "socialLinks.googleReview": "https://g.page/r/Cf1yypINidZQEBM/review" } }
      );
      await SiteSettings.updateMany(
        {
          "socialLinks.facebook": {
            $in: [
              "https://www.facebook.com/share/1LDwdhx9tv/",
              "https://www.facebook.com/profile.php?id=100063787920305",
            ],
          },
        },
        { $set: { "socialLinks.facebook": "https://www.facebook.com/share/1C3vvLwWrV/" } }
      );
    }

    for (const page of defaultPages) {
      await PageContent.findOneAndUpdate(
        { slug: page.slug },
        { $setOnInsert: page },
        { upsert: true, new: true }
      );
    }

    for (const service of defaultServices) {
      await Service.findOneAndUpdate(
        { slug: service.slug },
        { $set: { ...service, isActive: true } },
        { upsert: true, new: true }
      );
    }

    const activeSlugs = defaultServices.map((s) => s.slug);
    await Service.updateMany(
      { slug: { $nin: activeSlugs } },
      { $set: { isActive: false } }
    );

    for (const cat of defaultGalleryCategories) {
      await GalleryCategory.findOneAndUpdate(
        { slug: cat.slug },
        {
          $set: {
            name: cat.name,
            description: cat.description,
            images: cat.images,
            order: cat.order,
          },
        },
        { upsert: true, new: true }
      );
    }

    // Remove old empty placeholder categories from initial seed
    await GalleryCategory.deleteMany({
      slug: { $in: ["installations", "ductwork", "equipment"] },
    });

    for (const t of defaultTestimonials) {
      await Testimonial.findOneAndUpdate(
        { name: t.name, text: t.text },
        { $setOnInsert: { ...t, isActive: true } },
        { upsert: true, new: true }
      );
    }

    for (const faq of defaultFAQs) {
      await FAQ.findOneAndUpdate(
        { question: faq.question },
        { $set: { answer: faq.answer, order: faq.order, isActive: true } },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      adminEmail,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
