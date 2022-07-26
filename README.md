# Eco Admin App

## General

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

## Stack includes:

- Next.js
- Typescript
- TRPC
- React Query
- TailwindCSS

### Why this stack?

- Why TypeScript ?

  - Javascript is hard. Why add more rules?

- Why Next.js ?

  - React has made UI development accessible in ways we never imagined before. It also can lead developers down some rough paths. Next.js offers a lightly opinionated, heavily optimized approach to creating a website using React. From routing to API definitions to image rendering, we trust Next.js to lead developers towards good decisions.

- Why TailwindCSS?

  - CSS is hard. Why add more rules?

- Why ReactQuery ?

  - ReactQuery makes making requests easy and consistet; No need to have your component hold some local state such as `loading` / `error` / `retry`, and even more importantly, no need to develop your own caching / cache invalidation logic. Get it right out of the box with minimal overhead.

- Why tRPC?
  - I want to know the types that come back from my requests. I want to do this in a way that plays nicely with React / ReactQuery.

## Goals

- Ability to easily test complex scenarios with fresh users in lower env's
  - Anything you often find yourself doing on Postman / DB Queries that take more then 1 step, should be automated and accessible to all via a simple UI that wraps that logic
- Become the 'home page for engineers' (alternatively the 'unbank for engineers')
  - Show relevant dashboards
    - i.e. status reports for the backend / parterners
    - app release notes, app download trends
    - relevant mixpanel reports
    - important dev notes
  - High-level mapping of our repos
  - High-level mapping of our thrid-party service partners
    - with the ability to see a once sentence description of what they do for us
    - and request access (i.e. Mixpanel, Twilio, Auth0, etc.)
- Automate:
  - user account creation
  - user transaction creation (dummy accounts) / processing (from pending -> queued -> failed / completed)
  - user referrals creation / processing
- Do this in such a way that anyone can contribute:
  - frontend / backend folks alike
- Increase the number of accounts we test with
  - currently rely heavily on `satishgalt` account that may work fine, while newer accounts may be broken
- Prepare us for maintaining web-apps at scale!
  - teach the team via trial and error how to deal with a large app (component library, architecture, etc.)
  - help us identify technologies we want to work with

## Getting Started

- `pnpm i`
- `pnpm dev`
- `localhost:3000`

### Notes:

- I personally recommend using `pnpm` but you can use `yarn` or `npm` if you prefer
