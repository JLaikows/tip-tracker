This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Project is automatically deployed on ever push to Main. Ensure all code going to main is prod ready before pushing.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Good Code Etiquette

- When ignoring ESLint, only disable for that line, not the full page. Leave a second comment above it explainging why the rule is being ignored.

# TODO

<s>Strikethrough</s> - completed || **Bold** - Being worked on

- <s>Convert prisma Types to T\* for consistent naming convention</s>
- <s>update navbar to seperate component so it updates when logging in and logging out</s>
- <s>Add password for logging in and out</s>
- <s>update payout lists to be sent as an object with keys instead of an array</s>
- Create middleware for api for sessions
- Move "add" api calls from components into store hooks
- Add loading animation to all components using async calls
- Add edit functions to payouts and clients
- update User to have home state
- Removed Owed from payout
- Only include needed columns in api responses
- combine payout and unpaid-payout into one form
- Add Full info to clients
- add full info to user
- update sessions to use redis instead of postgres
- update styling for better desktop experience
