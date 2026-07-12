// Targets: unlisted, application-specific pages under /for/<slug> — one per
// role Tyler is investing real effort in (vs. the evergreen discipline
// variants in variants.js). Each target is a variant-shaped object, usually
// spread from the closest variant with only the role-specific fields
// overridden, plus:
// - pitch: { heading, html } — a "why this role" section rendered at the top
//   of the page (section 00), only on target pages
//
// Targets are noindex, excluded from nav, and reachable only by URL — the
// tailored resume's contact line links here. When an application cycle ends,
// delete the entry and its resume html (git remembers).

import { variants } from './variants.js';

export const targets = {
  'claude-corps': {
    ...variants.ai,
    id: 'claude-corps',
    path: '/for/claude-corps',
    resumePath: '/for/claude-corps/resume',
    title: 'Tyler Teuber | Claude Corps',
    description:
      'Coding instructor and daily Claude Code builder. Teaching people to use technology well is already my job.',
    hero: {
      status: 'APPLYING TO CLAUDE CORPS',
      tagline:
        'I teach people to code for a living and build with Claude every day. Helping others get real leverage out of AI is the job I want.',
    },
    projects: {
      order: ['lesson-agent', 'arcade-sfx', 'hypr-blocker'],
      featured: ['lesson-agent', 'arcade-sfx'],
    },
    aboutIntro:
      'My love of technology started with Logic Pro when I was 16, and I learned programming hoping to someday build the kind of creative software I was so passionate about using. Four years and thousands of hours later, the part that hooked me hardest is where building meets teaching: I teach programming for a living, and my flagship project, the <a href="/projects/lesson-agent">Personal Lesson Agent</a>, is basically an AI teacher (a four-agent framework I wrote from scratch that turns a short interview into a complete personalized course). Claude Code has been my main development tool on every real project since the Sonnet 3.5 days.',
    skillGroupOrder: ['Tools & AI', 'Languages', 'Frontend', 'Backend', 'Audio & Native'],
    pitch: {
      heading: 'Why Claude Corps',
      html: `
        <p>My favorite moments as a coding instructor are when a tool stops being intimidating and starts belonging to the student. I've spent the last two years chasing that moment with code, teaching over 50 students while our branch grew from opening day to over a hundred enrolled. Claude Corps is that same work with the tool I'm most excited about: helping people who aren't engineers get real leverage out of AI.</p>
        <p>I don't just like Claude, I build with it. Claude Code has been my main development tool on every real project since the Sonnet 3.5 days, and I've shipped LLM-powered software of my own, from a multi-agent learning platform to a production AI feature behind the Claude API. I know first-hand what Claude is actually good at, where it needs guardrails, and how to teach the difference.</p>
        <p>I also love it when I'm able to build things that people actually use, and it's even more special to me when that happens at church: a small app I built for mine still saves someone an hour of manual work every single week, years later, even though I'm not there anymore. Spending a year embedded in a nonprofit and making AI genuinely useful to its mission is exactly the kind of building I'm looking for.</p>
      `,
    },
  },
};

export const targetIds = Object.keys(targets);
