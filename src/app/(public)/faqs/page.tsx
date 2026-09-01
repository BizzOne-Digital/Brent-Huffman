import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import FAQ from "@/models/FAQ";
import FAQsClient from "./FAQsClient";
import { defaultFAQs } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

function mergeFaqs(
  dbFaqs: { _id: string; question: string; answer: string; order?: number }[]
) {
  const defaultsByQuestion = new Map(defaultFAQs.map((faq) => [faq.question, faq]));

  if (dbFaqs.length === 0) {
    return defaultFAQs.map((faq, i) => ({
      _id: `default-${i}`,
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
    }));
  }

  const merged = dbFaqs.map((faq) => {
    const def = defaultsByQuestion.get(faq.question);
    return def ? { ...faq, answer: def.answer, order: def.order } : faq;
  });

  const existingQuestions = new Set(merged.map((faq) => faq.question));
  for (const def of defaultFAQs) {
    if (!existingQuestions.has(def.question)) {
      merged.push({
        _id: `default-${def.order}`,
        question: def.question,
        answer: def.answer,
        order: def.order,
      });
    }
  }

  return merged.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

async function getFAQsData() {
  try {
    await connectDB();
    const [page, faqs] = await Promise.all([
      PageContent.findOne({ slug: "faqs" }).lean(),
      FAQ.find({ isActive: true }).sort({ order: 1 }).lean(),
    ]);
    const parsedFaqs = faqs ? JSON.parse(JSON.stringify(faqs)) : [];
    return {
      page: page ? JSON.parse(JSON.stringify(page)) : null,
      faqs: mergeFaqs(parsedFaqs),
    };
  } catch {
    return {
      page: null,
      faqs: mergeFaqs([]),
    };
  }
}

export default async function FAQsPage() {
  const data = await getFAQsData();
  return <FAQsClient {...data} />;
}
