export const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  leads: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.4"/><path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6"/></svg>',
  campaigns: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12l14-7-4 7 4 7-14-7z"/></svg>',
  emails: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 6l9 7 9-7"/></svg>',
  automation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="3.4"/></svg>',
  products: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>',
  content: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h9l5 5v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M9 12h6M9 16h6M9 8h3"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.9 7.9 0 000-2l2-1.6-2-3.4-2.4.6a7.7 7.7 0 00-1.7-1L14.8 3h-4l-.5 2.6a7.7 7.7 0 00-1.7 1l-2.4-.6-2 3.4L6.2 11a7.9 7.9 0 000 2l-2 1.6 2 3.4 2.4-.6a7.7 7.7 0 001.7 1L10.8 21h4l.5-2.6a7.7 7.7 0 001.7-1l2.4.6 2-3.4-2-1.6z"/></svg>',
};

export const PRODUCTS = [
  { id: 'p1', name: 'AI Port', published: true, problem: 'Teams juggle tasks across scattered tools and have no clear reporting on progress.', target: 'Growing teams and departments that need centralised task tracking and reporting', description: 'A task management and reporting system that keeps every team\'s work in one place and turns progress into clear, automatic reports.', features: ['Shared task boards & assignments', 'Automated progress reports', 'Team workload dashboards'], benefits: ['Everyone sees priorities in one place', 'Far less time spent compiling status updates', 'Managers spot bottlenecks early'] },
  { id: 'p2', name: 'AI Recruiter', published: true, problem: 'HR teams spend hours manually screening resumes and scheduling interviews.', target: 'HR departments and recruiting agencies handling high applicant volumes', description: 'An AI recruiting and HR platform that screens candidates, ranks them against the role, and helps schedule interviews automatically.', features: ['Automated resume screening', 'Candidate matching & ranking', 'Interview scheduling assistant'], benefits: ['Faster time-to-hire', 'Far less manual screening work', 'More consistent, bias-aware evaluation'] },
  { id: 'p3', name: 'AI Dojo', published: true, problem: 'Remote and hybrid teams lack an engaging way to train, onboard, or practise real scenarios together.', target: 'Companies with remote or hybrid teams that need immersive training or onboarding', description: 'A virtual training experience with personal avatars, letting teams meet, learn, and rehearse real scenarios together in a shared virtual space.', features: ['Custom avatars', 'Virtual training rooms', 'Interactive scenario simulations'], benefits: ['More engaging onboarding and training', 'Stronger connection across remote teams', 'Safe practice for real-world scenarios'] },
  { id: 'p4', name: 'AI World', published: false, problem: 'People want to experience and understand another culture without the cost and time of travelling there.', target: 'Individuals, schools, and companies interested in cultural exploration or travel preparation', description: 'An immersive virtual experience that lets people explore Japan — its cities, culture and language — from anywhere.', features: ['Virtual tours of Japanese cities & landmarks', 'Interactive culture & language lessons', 'Guided immersive experiences'], benefits: ['Explore Japan from anywhere', 'Learn culture and language interactively', 'No travel cost or time required'] },
];

