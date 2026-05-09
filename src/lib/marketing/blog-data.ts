export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  category: string;
  readTime: number;
  featuredImage: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "top-5-home-repairs-before-rainy-season",
    title: "Top 5 Home Repairs to Handle Before Rainy Season in Nigeria",
    excerpt:
      "Heavy rains in Nigeria can expose weaknesses in your home. Here are five critical repairs to complete before the rainy season arrives.",
    content: `
      <p>Every year, as the rainy season approaches, homeowners across Nigeria face a familiar challenge — leaks, flooding, and structural damage that could have been prevented with simple maintenance. The key is to act early.</p>

      <h2>1. Check and Repair Your Roof</h2>
      <p>Your roof is your home's first line of defence against heavy rainfall. Inspect for cracked or missing tiles, rusted sheets, and gaps around penetrations like chimneys and vent stacks. In Lagos and other coastal areas, the combination of salt air and rain accelerates corrosion. Replace damaged sections immediately and consider applying a waterproof coating to metal roofs.</p>
      <p>A small leak left unattended can collapse ceiling boards, damage electrical wiring, and create a breeding ground for mold — problems that cost far more to fix than the original repair.</p>

      <h2>2. Clear All Gutters and Drainage Channels</h2>
      <p>Blocked gutters are one of the most common causes of rainwater damage. During the dry season, gutters accumulate leaves, debris, and even bird nests. Before the rains come, clean them thoroughly and check that downspouts direct water at least 2 metres away from your building's foundation.</p>
      <p>If your property is in areas like Victoria Island or Lekki in Lagos, where flooding is a recurring concern, consider installing gutter guards and ensuring your drainage system can handle heavy downpours.</p>

      <h2>3. Inspect and Repair Doors and Windows</h2>
      <p>Warping and swelling are common in wooden doors and window frames during humid conditions. Check that all doors and windows close properly and that seals around frames are intact. Replace worn weather stripping to prevent water from seeping through.</p>
      <p>For aluminium frames, inspect the caulking around edges — deterioration here is often invisible until leaks appear.</p>

      <h2>4. Examine Your Foundation and Exterior Walls</h2>
      <p>Hairline cracks in walls may seem cosmetic but can widen significantly under hydrostatic pressure from saturated soil. Walk the perimeter of your property and look for signs of foundation movement — uneven floors, sticking doors, or cracks that have grown since the last rainy season.</p>
      <p>Seal exterior cracks with an appropriate filler and apply a waterproof render to vulnerable walls. In Nigeria's humid climate, waterproofing paint is a worthwhile investment.</p>

      <h2>5. Test and Service Your Electrical Systems</h2>
      <p>Water and electricity are a dangerous combination. Ensure that all exterior electrical fittings are properly sealed and that your circuit breakers are functioning correctly. If your home is in a flood-prone area, consider elevating sockets and electrical panels above the expected flood level.</p>
      <p>A licensed electrician should inspect the entire system if you notice any flickering lights, frequent tripping, or burning smells — these are early warning signs that become far more dangerous during heavy rain.</p>

      <h2>Book Trusted Professionals on Proxxi</h2>
      <p>Finding reliable help for these repairs shouldn't add to your stress. On Proxxi, you can connect with verified electricians, plumbers, and handymen in your area, read real reviews, and book with confidence. No more chasing contacts or worrying about no-shows — Proxxi connects you with skilled professionals ready to help you prepare before the rains come.</p>
    `,
    author: {
      name: "Chidi Okonkwo",
      role: "Home Maintenance Expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chidi",
    },
    publishedAt: "2026-04-15",
    category: "Home Maintenance",
    readTime: 6,
    featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
    tags: ["home maintenance", "rainy season", "roof repair", "drainage", "Nigeria"],
    featured: true,
  },
  {
    slug: "how-to-choose-right-service-provider-lagos",
    title: "How to Choose the Right Service Provider in Lagos",
    excerpt:
      "With so many options, finding a trustworthy service provider in Lagos can feel overwhelming. Here's how Proxxi makes it easier.",
    content: `
      <p>Lagos is a city of over 20 million people, and finding a reliable electrician, plumber, or hair stylist often feels like a gamble. Recommendations from friends are great, but what if they haven't used a particular service recently? This is the problem Proxxi is solving.</p>

      <h2>Why Trust Matters in Home Services</h2>
      <p>In a city where unlicensed practitioners are common, the risk of poor workmanship — or worse, theft — is real. A botched hairdo for a special event, a plumber who creates more leaks than he fixes, an electrician who doesn't follow safety codes — the consequences range from inconvenient to dangerous.</p>

      <h2>What to Look For in a Service Provider</h2>
      <p><strong>1. Verification Status</strong> — On Proxxi, every provider undergoes identity and skill verification before joining the platform. Look for the verified badge on profiles.</p>
      <p><strong>2. Ratings and Reviews</strong> — Real customer feedback tells you what to expect. Pay attention to both the star rating and the content of recent reviews. A provider with 4.8 stars but complaints about punctuality may not be right for time-sensitive jobs.</p>
      <p><strong>3. Service Specialization</strong> — A barber who does excellent haircuts may not be the best choice for a complex beard design. Choose someone who specializes in the specific service you need.</p>
      <p><strong>4. Response Time</strong> — How quickly do they confirm bookings? Providers who are consistently unavailable or slow to respond may not be reliable.</p>
      <p><strong>5. Pricing Transparency</strong> — Look for providers who list their prices clearly. Unexpected costs after service completion are frustrating and avoidable.</p>

      <h2>How Proxxi Makes It Easy</h2>
      <p>Instead of scrolling through unverified classifieds or asking for WhatsApp contacts, Proxxi gives you a curated marketplace where every provider's credentials, reviews, and pricing are visible upfront. You can compare options side by side, book instantly, and pay securely through the app.</p>
      <p>For Lagosians in particular — where traffic makes it impractical to go to multiple barbershops until you find the right one — booking ahead transforms the experience.</p>

      <h2>When in Doubt, Ask</h2>
      <p>If you're unsure whether a provider is right for your needs, message them through the app before booking. Proxxi providers are responsive and happy to answer questions about their experience and availability.</p>
    `,
    author: {
      name: "Adaobi Nnamdi",
      role: "Content Lead, Proxxi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=adaobi",
    },
    publishedAt: "2026-04-08",
    category: "Tips & Guides",
    readTime: 5,
    featuredImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=450&fit=crop",
    tags: ["tips", "Lagos", "finding providers", "trust", "reviews"],
  },
  {
    slug: "rise-of-on-demand-home-services-nigeria",
    title: "The Rise of On-Demand Home Services in Nigeria",
    excerpt:
      "From booking a barber to scheduling a plumber, on-demand home services are reshaping how Nigerians manage their households.",
    content: `
      <p>Five years ago, if you needed a plumber in Lagos, your options were limited: ask a neighbour, call a number from a handwritten card stuck to a lamppost, or hope for the best. Today, a new model is emerging — and Nigeria's 200 million population is driving demand like never before.</p>

      <h2>Why Now?</h2>
      <p>Several factors are converging. Smartphone penetration in Nigeria crossed 80% in 2025, according to data from the Nigerian Communications Commission. More importantly, mobile internet access has become affordable — data bundles that once cost thousands now retail for a few hundred naira. This digital foundation makes on-demand apps viable in a way that wasn't possible five years ago.</p>
      <p>Beyond technology, changing lifestyles are fueling growth. Nigeria's growing middle class — concentrated in Lagos, Abuja, and Port Harcourt — values time differently. A working professional in Ikeja earning ₦500,000 a month is less likely to spend three hours chasing a plumber and more likely to book one through an app, even if it costs slightly more.</p>

      <h2>What's Driving Adoption</h2>
      <p><strong>Trust</strong> — The traditional informal market for home services has a trust problem. Consumers can't easily verify credentials, and bad experiences are common. Platforms like Proxxi solve this by verifying every provider — identity checks, skill assessment, and ongoing review monitoring.</p>
      <p><strong>Convenience</strong> — Real-time availability, instant booking, and transparent pricing remove the friction that used to make finding a service provider a day's project.</p>
      <p><strong>Safety</strong> — Paying through the platform protects both consumers and providers from the risks of cash transactions.</p>
      <p><strong>Quality</strong> — Review systems incentivize providers to maintain high standards, and consumers can choose based on demonstrated quality rather than blind luck.</p>

      <h2>The Road Ahead</h2>
      <p>The on-demand home services market in Nigeria is still early. But the trajectory is clear: just as fintech proved that Nigeria could leapfrog traditional banking with mobile money, home services platforms are proving the same for the service economy. The question isn't whether on-demand home services will become mainstream — it's how quickly.</p>
    `,
    author: {
      name: "Emeka Eze",
      role: "Market Analyst",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emeka",
    },
    publishedAt: "2026-03-28",
    category: "Industry",
    readTime: 5,
    featuredImage: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=450&fit=crop",
    tags: ["on-demand", "market", "Nigeria", "technology", "trends"],
  },
  {
    slug: "what-makes-great-barber-proxxi-providers",
    title: "What Makes a Great Barber? Tips from Top-Rated Proxxi Providers",
    excerpt:
      "We spoke with five of the highest-rated barbers on Proxxi to find out what separates a good haircut from a great one.",
    content: `
      <p>A great haircut isn't just about the cut — it's about the entire experience. We reached out to five barbers on Proxxi who consistently receive 5-star reviews to find out what drives their success.</p>

      <h2>Segun Adeyemi, Lagos Island — 4.9 Stars</h2>
      <p>"I always ask what the client is planning to do after the haircut. A person going to a job interview has different needs from someone going to a owambe. The details matter."</p>
      <p>Segun, who has been cutting hair for 12 years, emphasises the importance of the consultation. "The haircut starts before I pick up the clippers. If I don't understand what you want, I can't give it to you."</p>

      <h2>Chukwudi Okafor, Abuja — 4.8 Stars</h2>
      <p>"I invest in my tools. A good clipper that's been maintained properly cuts evenly. A dull or cheap clipper pulls hair, and no amount of skill can compensate for that."</p>
      <p>Chukwudi also stresses hygiene. "I use a fresh cape for every client. I disinfect my tools in front of them. These things seem small, but they build trust."</p>

      <h2>Tochukwu Nwosu, Port Harcourt — 4.9 Stars</h2>
      <p>"Consistency is everything. If I cut a client's hair one way today and a different way two weeks later, they'll feel like I don't know their head. I keep notes on every client's preferences."</p>
      <p>Tochukwu also credits his growth to the Proxxi platform. "Before Proxxi, I was relying on walk-ins and word of mouth. Now I get bookings from people I've never met, and they already trust me because of my reviews."</p>

      <h2>Adegoke Salami, Ibadan — 4.8 Stars</h2>
      <p>"I treat every client like they're my most important client. When you feel that — when someone is fully present with you and giving you their full attention — you leave feeling good, not just looking good."</p>

      <h2>Key Takeaways</h2>
      <p>Across all five conversations, themes emerged: <strong>consultation before cutting</strong>, <strong>quality tools</strong>, <strong>consistency</strong>, <strong>hygiene</strong>, and <strong>genuine attention</strong>. These aren't secrets — they're fundamentals that most barbers overlook. The providers who consistently exceed on these basics are the ones who build lasting careers on Proxxi.</p>
    `,
    author: {
      name: "Adaobi Nnamdi",
      role: "Content Lead, Proxxi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=adaobi",
    },
    publishedAt: "2026-03-18",
    category: "Provider Stories",
    readTime: 6,
    featuredImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=450&fit=crop",
    tags: ["barbers", "interview", "tips", "provider stories", "quality"],
  },
  {
    slug: "why-nigerians-moving-away-from-diy",
    title: "Why Nigerians Are Moving Away from DIY Home Repairs",
    excerpt:
      "Culture taught many of us to handle our own repairs. Here's why that's changing — and why it's a good thing.",
    content: `
      <p>There's a particular pride in Nigerian culture around self-sufficiency — fixing things yourself, making do, not spending money when you can figure it out. For generations, that approach was practical. Today, it's increasingly outdated.</p>

      <h2>The Cost of DIY Gone Wrong</h2>
      <p>Consider a common scenario: a leaking pipe. A homeowner buys a pipe repair kit from Alaba Market for ₦2,000, spends half a day attempting the fix, and the leak seems resolved. Three weeks later, the pipe bursts inside a wall, causing thousands of naira in water damage and requiring a professional to undo the amateur repair — plus fix the original problem properly.</p>
      <p>The total cost: significantly more than if they'd simply called a plumber from the start.</p>

      <h2>The Skills Gap</h2>
      <p>Home repair skills were more common a generation ago because more people worked in trades or had family members who did. Today, with urbanisation and the shift toward white-collar careers, fewer people have the practical knowledge that used to be passed down through families.</p>
      <p>A YouTube video can guide you through simple tasks, but electrical work, plumbing, and structural repairs require knowledge that goes far beyond watching a 10-minute tutorial. And the consequences of getting it wrong — fire, flooding, electrocution — can be fatal.</p>

      <h2>When to Call a Professional</h2>
      <p><strong>Always call a pro for:</strong> Anything involving electrical wiring, gas appliances, structural modifications, major plumbing, roofing, and painting above single-storey height.</p>
      <p><strong>DIY-worthy tasks:</strong> Painting interior walls, assembling furniture, changing light bulbs, basic cleaning tasks, replacing showerheads, and unclogging simple drain blockages with a plunger.</p>

      <h2>How Proxxi Helps</h2>
      <p>Finding a verified, affordable professional shouldn't require a network of contacts. Proxxi connects you with skilled providers in your area — electricians, plumbers, handymen, and more — all vetted and reviewed by real customers. Book instantly, pay securely, and know that the job is done right the first time.</p>
    `,
    author: {
      name: "Chidi Okonkwo",
      role: "Home Maintenance Expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chidi",
    },
    publishedAt: "2026-03-05",
    category: "Tips & Guides",
    readTime: 5,
    featuredImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=450&fit=crop",
    tags: ["DIY", "home repairs", "safety", "Nigerian culture", "tips"],
  },
  {
    slug: "how-proxxi-verified-providers-ensure-quality",
    title: "How Proxxi Verified Providers Ensure Quality Service",
    excerpt:
      "Every Proxxi provider goes through a verification process. Here's exactly what that means and why it matters.",
    content: `
      <p>When you book a service on Proxxi, you see a verified badge on every provider's profile. But what does that actually mean? We break down the verification process and how it protects you.</p>

      <h2>Step 1: Identity Verification</h2>
      <p>Every provider must submit a valid government-issued ID — National ID Card (NIN), International Passport, or Driver's Licence. Our team verifies the document's authenticity against issuing authority databases. This step ensures that every provider on the platform is who they claim to be.</p>

      <h2>Step 2: Skills Assessment</h2>
      <p>Beyond identity, we assess the provider's actual skills. This includes reviewing their portfolio of past work, checking for relevant experience in their declared service category, and in some cases, a practical skills demonstration. A self-described electrician who can't safely rewire a circuit won't pass our assessment.</p>

      <h2>Step 3: Background Check</h2>
      <p>We conduct background checks for any history of fraud, violent offences, or complaints on other platforms. Providers with serious red flags are rejected outright.</p>

      <h2>Step 4: Ongoing Monitoring</h2>
      <p>Verification isn't a one-time event. We monitor reviews, booking completion rates, and customer feedback continuously. Providers who consistently underperform receive warnings, suspension, or removal from the platform.</p>

      <h2>The Verified Badge</h2>
      <p>The green verified badge you see on Proxxi profiles represents all of this. It means the provider has been identity-checked, skills-assessed, and is actively monitored. It's your assurance that the person arriving at your door is qualified and trustworthy.</p>

      <h2>What You Can Do</h2>
      <p>Verification protects you, but your reviews protect other users. After every service, take a moment to leave an honest review. Your feedback helps other customers make informed choices and holds providers accountable for maintaining high standards.</p>
    `,
    author: {
      name: "Adaeze Obi",
      role: "Trust & Safety, Proxxi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=adaeze",
    },
    publishedAt: "2026-02-20",
    category: "Trust & Safety",
    readTime: 5,
    featuredImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop",
    tags: ["verification", "trust", "safety", "quality", "how it works"],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);

export const getFeaturedPost = (): BlogPost | undefined =>
  blogPosts.find((post) => post.featured);

export const getPostsByCategory = (category: string): BlogPost[] =>
  blogPosts.filter((post) => post.category === category);

export const getRelatedPosts = (
  slug: string,
  limit = 3
): BlogPost[] => {
  const post = getPostBySlug(slug);
  if (!post) return [];
  return blogPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === post.category ||
          p.tags.some((t) => post.tags.includes(t)))
    )
    .slice(0, limit);
};

export const blogCategories = [
  "All",
  "Home Maintenance",
  "Tips & Guides",
  "Industry",
  "Provider Stories",
  "Trust & Safety",
];

export const getAllPosts = (): BlogPost[] => blogPosts;

export const getAllCategories = (): string[] =>
  blogCategories.filter((cat) => cat !== "All");

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};