# Eco Admin App

## General

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

## Stack includes:

- Typescript
- TRPC
- React Query
- NextAuth
- TailwindCSS

## Goals

- Improve DX &amp; testing on the enviroments we develop against
- Anything you often find yourself doing on Postman / DB Queries that take more then 1 step, should be automated and accessible to all via a simple UI that wraps that logic
- Become the 'home page for engineers' (alternatively the 'unbank for engineers')
- Automate:
  - user account creation
  - user transaction creation (dummy accounts) / processing (from pending -> queued -> failed / completed)
  - user referrals creation / processing
- Do this in such a way that anyone can contribute:
  - frontend / backend folks alike
- Increase the number of accounts we test with
  - currently rely heavily on `satishgalt` account that may work fine, while newer accounts may be broken

## Todo

- [&check;] General Skeleton UI
- [&check;] Recent Users UI
- [&check;] Recent Users API Routes
- [&check;] Search
- [&check;] Select User
- [&check;] User Creation Skeleton UI
- [&check;] User Transfers UI
- [&check;] User Transfers API
- [&check;] Update ENVs
- [&check;] Deploy to Vercel
- [&check;] Referrals
- [&check;] Pretty Placeholder
- [ ] Create Referrals (in any valid state)
- [ ] Create Transfers (depoit / withdraw / giftcard)
- [ ] LaunchDarkly connection (toggle flags, toggle flags for user)
- [ ] Pinwheel (see their set up payrolls)
- [ ] Lithic (see users cards / transactions / apply for card / etc.)
- [ ] Papaya (read only -> see bill payments)
- [ ] Auth (Google / Github)
- [ ] Finish User Creation Flow
- [ ] Services / Repos Section
- [ ] Transfer Processing Flow
- [ ] UI Polish
- [ ] Darkmode
- [ ] Multiple Envs (Staging (Default) / Dev (custom NGROK Url))