export const LEADS = [
  {
    id: 'L-1042', company: 'Kampala FreshFoods Ltd', website: 'kampalafreshfoods.ug', industry: 'Food & Beverage', location: 'Kampala, Uganda', contact: 'Grace Nakato', email: 'grace@kampalafreshfoods.ug', product: 'p2', status: 'needs-followup',
    discovered: ['Growing distributor of packaged produce, ~40 employees', 'No dedicated HR or recruiter found on LinkedIn', 'Recently posted 4 open roles, still unfilled after a month', 'Hiring manager reportedly screens every CV by hand'],
    problem: 'Open roles are sitting unfilled because one hiring manager is manually screening every application.',
    reasoning: 'AI Recruiter automates the resume screening this hiring manager is currently doing by hand, which should clear the backlog of 4 unfilled roles.',
    lastContact: '6 days ago', pitchApproved: true
  },
  {
    id: 'L-1043', company: 'Nile Logistics Group', website: 'nilelogistics.co.ug', industry: 'Logistics', location: 'Entebbe, Uganda', contact: 'Samuel Okello', email: 's.okello@nilelogistics.co.ug', product: 'p1', status: 'responded',
    discovered: ['Operates a fleet of 30+ trucks across 3 regional hubs', 'Job posting mentions "manual Excel reporting" as a pain point', 'No shared task-tracking tool detected across hubs'],
    problem: 'Each hub tracks its own tasks and delivery data separately, so head office spends hours each week reassembling it into a single picture.',
    reasoning: 'AI Port gives all three hubs one shared task board and turns their combined progress into automatic reports, replacing the manual Excel work.',
    lastContact: '2 days ago', pitchApproved: true
  },
  {
    id: 'L-1044', company: 'Highland People Solutions', website: 'highlandpeople.co.ke', industry: 'Staffing & HR', location: 'Nairobi, Kenya', contact: 'Dr. Amina Yusuf', email: 'amina@highlandpeople.co.ke', product: 'p2', status: 'new',
    discovered: ['Mid-size staffing agency placing candidates across East Africa', 'Reviews mention slow turnaround on candidate shortlists', 'No applicant tracking or screening automation found'],
    problem: 'Recruiters manually read every application before shortlisting, which slows down delivery to their client companies.',
    reasoning: 'AI Recruiter automatically screens and ranks applicants, directly addressing the slow shortlisting turnaround mentioned in client reviews.',
    lastContact: '—', pitchApproved: false
  },
  {
    id: 'L-1045', company: 'Zenith Corporate Training', website: 'zenithtraining.co.ke', industry: 'Professional Services', location: 'Nairobi, Kenya', contact: '', email: '', product: 'p3', status: 'new',
    discovered: ['Runs in-person onboarding and compliance workshops for corporate clients', 'No remote or virtual training offering found', 'Website mentions demand from clients with distributed teams'],
    problem: 'Clients with remote and hybrid teams keep asking for training that does not require flying people into one room.',
    reasoning: 'AI Dojo lets Zenith deliver the same onboarding and scenario training virtually, with avatars, to exactly the distributed teams their clients are asking about.',
    lastContact: '—', pitchApproved: false
  },
  {
    id: 'L-1046', company: 'Metro Builders Uganda', website: 'metrobuilders.ug', industry: 'Construction', location: 'Kampala, Uganda', contact: 'Peter Ssenyonga', email: 'peter@metrobuilders.ug', product: 'p3', status: 'contacted',
    discovered: ['Mid-size construction firm, residential & commercial', 'Recent job-site incident report mentions inconsistent safety induction for new hires', 'No structured onboarding or training simulation in use'],
    problem: 'New site workers get an inconsistent, informal safety induction instead of standardised training.',
    reasoning: 'AI Dojo can give every new hire the same virtual safety-scenario training before they set foot on site, closing the gap flagged in the incident report.',
    lastContact: '9 days ago', pitchApproved: true
  },
  {
    id: 'L-1047', company: 'Tembo Retail Group', website: 'temboretail.co.tz', industry: 'Retail', location: 'Dar es Salaam, Tanzania', contact: 'Fatima Rashid', email: 'fatima@temboretail.co.tz', product: 'p1', status: 'meeting',
    discovered: ['12-store retail chain', 'Job listing seeks a "data & reporting analyst"', 'Store managers reportedly send weekly updates by WhatsApp with no central tracking'],
    problem: 'Head office cannot see what each of the 12 stores is working on or how it is progressing, because updates arrive informally with no central record.',
    reasoning: 'AI Port gives every store a shared task board and rolls store-level progress into automatic reports for head office — the visibility they are currently trying to hire an analyst for.',
    lastContact: '1 day ago', pitchApproved: true
  },
  {
    id: 'L-1048', company: 'Savanna Travel & Culture Co', website: 'savannatravel.co.rw', industry: 'Travel & Tourism', location: 'Kigali, Rwanda', contact: 'James Kariuki', email: 'james@savannatravel.co.rw', product: 'p4', status: 'lost',
    discovered: ['Travel agency specialising in curated international trips', 'Recently promoted a "Japan discovery" package on social media', 'Replied that they had already partnered with a competing virtual-tour provider'],
    problem: 'Clients want a taste of a destination before committing to book — currently only offered through static brochures and slideshows.',
    reasoning: 'AI World was matched on their own "Japan discovery" campaign, but they had already signed with another provider by the time we reached out.',
    lastContact: '14 days ago', pitchApproved: true
  },
  {
    id: 'L-1049', company: 'Savanna AgriTech', website: 'savannaagritech.com', industry: 'Agriculture', location: 'Kigali, Rwanda', contact: 'Eric Mugisha', email: 'eric@savannaagritech.com', product: 'p2', status: 'customer',
    discovered: ['AgriTech startup selling soil sensors to cooperatives', 'Small 3-person team, no dedicated HR function', 'Actively fundraising, mentioned "scaling the team fast" in a LinkedIn post'],
    problem: 'A 3-person team has no time to screen candidates properly while trying to hire quickly after a funding round.',
    reasoning: 'AI Recruiter lets a small team screen and rank candidates automatically, matching their stated goal of scaling the team fast without slowing down the people already working.',
    lastContact: 'Converted 3 days ago', pitchApproved: true
  },
];

