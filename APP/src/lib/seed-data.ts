/**
 * Sample church content used for the initial frontend render.
 * The same content is mirrored into the Prisma seed script
 * (prisma/seed.ts) so the database stays in sync.
 */

export type SampleDevotional = {
  id: string;
  date: string;
  title: string;
  scripture: string;
  body: string;
  confession: string;
  prayer: string;
  author: string;
  durationMin: number;
};

export type SampleSermon = {
  id: string;
  title: string;
  category: string;
  series: string;
  description: string;
  duration: number;
  speaker: string;
  scripture: string;
  serviceDate: string;
};

export type SampleEvent = {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  description: string;
  location: string;
  category: string;
};

export type SampleBranch = {
  id: string;
  city: string;
  name: string;
  address: string;
  serviceTimes: string;
  phone?: string;
  isMain?: boolean;
};

export const SAMPLE_DEVOTIONALS: SampleDevotional[] = [
  {
    id: "dev-standing-firm",
    date: "2026-09-07",
    title: "Standing Firm in the Promise",
    scripture: "Hebrews 10:23",
    author: "Pastor David K. Mensah",
    durationMin: 7,
    body: "Life often tests our resolve and pushes us to question whether God's promises will manifest in our reality. In the midst of contradicting circumstances, the natural instinct is to surrender or to alter our confession. However, the scripture reminds us that our faith is anchored not on shifting human conditions, but on the unchangeable fidelity of God.\n\nTo hold fast means to grip with unyielding tenacity. When fear whispers uncertainty into your heart, you must choose to voice what God has declared over your health, your home, and your vocation. God's faithfulness is not subject to economic cycles or cultural instability.\n\nToday, refuse to be moved by what you see. Let your confession remain steadfast: He who promised is faithful. What He began, He will complete.",
    confession:
      "I declare that I hold fast to God's promise without wavering. He who called me is faithful, and He will complete the good work He began in me. In Jesus' name, Amen.",
    prayer:
      "Heavenly Father, anchor my heart in Your unfailing truth. Whenever doubts arise, empower me with holy boldness to speak life, hope, and victory over every circumstance. Amen.",
  },
  {
    id: "dev-light-burden",
    date: "2026-09-06",
    title: "The Yoke That Sets You Free",
    scripture: "Matthew 11:29-30",
    author: "Pastor David K. Mensah",
    durationMin: 6,
    body: "A yoke is an instrument of work, but the yoke of Christ is unlike any other — it is fashioned for rest. When we submit to His lordship, we exchange the crushing weight of self-effort for the measured, grace-shaped burden of walking with Him.\n\nMany believers are exhausted because they carry burdens they were never meant to bear alone. The invitation of Christ is not to a life without labour, but to a life of partnered labour — where His strength shoulders the load and His wisdom directs the path.",
    confession:
      "I take the yoke of Christ upon me and learn from Him. His burden is light and His rest is mine. I am no longer driven by striving, but led by grace.",
    prayer:
      "Lord Jesus, I exchange my heaviness for Your rest. Teach me to walk in step with You, that my labour may be fruitful and my soul at peace. Amen.",
  },
  {
    id: "dev-kingdom-vision",
    date: "2026-09-05",
    title: "Eyes That See the Unseen",
    scripture: "2 Kings 6:17",
    author: "Pastor David K. Mensah",
    durationMin: 8,
    body: "Elisha's servant saw only the enemy army and despaired. But Elisha, having eyes trained on the unseen, saw the mountain full of horses and chariots of fire. Vision is not about denying reality; it is about perceiving the greater reality that surrounds the visible one.\n\nThe kingdom of God operates in dimensions the natural eye cannot access. To live with kingdom vision is to be so acquainted with the Father that His perspective becomes your default. Ask Him to open your eyes today.",
    confession:
      "My eyes are opened to see the provision, protection, and purpose of God surrounding me. I am never without help, for the Lord's host encamps around me.",
    prayer:
      "Father, open my eyes that I may see Your faithfulness. Lift me above the report of my senses to the truth of Your kingdom. Amen.",
  },
];

