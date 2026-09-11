import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IntroSplash from "@/components/layout/IntroSplash";
import {
  resolvePublicBusinessAddress,
  resolvePublicContactEmail,
  shouldPersistBusinessAddressFix,
  shouldPersistEmailFix,
} from "@/lib/contact-email";

export const dynamic = "force-dynamic";

async function getSettings() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne().lean();
    if (!settings) settings = await SiteSettings.create({});

    const email = resolvePublicContactEmail(settings.email);
    const address = resolvePublicBusinessAddress(settings.address);
    const persist: Record<string, string> = {};
    if (shouldPersistEmailFix(settings.email)) persist.email = email;
    if (shouldPersistBusinessAddressFix(settings.address)) persist.address = address;
    if (Object.keys(persist).length > 0) {
      await SiteSettings.updateOne({ _id: settings._id }, { $set: persist });
    }

    const normalized = JSON.parse(JSON.stringify(settings));
    if (normalized) {
      normalized.email = email;
      normalized.address = address;
    }
    if (normalized?.serviceAreas && !normalized.serviceAreas.includes("Claremont, NC")) {
      normalized.serviceAreas = [...normalized.serviceAreas, "Claremont, NC"];
    }
    return normalized;
  } catch {
    return null;
  }
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <IntroSplash />
      <Header phone={settings?.phone} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