export const CAMPAIGNS = [
  { id: 'C-01', name: 'Logistics & Retail Ops — East Africa', product: 'p1', target: 'Logistics and multi-site retail companies, Uganda, Kenya, Tanzania (50–500 employees)', status: 'running', found: 38, contacted: 29, responded: 11, interested: 6, meetings: 3, customers: 1 },
  { id: 'C-02', name: 'HR Teams & Agencies — Kenya', product: 'p2', target: 'HR departments and staffing agencies, Nairobi & Mombasa', status: 'running', found: 52, contacted: 40, responded: 9, interested: 4, meetings: 2, customers: 1 },
  { id: 'C-03', name: 'Remote Training Adopters — Q3', product: 'p3', target: 'Companies with distributed teams needing onboarding or safety training, East Africa', status: 'paused', found: 21, contacted: 21, responded: 5, interested: 3, meetings: 1, customers: 0 },
];

export const AUTOMATIONS = [
  { id: 'A1', name: 'Lead Discovery — Logistics & Retail Ops EA', status: 'running', lastRun: '12 min ago', result: 'Found 6 new companies, 4 passed duplicate check.' },
  { id: 'A2', name: 'Lead Analysis', status: 'running', lastRun: '3 min ago', result: 'Analysed 4 leads, matched product for all 4.' },
  { id: 'A3', name: 'Follow-up Reminder Check', status: 'completed', lastRun: 'Today, 07:00', result: 'Flagged 3 leads with no response after 5 days.' },
  { id: 'A4', name: 'Duplicate & Enrichment Pass', status: 'completed', lastRun: 'Today, 06:40', result: 'Removed 2 duplicate companies, enriched 9 records.' },
  { id: 'A5', name: 'Lead Discovery — HR Teams KE', status: 'failed', lastRun: 'Yesterday, 22:10', result: 'Source site blocked automated requests after 12 pages.' },
  { id: 'A6', name: 'Sales Pitch Generation', status: 'stopped', lastRun: '2 days ago', result: 'Manually stopped — awaiting new product copy for AI World.' },
];

