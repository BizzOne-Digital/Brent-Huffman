import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import TeamClient from "./TeamClient";

async function getTeamData() {
  try {
    await connectDB();
    const page = await PageContent.findOne({ slug: "team" }).lean();
    return { page: page ? JSON.parse(JSON.stringify(page)) : null };
  } catch {
    return { page: null };
  }
}

export default async function TeamPage() {
  const { page } = await getTeamData();
  return <TeamClient page={page} />;
}