export const SAMPLE_SERMONS: SampleSermon[] = [
  {
    id: "ser-power-of-grace",
    title: "The Power of Grace",
    category: "Sunday Message",
    series: "Greater Works",
    description:
      "A practical teaching on how God's grace sustains us through every challenge and empowers us to live above condemnation.",
    duration: 32,
    speaker: "Pastor David K. Mensah",
    scripture: "Ephesians 2:8-10",
    serviceDate: "2026-09-01",
  },
  {
    id: "ser-kingdom-vision",
    title: "Living With Kingdom Vision",
    category: "Impact Series",
    series: "Vision Sunday",
    description:
      "Discover how a kingdom mindset transforms our decisions, relationships, and purpose for the year ahead.",
    duration: 41,
    speaker: "Pastor David K. Mensah",
    scripture: "Matthew 6:33",
    serviceDate: "2026-08-25",
  },
  {
    id: "ser-breaking-barriers",
    title: "Breaking Spiritual Barriers",
    category: "Prayer & Revival",
    series: "Breakthrough",
    description:
      "Learn how to walk in authority, prevailing prayer, and divine breakthrough in every season of life.",
    duration: 28,
    speaker: "Pastor Grace Adeyemi",
    scripture: "Mark 11:23",
    serviceDate: "2026-08-18",
  },
  {
    id: "ser-anchor-hope",
    title: "An Anchor for the Soul",
    category: "Sunday Message",
    series: "Steadfast",
    description:
      "Hope that does not disappoint — how the finished work of Christ secures us through life's storms.",
    duration: 36,
    speaker: "Pastor David K. Mensah",
    scripture: "Hebrews 6:19",
    serviceDate: "2026-08-11",
  },
  {
    id: "ser-worship-warfare",
    title: "When Worship Becomes Warfare",
    category: "Praise & Worship",
    series: "Breakthrough",
    description:
      "Praise is a weapon. Explore how worship dismantles strongholds and shifts the atmosphere over your life.",
    duration: 30,
    speaker: "Min. Samuel Boateng",
    scripture: "2 Chronicles 20:22",
    serviceDate: "2026-08-04",
  },
  {
    id: "ser-led-by-spirit",
    title: "Led by the Spirit",
    category: "Impact Series",
    series: "Greater Works",
    description:
      "Being led by the Spirit into purpose, calling, and a deeper consecration. Practical keys to daily guidance.",
    duration: 38,
    speaker: "Pastor Grace Adeyemi",
    scripture: "Romans 8:14",
    serviceDate: "2026-07-28",
  },
];

export const SAMPLE_EVENTS: SampleEvent[] = [
  {
    id: "evt-greater-works",
    title: "Greater Works Conference",
    date: "2026-09-20",
    endDate: "2026-09-22",
    description:
      "Three days of powerful teaching, worship, and prayer for spiritual growth and marketplace influence.",
    location: "KKPC Phoenix Main Campus",
    category: "Conference",
  },
  {
    id: "evt-women-of-purpose",
    title: "Women of Purpose Summit",
    date: "2026-10-04",
    description:
      "An uplifting gathering focused on faith, destiny, and transformation for women across Arizona.",
    location: "KKPC Mesa Campus",
    category: "Summit",
  },
  {
    id: "evt-youth-revival",
    title: "Youth Revival Night",
    date: "2026-11-15",
    description:
      "A vibrant youth gathering designed to ignite passion, purpose, and holiness for the next generation.",
    location: "KKPC Tempe Campus",
    category: "Revival",
  },
  {
    id: "evt-prayer-mountain",
    title: "Prayer Mountain Retreat",
    date: "2026-12-06",
    endDate: "2026-12-07",
    description:
      "An overnight retreat of corporate and personal prayer in the high desert north of Phoenix.",
    location: "Sunrise Mountain Retreat, Peoria",
    category: "Prayer",
  },
];

export const SAMPLE_BRANCHES: SampleBranch[] = [
  {
    id: "br-phoenix",
    city: "Phoenix",
    name: "KKPC Phoenix Main",
    address: "1440 E Northern Ave, Phoenix, AZ 85020",
    serviceTimes: "Sunday • 8:00 AM / 10:30 AM",
    phone: "(602) 555-0144",
    isMain: true,
  },
  {
    id: "br-mesa",
    city: "Mesa",
    name: "KKPC Mesa",
    address: "2100 S Power Rd, Mesa, AZ 85209",
    serviceTimes: "Sunday • 9:00 AM / 11:00 AM",
    phone: "(480) 555-0188",
  },
  {
    id: "br-tempe",
    city: "Tempe",
    name: "KKPC Tempe",
    address: "815 E University Dr, Tempe, AZ 85281",
    serviceTimes: "Sunday • 10:00 AM",
    phone: "(480) 555-0192",
  },
  {
    id: "br-tucson",
    city: "Tucson",
    name: "KKPC Tucson",
    address: "3275 N Swan Rd, Tucson, AZ 85712",
    serviceTimes: "Sunday • 9:30 AM",
    phone: "(520) 555-0173",
  },
  {
    id: "br-glendale",
    city: "Glendale",
    name: "KKPC Glendale",
    address: "7550 W Bethany Home Rd, Glendale, AZ 85303",
    serviceTimes: "Sunday • 8:30 AM / 10:30 AM",
    phone: "(623) 555-0166",
  },
  {
    id: "br-flagstaff",
    city: "Flagstaff",
    name: "KKPC Flagstaff",
    address: "1900 N Fort Valley Rd, Flagstaff, AZ 86001",
    serviceTimes: "Sunday • 10:00 AM",
    phone: "(928) 555-0150",
  },
];

/** Map event ISO date to a short label like "SEP 20" */
export function shortDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return "";
  const mon = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${mon} ${d.getDate()}`;
}

/** Pretty date range for events */
export function prettyDate(iso: string, endIso?: string): string {
  const fmt = (s: string) =>
    new Date(s + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  return endIso ? `${fmt(iso)} – ${fmt(endIso)}` : fmt(iso);
}
