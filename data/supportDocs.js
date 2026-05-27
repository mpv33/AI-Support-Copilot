/**
 * InterviewPro.info — RAG knowledge base (aligned to interviewpro.info).
 *
 * Writing rules for retrieval:
 * - Lead each article with keywords (product name + what it does).
 * - Use blank lines between sections (chunking splits on double newlines).
 * - Keep Q/A pairs self-contained in the FAQ article.
 */

export const supportDocs = [
  {
    id: 'ip-platform-overview',
    tenantId: 'interviewpro',
    title: 'InterviewPro.info — platform overview',
    url: 'https://www.interviewpro.info/',
    text: `
InterviewPro.info — Practice with intent. Land with confidence.

InterviewPro.info is an interview prep platform for developers targeting frontend, full-stack, DSA, machine coding, and Gen AI roles — from junior to staff level.

What's on the platform:
- A2Z Frontend — 60+ guided frontend interview topics
- Machine Coding — 70+ JavaScript and 30+ React in-browser challenges
- DSA by Patterns — 260+ curated problems with LeetCode links and company tags
- Gen AI Fundamentals — 13-topic LLM engineering path with capstone
- ResumePro — AI resume fit check against a job description
- EvalPro — AI code evaluation for machine coding submissions
- Job Board — curated tech roles with search and filters
- Progress dashboard — LeetCode-style profile stats at /profile and /user/your-username
- Interview Guide — module-by-module notes on what interviewers ask

Frontend, DSA, machine coding, Gen AI, and resume tools — plus a profile progress dashboard to track what you have solved.

How InterviewPro.info differs from LeetCode or a job board alone: structured frontend and machine-coding prep, pattern-based DSA (not random grinding), AI tools (ResumePro + EvalPro), curated jobs, and one unified progress dashboard — built for interview readiness end to end.

Partnerships (bootcamps, colleges, employers): interviewpro.hr@gmail.com or Get in touch on the ResumePro page.
    `,
  },
  {
    id: 'faq-interviewpro',
    tenantId: 'interviewpro',
    title: 'InterviewPro.info — FAQ',
    url: 'https://www.interviewpro.info/',
    text: `
Q: Who is InterviewPro for?
A: Developers preparing for frontend, full-stack, DSA, machine coding, and Gen AI interviews — from junior to staff. The platform favors structured tracks and interview-style practice over random problem grinding.

Q: What learning tracks are on the platform?
A: A2Z Frontend (60+ topics), Machine Coding (70+ JS / 30+ React challenges), DSA by Patterns (260+ problems), Gen AI Fundamentals (13 topics + capstone), ResumePro, EvalPro, Interview Guide, Job Board, and a Progress dashboard.

Q: What is machine coding practice?
A: In-browser JavaScript and React interview-style builds with starters, a live editor, and test runs. Filter by company, category, and difficulty. Solved work syncs to your progress dashboard after sign-in.

Q: What is the progress dashboard?
A: A LeetCode-style profile at /user/your-username showing solved counts, Easy/Medium/Hard charts, and JS, React, and DSA stats. Open /profile when signed in; the Dashboard tab on your public profile shows the breakdown.

Q: What is EvalPro?
A: InterviewPro.info's AI code-judge for machine coding. It generates fresh test cases each run, executes code in a sandbox, and returns human-style feedback on logic, complexity, and fixes.

Q: What does ResumePro do?
A: Paste a job description and upload your resume. ResumePro returns a match score, gap analysis, and prioritized edits aligned to that specific job post — before you apply.

Q: What is on the job board?
A: Curated tech listings from career sites and ATS feeds. Filter by role, level, and location. Includes a frontend-focused view when you want FE roles only.

Q: Do I need an account?
A: Sign in to save progress, use ResumePro, and keep solved work across sessions. Guests can browse open track content; progress may not persist until you create an account.

Q: What is free right now?
A: Most core learning tracks are free to start. ResumePro is free but requires signup. Any paid or Pro features depend on what is listed on interviewpro.info after you sign in.

Q: How is this different from LeetCode or a job site alone?
A: InterviewPro combines pattern-based DSA with LeetCode links, in-browser machine coding with EvalPro, structured frontend prep (A2Z Frontend), a Gen AI interview path, ResumePro JD matching, curated jobs, and a unified progress dashboard.

Q: Do you support teams or colleges?
A: Yes — bootcamp cohort reports, employer pipelines, custom ResumePro rubrics, EvalPro integrations, and HirePro for recruitment teams. Email interviewpro.hr@gmail.com.
    `,
  },
  {
    id: 'a2z-frontend-track',
    tenantId: 'interviewpro',
    title: 'A2Z Frontend track',
    url: 'https://www.interviewpro.info/a2z-frontend',
    text: `
A2Z Frontend is InterviewPro.info's structured frontend interview track — from JavaScript and React to system design, junior to staff.

What's included (60+ guided topics in one track):
- Core JavaScript, React, and tricky outputs
- System design, performance, and platform engineering
- Security, accessibility (a11y), and product case studies

Best way to use it: read concept notes before jumping to solutions. Pair with the Interview Guide for module-by-module frontend system design (feeds, dashboards, data flow, scale).

After sign-in, mark topics complete to update your progress dashboard. Practice with intent — the platform tagline is "Practice with intent. Land with confidence."
    `,
  },
  {
    id: 'machine-coding',
    tenantId: 'interviewpro',
    title: 'Machine Coding practice',
    url: 'https://www.interviewpro.info/practice',
    text: `
Machine Coding on InterviewPro.info: 70+ JavaScript and 30+ React interview-style challenges — practice in the browser with progress tracking and company filters.

What you get:
- 70+ JS and 30+ React problems built for interview conditions
- Live practice environment — starter code, editor, and test runs
- Filters for company, category, and difficulty
- Progress dashboard integration — track what you have solved

How to start: open Machine Coding from the main navigation, pick a problem, and build in the in-browser editor.

After submitting, run EvalPro for AI-powered evaluation — fresh test cases, sandbox execution, and feedback like a senior reviewer (logic, edge cases, complexity notes, score out of 100).
    `,
  },
  {
    id: 'dsa-by-patterns',
    tenantId: 'interviewpro',
    title: 'DSA by Patterns',
    url: 'https://www.interviewpro.info/dsa',
    text: `
DSA by Patterns on InterviewPro.info: 260+ most-asked DSA problems organized by topic and pattern — not random grinding.

What you get:
- 260+ curated problems grouped by pattern (two pointers, sliding window, trees, graphs, DP, and more)
- Direct LeetCode links on every problem
- Filter and browse by company tag
- Easy, Medium, and Hard breakdown on your progress dashboard after sign-in

How it differs from generic problem lists: problems are pattern-first so you learn reusable techniques interviewers expect, then drill by company when you are close to onsite loops.

Mark problems solved while signed in to keep your /profile and public /user/your-username dashboard up to date.
    `,
  },
  {
    id: 'gen-ai-track',
    tenantId: 'interviewpro',
    title: 'Gen AI Fundamentals track',
    url: 'https://www.interviewpro.info/gen-ai',
    text: `
Gen AI Fundamentals on InterviewPro.info: LLM engineering from fundamentals to production — built for Gen AI, LLM, and AI frontend interviews.

The track includes 13 guided topics plus a capstone project:
- LLMs, prompts, RAG, and embeddings
- Agents, streaming UI, and AI backends
- System design, security, and interview drills

Pair with the Interview Guide Gen AI module (models vs agents, prompt design, cost, safety, and what to build in production).

Subtopics on the site include LLM Engineering and RAG & Embeddings. Sign in to save progress across the path.
    `,
  },
  {
    id: 'evalpro',
    tenantId: 'interviewpro',
    title: 'EvalPro — AI code evaluation',
    url: 'https://www.interviewpro.info/evalpro',
    text: `
EvalPro is InterviewPro.info's AI code-judge agent — designed for machine coding and interview-style submissions.

What EvalPro does:
- Generates fresh, unpredictable test cases on each run
- Executes your code in a sandbox
- Returns human-level feedback on logic, trade-offs, and fixes
- Scores submissions (e.g. out of 100) with complexity notes like O(n²) vs recommended O(n)

How to use it: open a Machine Coding problem, submit your solution, and run EvalPro AI evaluation.

EvalPro vs static judges: unlike fixed pass/fail test suites, EvalPro adapts test cases and explains mistakes the way a senior interviewer would.
    `,
  },
  {
    id: 'resumepro',
    tenantId: 'interviewpro',
    title: 'ResumePro — resume fit check',
    url: 'https://www.interviewpro.info/resumepro',
    text: `
ResumePro on InterviewPro.info: AI resume fit check before you apply — match score, gaps, and fixes aligned to the job post.

How it works:
1. Paste the job description (JD)
2. Upload your resume
3. Get a match score with gap analysis and prioritized edits

Your report includes: match strength percentage, requirements marked met / partial / missing, strengths and gaps, keywords present vs missing, and numbered next edits.

Important: analysis is JD-specific — the same resume gets different feedback when the job description changes.

ResumePro is free but requires signup. For bootcamp or employer partnerships (custom rubrics, cohort reports, API access), use Get in touch on the ResumePro page or email interviewpro.hr@gmail.com.
    `,
  },
  {
    id: 'job-board',
    tenantId: 'interviewpro',
    title: 'Job Board',
    url: 'https://www.interviewpro.info/job-board',
    text: `
The InterviewPro.info Job Board surfaces curated tech roles when you are ready to apply — search, filter, and use the frontend-focused board when you need FE roles.

What's included:
- Listings aggregated from career sites and ATS feeds
- Filters for role, level, and location
- Frontend-focused view for frontend interview prep

Suggested workflow: practice on A2Z Frontend or Machine Coding, tailor your resume with ResumePro for a specific JD, then apply via listings on the Job Board.

Always confirm details and apply on the employer's official site. Meet hiring partners via Connect in the site footer.
    `,
  },
  {
    id: 'progress-dashboard',
    tenantId: 'interviewpro',
    title: 'Progress dashboard',
    url: 'https://www.interviewpro.info/profile',
    text: `
The InterviewPro.info progress dashboard is a LeetCode-style profile showing solved counts, difficulty charts, and per-track stats for JS, React, and DSA.

Where to find it:
- Signed-in view: /profile
- Public profile: /user/your-username (Dashboard tab shows your breakdown)

What it tracks:
- Easy, Medium, and Hard solved counts with charts
- JavaScript, React, and DSA progress in one view
- Completion across Machine Coding, DSA, and track modules when marked solved

Progress only syncs after sign-in. Guest practice on open content may not save. If counts look wrong, confirm you are on the correct account and hard-refresh /profile.
    `,
  },
  {
    id: 'interview-guide',
    tenantId: 'interviewpro',
    title: 'Interview Guide',
    url: 'https://www.interviewpro.info/interview-guide',
    text: `
The Interview Guide on InterviewPro.info explains what interviewers ask — module by module — so you know what to study before an onsite.

Covers:
- Frontend system design (large UIs, feeds, dashboards, data flow, scale, failure modes)
- Gen AI interview topics (models, agents, prompts, production concerns)

Use it alongside A2Z Frontend and Gen AI Fundamentals: read a guide module, then practice in tracks, machine coding, or EvalPro-evaluated submissions.

Find the Interview Guide from the main navigation or footer on interviewpro.info.
    `,
  },
  {
    id: 'login-account',
    tenantId: 'interviewpro',
    title: 'Sign in, accounts, and free access',
    url: 'https://www.interviewpro.info/',
    text: `
Sign in, accounts, and free access on InterviewPro.info.

Do I need an account to save progress on InterviewPro.info? Yes — sign in to save your progress dashboard, use ResumePro, and keep solved Machine Coding and DSA work across sessions. Guest users can browse open content, but progress may not persist.

How to sign in: click Sign In on interviewpro.info (Google, GitHub, or email).

What is free: most core learning tracks are free to start. Paid or Pro features depend on current offerings after sign-in.

Tips: use the same sign-in method each time — switching providers can look like a new account. Password reset links expire after one hour. If your session expires, sign out and sign in again from the account menu.
    `,
  },
  {
    id: 'contact-support',
    tenantId: 'interviewpro',
    title: 'Contact, support, and partnerships',
    url: 'https://www.interviewpro.info/',
    text: `
Contact InterviewPro.info support: interviewpro.hr@gmail.com

Use this email for help with tracks, ResumePro, EvalPro, account issues, and partnership questions.

Teams and colleges: bootcamp cohort reports, employer pipelines, custom ResumePro rubrics, EvalPro integrations, and HirePro for recruitment teams / HR / agencies.

Footer links on interviewpro.info: Meet teams, Contact us, Feedback, Privacy policy.

ResumePro partnerships (custom rubrics, API integrations): Get in touch on the ResumePro page.
    `,
  },
  {
    id: 'privacy-data',
    tenantId: 'interviewpro',
    title: 'Privacy and your data',
    url: 'https://www.interviewpro.info/privacy',
    text: `
InterviewPro.info privacy: read the full Privacy policy from the site footer.

What we store: sign-in provider, learning progress, and optional resume uploads when you use ResumePro.

Security: never paste passwords, API keys, or other secrets into support chat or ResumePro uploads.

Data requests: email interviewpro.hr@gmail.com from your registered account email.
    `,
  },
  {
    id: 'troubleshooting-platform',
    tenantId: 'interviewpro',
    title: 'Troubleshooting common issues',
    url: 'https://www.interviewpro.info/',
    text: `
If InterviewPro.info tracks, ResumePro, or EvalPro fail to load:
- Hard-refresh the browser and clear cache
- Disable ad blockers — they can block auth or API requests
- Use an up-to-date Chrome, Firefox, Safari, or Edge browser
- Check VPN or corporate proxy if sign-in or code execution fails

Progress dashboard not updating:
- Confirm you are signed in
- Refresh /profile
- Verify you marked the problem or module as solved in the track

Still stuck? Email interviewpro.hr@gmail.com with your browser, steps to reproduce, and screenshots.
    `,
  },
  {
    id: 'subscription-status-tool',
    tenantId: 'interviewpro',
    title: 'Plans, billing, and Pro subscription',
    url: 'https://www.interviewpro.info/',
    text: `
InterviewPro.info plans and billing:

Free to start: most core learning tracks are open without payment. ResumePro is free but requires signup.

Pro subscription: some advanced or Pro features may require a paid plan — check interviewpro.info after sign-in for current pricing and what is included.

Manage billing: interviewpro.info → Settings → Billing (when available on your account).

Questions about charges, renewal dates, or cancel-at-period-end: contact interviewpro.hr@gmail.com from your registered email.

In this support chat demo, asking "Is my Pro subscription active?" can trigger a sample subscription lookup — real billing is managed on the platform, not in chat.
    `,
  },
]
