import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IntroSplash from "@/components/layout/IntroSplash";

export const dynamic = "force-dynamic";

async function getSettings() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne().lean();
    if (!settings) settings = await SiteSettings.create({});
    const normalized = JSON.parse(JSON.stringify(settings));
    if (normalized?.email) {
      normalized.email = normalized.email.trim().toLowerCase();
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
