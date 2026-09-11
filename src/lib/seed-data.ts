import { PageSection, GalleryImage } from "./types";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getImageUrl(path: string) {
  if (!path) return "/images/placeholder.svg";
  if (path.startsWith("/api/uploads/") || path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/${path}`;
}

export const aboutExtraVideos = ["/videos/video-1.mp4"] as const;

export const helpfulInfoVideos = [
  "/videos/video-4.mp4",
  "/videos/video-3.mp4",
  "/videos/video-2.mp4",
] as const;

export const defaultPages: { slug: string; title: string; sections: PageSection[] }[] = [
  {
    slug: "home",
    title: "Home",
    sections: [
      {
        key: "hero",
        title: "Comfort Built on Family Values.",
        subtitle: "Family-Owned Since 1962",
        content:
          "Trusted heating and air conditioning service across Catawba County—quality work, honest pricing, and dependable comfort.",
        image: "/images/hero-bg.png",
        order: 0,
        extra: { ctaText: "Schedule Service", ctaLink: "/contact" },
      },
      {
        key: "intro",
        title: "Trusted HVAC Experts",
        subtitle: "Serving Our Community Since 1962",
        content:
          "From gas and oil furnaces to heat pumps and all-metal ductwork — we specialize in residential and light commercial heating and cooling solutions you can count on.",
        image: "",
        order: 1,
      },
      {
        key: "video",
        title: "See Us In Action",
        subtitle: "Professional HVAC Service",
        content: "",
        image: "",
        order: 2,
        extra: { videoUrl: "" },
      },
      {
        key: "offers",
        title: "Special Offers",
        subtitle: "Exclusive Discounts",
        content: "We offer discounts at our discretion at time of service for senior citizens, law enforcement, military personnel, and first responders.",
        image: "",
        order: 3,
      },
      {
        key: "cta",
        title: "Ready for Comfort?",
        subtitle: "Contact Us Today",
        content: "Free estimates on replacements and new installations. Repairs are quoted at time of service — contact us for personalized service.",
        image: "",
        order: 4,
        extra: { ctaText: "Contact Us", ctaLink: "/contact" },
      },
    ],
  },
  {
    slug: "about",
    title: "About Us",
    sections: [
      {
        key: "hero",
        title: "About Huffman Heating & Air",
        subtitle: "A Legacy of Quality Since 1962",
        content: "Three generations of dedication to comfort and craftsmanship.",
        image: "/images/logo.png",
        order: 0,
      },
      {
        key: "story",
        title: "Our Story",
        subtitle: "Founded by Fred D. Huffman",
        content: `Huffman Heating & Air Conditioning was founded in 1962 by Fred D. Huffman. Mr. Huffman started working at the age of 19 for his uncle Charles, owner of Morganton Sheet Metal. He worked for his uncle for 10 years and then made the decision to start his own company.

He started out small and the company started growing. At that time he was doing roofing, guttering, and heating & air conditioning. Later he decided to concentrate solely on Heating and Air Conditioning.

In 1980 his son joined him in the business at the age of 19. Brent and Fred Huffman have been serving the community ever since, always doing quality work. At the age of 62, Mr. Fred Huffman decided to semi-retire. Brent, his son, has been continuing the business providing quality work at reasonable prices just as his father did for over 40 years.

Mr. Huffman continued to work helping in the shop until his health declined. The business runs solely by Brent Huffman who continues to maintain his father's ethics and quality.`,
        image: "/images/about-family.png",
        order: 1,
      },
      {
        key: "video",
        title: "Huffman Heating & Air Conditioning",
        subtitle: "Family Owned Since 1962",
        content: "Watch our story — over 60 years of trusted heating and air conditioning service in Catawba County.",
        image: "",
        order: 2,
        extra: {
          videoUrl: "/videos/about-video.mp4",
          extraVideos: [...aboutExtraVideos],
        },
      },
      {
        key: "service-area",
        title: "Service Area",
        subtitle: "Proudly Serving",
        content:
          "Catawba County, Conover NC, Newton NC, Maiden NC, Taylorsville NC, Hickory NC, and Claremont NC.",
        image: "",
        order: 3,
      },
      {
        key: "values",
        title: "Our Values",
        subtitle: "What We Stand For",
        content:
          "Quality workmanship, honest pricing, and treating every customer like family — the same values Fred Huffman built this company on over 60 years ago.",
        image: "",
        order: 4,
      },
    ],
  },
  {
    slug: "services",
    title: "Services",
    sections: [
      {
        key: "hero",
        title: "Our Services",
        subtitle: "Complete Heating & Cooling Solutions",
        content:
          "Specialists in gas, oil & heat pumps with all metal duct work. Residential and light commercial sales, service, and installation.",
        image: "/images/logo.png",
        order: 0,
      },
    ],
  },
  {
    slug: "gallery",
    title: "Gallery",
    sections: [
      {
        key: "hero",
        title: "Our Work Gallery",
        subtitle: "See the Quality We Deliver",
        content: "Browse our completed projects and professional installations.",
        image: "/images/logo.png",
        order: 0,
      },
    ],
  },
  {
    slug: "testimonials",
    title: "Testimonials",
    sections: [
      {
        key: "hero",
        title: "What Our Customers Say",
        subtitle: "Trusted by the Community",
        content: "Read what our satisfied customers have to say about Huffman Heating & Air Conditioning.",
        image: "/images/logo.png",
        order: 0,
      },
    ],
  },
  {
    slug: "faqs",
    title: "FAQs",
    sections: [
      {
        key: "hero",
        title: "Frequently Asked Questions",
        subtitle: "Got Questions? We Have Answers",
        content: "Find answers to common questions about our HVAC services.",
        image: "/images/logo.png",
        order: 0,
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    sections: [
      {
        key: "hero",
        title: "Contact Us",
        subtitle: "Contact Us Today",
        content: "Free estimates on replacements and new installs. Reach out by email, phone, or text.",
        image: "/images/logo.png",
        order: 0,
      },
    ],
  },
  {
    slug: "team",
    title: "Our Team",
    sections: [
      {
        key: "hero",
        title: "Meet Our Team",
        subtitle: "The People Behind Your Comfort",
        content: "Dedicated professionals committed to keeping your home comfortable year-round.",
        image: "/images/team.jpg",
        order: 0,
      },
      {
        key: "team-photo",
        title: "Family Owned & Operated",
        subtitle: "Serving Since 1962",
        content:
          "Brent Huffman and the Huffman team bring decades of experience and a personal touch to every job. Free estimates on replacements and new installations.",
        image: "/images/team.jpg",
        order: 1,
      },
    ],
  },
];

export const defaultServices = [
  {
    slug: "heat-pumps",
    title: "Heat Pumps",
    shortDescription:
      "We install heat pumps — efficient systems that heat and cool your home from one unit.",
    mainImage: "/images/services/heat-pumps.png",
    icon: "",
    order: 0,
    features: ["Heat Pump Installation", "Energy Efficient", "Heating & Cooling", "Free Install Estimates"],
    detailSections: [
      {
        key: "overview",
        title: "Heat Pump Installation",
        content:
          "We install heat pumps for homeowners who want reliable comfort and better energy efficiency. A heat pump can handle both heating and cooling, making it a smart choice for year-round performance.\n\nContact Huffman Heating for a free estimate on heat pump installation.",
        image: "/images/services/heat-pumps.png",
        order: 0,
      },
    ],
  },
  {
    slug: "gas-furnaces",
    title: "Gas Furnaces",
    shortDescription: "We install gas furnaces for dependable, efficient home heating.",
    mainImage: "/images/services/gas-furnaces.png",
    icon: "",
    order: 1,
    features: ["Gas Furnace Installation", "Reliable Heat", "Quality Equipment", "Family Owned Since 1962"],
    detailSections: [
      {
        key: "overview",
        title: "Gas Furnace Installation",
        content:
          "When you need dependable heat, a properly installed gas furnace makes all the difference. We install gas furnaces with quality workmanship and honest pricing — the same values Huffman Heating has stood for since 1962.\n\nCall us today for a free estimate.",
        image: "/images/services/gas-furnaces.png",
        order: 0,
      },
    ],
  },
  {
    slug: "cooling",
    title: "Cooling",
    shortDescription:
      "Complete cooling solutions — from thermostats and controls to outdoor condenser units.",
    mainImage: "/images/services/cooling-condenser.png",
    icon: "",
    order: 2,
    features: ["AC Installation", "Thermostat Controls", "Outdoor Condensers", "System Service"],
    detailSections: [
      {
        key: "thermostat-cool",
        title: "Cooling Controls",
        content:
          "Your thermostat is the brain of your cooling system. We install and service systems so your home stays comfortable when it matters most — especially during hot North Carolina summers.",
        image: "/images/services/cooling-thermostat-cool.png",
        order: 0,
      },
      {
        key: "thermostat-system",
        title: "System Settings & Comfort",
        content:
          "Proper system and fan settings help your equipment run efficiently and keep your home comfortable. If your system isn't responding correctly, we can diagnose the issue and get you back on track.",
        image: "/images/services/cooling-thermostat-heat.png",
        order: 1,
      },
      {
        key: "condenser",
        title: "Outdoor Condenser Units",
        content:
          "We install and service outdoor condenser units for reliable cooling performance. Whether you need a new installation or help with an existing unit, Huffman Heating is here to help.",
        image: "/images/services/cooling-condenser.png",
        order: 2,
      },
    ],
  },
  {
    slug: "gas-packs",
    title: "All-in-One Gas Packs",
    shortDescription:
      "Packaged gas units — heating and cooling combined in one efficient outdoor system.",
    mainImage: "/images/services/gas-packs.png",
    icon: "",
    order: 3,
    features: ["Packaged Units", "Gas Heat", "All-in-One System", "Professional Installation"],
    detailSections: [
      {
        key: "overview",
        title: "All-in-One Gas Packs",
        content:
          "All-in-one gas packs combine heating and cooling in a single packaged unit — a great option when space is limited or a packaged system fits your home best.\n\nWe install quality equipment and stand behind our work. Contact us for a free estimate.",
        image: "/images/services/gas-packs.png",
        order: 0,
      },
    ],
  },
  {
    slug: "system-troubles",
    title: "Signs of System Trouble",
    shortDescription:
      "What to look for if you're having trouble with your system — symptoms of problems ahead.",
    mainImage: "/images/services/condenser-coil-clogged.png",
    icon: "",
    order: 4,
    features: ["Warning Signs", "Frozen Lines", "Coil Problems", "Outdoor Unit Care"],
    detailSections: [
      {
        key: "intro",
        title: "What to Look For",
        content:
          "If your heating or cooling system isn't working right, the problem isn't always obvious. Sometimes the issue starts outside — with a clogged coil, blocked airflow, frozen refrigerant lines, grass clippings, pet damage, or water running down onto your unit.\n\nHere are common warning signs and mistakes that can lead to major problems if left unchecked.",
        image: "",
        order: 0,
      },
      {
        key: "condenser-coil",
        title: "Clogged Outdoor Condenser Coil",
        content:
          "If your outside condenser coil is stopped up, this can cause major problems. Dirt, debris, and buildup restrict airflow and force your system to work harder — leading to higher bills, poor comfort, and possible equipment damage.\n\nRegular cleaning and maintenance can prevent costly breakdowns. If your coil looks like this, call Huffman Heating before the problem gets worse.",
        image: "/images/services/condenser-coil-clogged.png",
        order: 1,
      },
      {
        key: "gutters",
        title: "Stopped-Up Gutters & Water Damage",
        content:
          "If your gutters are stopped up, it can also cause major problems with water running down on your unit. Overflowing gutters can pour water directly onto your outdoor equipment, leading to freezing, corrosion, and serious operational issues.\n\nKeep gutters clear and make sure water drains away from your HVAC unit. If you're seeing problems, contact us for a professional inspection.",
        image: "/images/services/gutter-water-damage.png",
        order: 2,
      },
      {
        key: "frozen-lines-outdoor",
        title: "Frozen Refrigerant Lines (Outside)",
        content:
          "If you see your refrigerant lines are froze up like this, turn the system OFF and turn the fan to ON on the thermostat.\n\nWhen the service tech gets out there, if it's frozen like this there's nothing that can be done until it thaws completely. Do not keep running the system — it can cause serious damage.\n\nCall Huffman Heating and we'll get to you as soon as possible.",
        image: "/images/services/frozen-lines-outdoor.png",
        order: 3,
      },
      {
        key: "frozen-coil-indoor",
        title: "Frozen Indoor Coil",
        content:
          "If the outside is frozen like this, the indoor coil is probably frozen as well.\n\nWhen the system is frozen, there is nothing that can be done until it thaws out completely. Turn the system off, set the fan to ON at the thermostat, and allow time for the ice to melt before a technician can properly diagnose and repair the problem.\n\nContact Huffman Heating for professional service once the system has thawed.",
        image: "/images/services/frozen-coil-indoor.png",
        order: 4,
      },
      {
        key: "mowing-grass",
        title: "Do NOT Mow Grass Toward Your Condenser",
        content:
          "This is what you do NOT want to let happen to your AC. Blowing grass clippings directly into your outside condenser can cause major damage — it clogs the coil, restricts airflow, and can lead to costly repairs.\n\nAlways mow your grass away from your outside condenser. Keep the area around your unit clear of debris, leaves, and grass buildup.",
        image: "/images/services/mowing-grass-condenser.png",
        order: 5,
      },
      {
        key: "dog-urine",
        title: "Keep Pets Away From Your Outdoor Unit",
        content:
          "Dogs urinating on your outside AC unit can cause major damage over time. Urine causes a chemical reaction that corrodes and deteriorates the coil, eventually leading to refrigerant leaks and expensive repairs.\n\nProtect your investment — keep pets away from your outdoor condenser and rinse the area if accidents happen.",
        image: "/images/services/dog-urine-condenser.png",
        order: 6,
      },
    ],
  },
  {
    slug: "metal-ductwork",
    title: "All Metal Ductwork",
    shortDescription:
      "We install all-metal ductwork — custom fabricated for durability, airflow, and cleaner indoor air.",
    mainImage: "/images/services/metal-ductwork.png",
    icon: "",
    order: 5,
    features: ["All Metal Construction", "Custom Fabrication", "Professional Installation", "No Duct Board"],
    detailSections: [
      {
        key: "metal-ductwork",
        title: "All Metal Ductwork We Install",
        content:
          "This is the type of ductwork we install — all metal, custom fabricated and professionally installed. Metal ductwork is durable, easier to keep clean, and built to last.\n\nHuffman Heating specializes in all types of metal ductwork for residential and light commercial applications. Contact us for a free estimate.",
        image: "/images/services/metal-ductwork.png",
        order: 0,
      },
      {
        key: "ductboard-warning",
        title: "Duct Board We Do NOT Install",
        content:
          "This is duct board — a material we do not install. Duct board can trap mold, dirt, and debris inside your duct system. That is air your family breathes every day.\n\nAt Huffman Heating, we believe in quality materials that protect your home and your health. We install all-metal ductwork instead.",
        image: "/images/services/ductboard-mold-1.png",
        order: 1,
      },
      {
        key: "ductboard-mold-interior",
        title: "Mold & Debris Inside Duct Board",
        content:
          "Over time, duct board can become contaminated with mold, dirt, and debris throughout the inside of the duct system. These photos show what homeowners may be breathing without even knowing it.\n\nIf your home has duct board in poor condition, contact Huffman Heating to discuss metal ductwork options.",
        image: "/images/services/ductboard-mold-2.png",
        order: 2,
      },
      {
        key: "ductboard-mold-buildup",
        title: "Hidden Contamination in Duct Systems",
        content:
          "Duct board breaks down over time and holds moisture, dust, and biological growth inside the duct walls. You cannot see it from the outside — but it affects the air quality in your home.\n\nWe install all-metal ductwork to help avoid these problems from the start.",
        image: "/images/services/ductboard-mold-3.png",
        order: 3,
      },
      {
        key: "ductboard-air-quality",
        title: "Protect Your Indoor Air Quality",
        content:
          "Your duct system moves air through every room in your home. When duct board is contaminated like this, that air passes through mold and debris before it reaches your family.\n\nHuffman Heating has been installing quality metal ductwork since 1962. Call us for a free estimate on a system built the right way.",
        image: "/images/services/ductboard-mold-4.png",
        order: 4,
      },
    ],
  },
];

export const defaultTestimonials = [
  {
    name: "Robert M.",
    location: "Conover, NC",
    text: "Brent and his team did an outstanding job replacing our old furnace. Professional, on time, and fair pricing. Highly recommend Huffman Heating!",
    rating: 5,
    order: 0,
  },
  {
    name: "Susan T.",
    location: "Newton, NC",
    text: "We've used Huffman for over 20 years. They always do quality work and stand behind it. True family business you can trust.",
    rating: 5,
    order: 1,
  },
  {
    name: "James W.",
    location: "Hickory, NC",
    text: "Fast response when our AC went out in July. Brent came out same day and had us cool again. Great service at a reasonable price.",
    rating: 5,
    order: 2,
  },
  {
    name: "Patricia L.",
    location: "Maiden, NC",
    text: "The ductwork they installed is top quality. You can tell they take pride in their work. Will definitely call them again.",
    rating: 5,
    order: 3,
  },
];

const GALLERY_VIDEO_FILES = [
  "AQN4jCcjNie3zowsT8ZtlHBRdqChi8O2tr0Q2F0CFeyb4ja_HzfvY5wgYtLdlZLvnlaYXF1QjMW7vuO4xD2oBGRybsr3autrQFka9TcqTw.mp4",
  "AQNDe-xwbq_qo2ocAyaQktU6Jh2od0d3Gu4inBS4HqSpHz29WKqRO3Qf-GMNzJy_yJ6ue4kPWKM5umlR1sMJOQWP_XOZHhOD1MEN9eaKBQ.mp4",
  "AQNeDcuRrNxk2T4_zRFaQglW0Yl4Ove0iWpk4Kj9eKJtM4lIYGGVBiDIkBTM9_eBa4nS0GUqStRjg14Cj4dyZXhUZzqtwXBzysGh7dT7Lw.mp4",
] as const;

export const defaultGalleryCategories: {
  name: string;
  slug: string;
  description: string;
  order: number;
  images: GalleryImage[];
}[] = [
  {
    name: "Completed Installs",
    slug: "completed-installs",
    description: "Professional HVAC installations completed by Huffman Heating",
    order: 0,
    images: [
      {
        url: "/images/gallery/install-crawlspace-furnace.png",
        caption: "Gas furnace installation — crawlspace",
        order: 0,
      },
      {
        url: "/images/gallery/install-outdoor-unit.png",
        caption: "Outdoor condenser installation",
        order: 1,
      },
      {
        url: "/images/gallery/install-goodman-condenser.jpg",
        caption: "Goodman condenser — new residential install",
        order: 2,
      },
      {
        url: "/images/gallery/install-gas-pack.png",
        caption: "All-in-one gas pack installation",
        order: 3,
      },
      {
        url: "/images/gallery/install-goodman-condenser-stone.jpg",
        caption: "Goodman condenser — stone veneer home",
        order: 4,
      },
      {
        url: "/images/gallery/install-indoor-furnace-ductwork.jpg",
        caption: "Indoor furnace and ductwork installation",
        order: 5,
      },
      {
        url: "/images/gallery/install-r32-condenser.jpg",
        caption: "R-32 condenser install — happy customer",
        order: 6,
      },
    ],
  },
  {
    name: "Photos",
    slug: "photos",
    description: "Our HVAC installation and service work",
    order: 1,
    images: Array.from({ length: 17 }, (_, i) => ({
      url: `/gallery/pic${i + 1}.jpg`,
      caption: "",
      order: i,
    })),
  },
  {
    name: "Videos",
    slug: "videos",
    description: "See Huffman Heating in action",
    order: 2,
    images: GALLERY_VIDEO_FILES.map((file, i) => ({
      url: `/gallery/${file}`,
      caption: `Work video ${i + 1}`,
      order: i,
    })),
  },
];

export const defaultFAQs = [
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes — we offer free estimates on replacements and new installations. We do not offer free estimates on repairs; repair pricing is provided at the time of service. Contact us by phone, email, or text to schedule.",
    order: 0,
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Catawba County including Conover, Newton, Maiden, Taylorsville, Hickory, and Claremont, North Carolina.",
    order: 1,
  },
  {
    question: "What types of heating systems do you install?",
    answer:
      "We specialize in gas furnaces, oil furnaces, heat pumps, and all types of metal ductwork for residential properties.",
    order: 2,
  },
  {
    question: "Do you offer discounts?",
    answer: "Yes, we offer discounts at our discretion at time of service for senior citizens, law enforcement, military personnel, and first responders.",
    order: 3,
  },
  {
    question: "How long has Huffman Heating been in business?",
    answer: "Huffman Heating & Air Conditioning was founded in 1962 by Fred D. Huffman. Brent Huffman has continued the family tradition for over 40 years.",
    order: 4,
  },
  {
    question: "Do you offer emergency services?",
    answer:
      "Yes — we offer emergency services for our customers. If you need urgent heating or cooling help, call us at 828-256-2675.",
    order: 5,
  },
];