export const EMAILS = [
  { id: 'E-501', lead: 'Kampala FreshFoods Ltd', product: 'AI Recruiter', status: 'sent', subject: 'Clearing the hiring backlog at Kampala FreshFoods, Grace', body: "Hi Grace,\n\nI noticed 4 of your open roles have stayed unfilled for a while — usually a sign that manual CV screening is the bottleneck, not a lack of applicants.\n\nAI Recruiter automatically screens and ranks candidates against the role, so you only spend time on the shortlist, not the pile.\n\nWorth a 15-minute chat this week?\n\nBest,\nAI Pod Team" },
  { id: 'E-502', lead: 'Nile Logistics Group', product: 'AI Port', status: 'responded', subject: 'One shared view across all 3 Nile Logistics hubs', body: "Hi Samuel,\n\nSaw your team is stuck compiling fleet and delivery data by hand across three hubs every week.\n\nAI Port gives every hub a shared task board and turns their combined progress into an automatic report, so head office isn't rebuilding the picture from scratch.\n\nHappy to show you a sample report built from data like yours — interested?\n\nBest,\nAI Pod Team" },
  { id: 'E-503', lead: 'Highland People Solutions', product: 'AI Recruiter', status: 'pending', subject: 'Faster shortlists for Highland People Solutions', body: "Hi Dr. Yusuf,\n\nA few client reviews mention slow turnaround on candidate shortlists — usually a sign of manual screening at scale.\n\nAI Recruiter screens and ranks every applicant automatically, so your recruiters go straight to the strongest candidates.\n\nWould you be open to a quick call to see it in action?\n\nBest,\nAI Pod Team" },
  { id: 'E-504', lead: 'Zenith Corporate Training', product: 'AI Dojo', status: 'draft', subject: 'Taking Zenith\'s workshops virtual', body: "Hi there,\n\nSaw a few of your clients are asking for training that doesn't require flying a distributed team into one room.\n\nAI Dojo lets you deliver the same onboarding and scenario training virtually, with avatars, to teams wherever they are.\n\nOpen to a short call?\n\nBest,\nAI Pod Team" },
  { id: 'E-505', lead: 'Metro Builders Uganda', product: 'AI Dojo', status: 'failed', subject: 'Consistent safety onboarding for every new hire', body: "Hi Peter,\n\nA recent incident report pointed to inconsistent safety induction for new site workers.\n\nAI Dojo can put every new hire through the same virtual safety-scenario training before their first day on site.\n\nWorth a quick look?\n\nBest,\nAI Pod Team" },
  { id: 'E-506', lead: 'Tembo Retail Group', product: 'AI Port', status: 'responded', subject: 'One dashboard for all 12 Tembo Retail stores', body: "Hi Fatima,\n\nNoticed you're hiring for a data & reporting analyst — usually a sign head office can't see store performance fast enough to act.\n\nAI Port gives every store a shared task board and rolls their progress into automatic reports for head office, no analyst hire required.\n\nCould we set up a short demo?\n\nBest,\nAI Pod Team" },
];

export const BLOGS = [
  { id: 'B1', title: 'How AI Recruiter cut screening time by 70% for a 3-person hiring team', status: 'published', date: 'Aug 12, 2026' },
  { id: 'B2', title: 'Why distributed teams struggle to onboard consistently (and what to do about it)', status: 'published', date: 'Aug 3, 2026' },
  { id: 'B3', title: 'Inside AI Port: turning scattered tasks into one weekly report', status: 'draft', date: 'Not published' },
];
export const NEWS = [
  { id: 'N1', title: 'AI Pod passes 500 businesses served across East Africa', status: 'published', date: 'Aug 18, 2026' },
  { id: 'N2', title: 'AI World launching to public beta next quarter', status: 'draft', date: 'Not published' },
];
export const QUOTES = [
  { id: 'Q1', title: '"The best time to find a customer was yesterday. The second best is with AI Pod."', status: 'published', date: 'Today' },
  { id: 'Q2', title: '"Growth is a distribution problem before it is a product problem."', status: 'published', date: 'Scheduled for tomorrow' },
];

export function productName(id: string) { const p = PRODUCTS.find(p => p.id === id); return p ? p.name : '—'; }
export function statusLabel(s: string) {
  const map: Record<string, string> = { new: 'New', contacted: 'Contacted', responded: 'Responded', 'needs-followup': 'Needs follow-up', meeting: 'Meeting', customer: 'Customer', lost: 'Not interested' };
  return map[s] || s;
}
export function statusPillClass(s: string) {
  const map: Record<string, string> = { new: 'pill-new', contacted: 'pill-contacted', responded: 'pill-responded', 'needs-followup': 'pill-followup', meeting: 'pill-meeting', customer: 'pill-customer', lost: 'pill-lost' };
  return map[s] || 'pill-new';
}
