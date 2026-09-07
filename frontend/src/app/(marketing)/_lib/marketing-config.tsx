export interface MarketingProduct {
  slug: string;
  name: string;
  accent: string;
  tint: string;
  dark: string;
  icon: React.ReactNode;
  visual: React.ReactNode;
  description: string;
  gallery?: React.ReactNode[];
  capabilities?: Array<{ icon: React.ReactNode; title: string; body: string }>;
}

export const PRODUCTS: MarketingProduct[] = [
  {
    slug: 'pod',
    name: 'AI Pod',
    accent: '#4262FF',
    tint: '#E8EAFF',
    dark: '#1a2e99',
    description: 'A task management and reporting system that keeps every team\'s work in one place and turns progress into clear, automatic reports.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
    visual: (
      <svg viewBox="0 0 200 140" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="20" y="20" width="60" height="45" rx="6" />
        <rect x="90" y="20" width="90" height="20" rx="4" />
        <rect x="90" y="48" width="70" height="17" rx="4" />
        <rect x="20" y="75" width="160" height="45" rx="6" />
        <line x1="40" y1="95" x2="120" y2="95" />
        <line x1="40" y1="105" x2="90" y2="105" />
        <circle cx="150" cy="100" r="12" />
        <path d="M146 100l3 3 5-6" />
      </svg>
    ),
  },
  {
    slug: 'recruiter',
    name: 'AI Recruiter',
    accent: '#10B981',
    tint: '#D1FAE5',
    dark: '#065F46',
    description: 'An AI recruiting and HR platform that screens candidates, ranks them against the role, and helps schedule interviews automatically.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
      </svg>
    ),
    visual: (
      <svg viewBox="0 0 200 140" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="70" cy="50" r="22" />
        <path d="M34 120c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
        <rect x="110" y="30" width="70" height="16" rx="4" />
        <rect x="110" y="54" width="50" height="12" rx="4" />
        <rect x="110" y="74" width="60" height="12" rx="4" />
        <rect x="40" y="100" width="120" height="28" rx="6" />
        <line x1="55" y1="114" x2="100" y2="114" />
      </svg>
    ),
  },
  {
    slug: 'dojo',
    name: 'AI Dojo',
    accent: '#FFD02F',
    tint: '#FEF3C7',
    dark: '#92400E',
    description: 'A virtual training experience with personal avatars, letting teams meet, learn, and rehearse real scenarios together in a shared virtual space.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    visual: (
      <svg viewBox="0 0 200 140" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="30" y="20" width="140" height="100" rx="10" />
        <circle cx="80" cy="60" r="16" />
        <path d="M64 90c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
        <circle cx="140" cy="60" r="16" />
        <path d="M124 90c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
        <rect x="70" y="100" width="60" height="10" rx="3" />
      </svg>
    ),
    gallery: [
      <svg key="g1" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="10" width="100" height="100" rx="12" />
        <circle cx="45" cy="50" r="14" />
        <path d="M31 85c1.2-3 4-5 7.5-5s6.3 2 7.5 5" />
        <circle cx="85" cy="50" r="14" />
        <path d="M71 85c1.2-3 4-5 7.5-5s6.3 2 7.5 5" />
      </svg>,
      <svg key="g2" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="25" width="100" height="85" rx="10" />
        <circle cx="40" cy="55" r="12" />
        <path d="M28 85c1-2.5 3.5-4 6.5-4s5.5 1.5 6.5 4" />
        <rect x="65" y="40" width="35" height="8" rx="2" />
        <rect x="65" y="56" width="25" height="6" rx="2" />
        <rect x="65" y="70" width="30" height="6" rx="2" />
      </svg>,
      <svg key="g3" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="60" cy="60" r="40" />
        <path d="M40 60l15 15 25-30" />
      </svg>,
      <svg key="g4" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="20" y="20" width="80" height="80" rx="12" />
        <path d="M45 60h30M60 45v30" />
      </svg>,
    ],
  },
  {
    slug: 'world',
    name: 'AI World',
    accent: '#8B5CF6',
    tint: '#EDE9FE',
    dark: '#5B21B6',
    description: 'An immersive virtual experience that lets people explore Japan — its cities, culture and language — from anywhere.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10A15 15 0 0112 2z" />
      </svg>
    ),
    visual: (
      <svg viewBox="0 0 200 140" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="80" cy="70" r="45" />
        <path d="M35 70h90M80 25a40 40 0 015 50 40 40 0 01-5 50" />
        <path d="M50 45c10-5 25-8 40-5M50 95c10 5 25 8 40 5" />
        <rect x="120" y="30" width="60" height="80" rx="8" />
        <path d="M135 55h30M135 70h20M135 85h25" />
        <circle cx="40" cy="40" r="6" />
        <path d="M36 40l3 3 5-6" />
      </svg>
    ),
    gallery: [
      <svg key="g1" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="30" width="100" height="80" rx="8" />
        <path d="M30 70h20M30 85h35M75 60h10M75 75h25" />
      </svg>,
      <svg key="g2" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="60" cy="60" r="35" />
        <path d="M45 60l10 10 20-25" />
      </svg>,
      <svg key="g3" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="15" y="25" width="90" height="70" rx="8" />
        <path d="M30 50h25M30 65h40M30 80h15" />
      </svg>,
      <svg key="g4" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 20l40 60H20z" />
        <circle cx="60" cy="70" r="8" />
      </svg>,
    ],
  },
];

export function getProductBySlug(slug: string): MarketingProduct | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductByName(name: string): MarketingProduct | undefined {
  return PRODUCTS.find(p => p.name === name || p.name.replace('AI ', '') === name.replace('AI ', ''));
}

export function matchProduct(apiProduct: { name: string; slug: string }): MarketingProduct | undefined {
  return getProductBySlug(apiProduct.slug) || getProductByName(apiProduct.name);
}

export const NEWS_POSTS = [
  {
    id: 'n1',
    tag: 'Product update',
    date: 'Aug 18, 2026',
    title: 'AI Pod passes 500 businesses served across East Africa',
    excerpt: 'We marked a quiet milestone this week: more than 500 organisations are now using AI Pod to track tasks and generate reports. Most of them found us through referrals, which says less about us and more about how painful scattered spreadsheets still are.',
    image: 'https://picsum.photos/seed/ai-pod-500/480/320',
  },
  {
    id: 'n2',
    tag: 'Announcement',
    date: 'Aug 12, 2026',
    title: 'AI World launching to public beta next quarter',
    excerpt: 'After six months of closed testing with schools and travel groups, AI World is ready for a broader audience. The beta will open in October with expanded city tours and new language exercises.',
    image: 'https://picsum.photos/seed/ai-world-beta/480/320',
  },
  {
    id: 'n3',
    tag: 'Product update',
    date: 'Aug 3, 2026',
    title: 'AI Recruiter now supports custom evaluation criteria',
    excerpt: 'The latest update to AI Recruiter lets teams define their own scoring rubrics so the ranking engine matches what matters to them, not a generic industry benchmark.',
    image: 'https://picsum.photos/seed/ai-recruiter-criteria/480/320',
  },
  {
    id: 'n4',
    tag: 'Company news',
    date: 'Jul 22, 2026',
    title: 'Hiring our first sales and customer success lead in Nairobi',
    excerpt: 'We are growing the team that helps organisations pick the right product. The new hire will run demos, onboarding and follow-up support for the AI Marketer portfolio across East Africa.',
    image: 'https://picsum.photos/seed/ai-marketer-hire/480/320',
  },
];
