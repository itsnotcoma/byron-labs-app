# Incident Management Web App

This is a simple Cybersecurity Incident Reporting Web app, code test for [Byron Labs](https://github.com/ByronLabs).

The task is to create a simple web app that allows users to report cybersecurity incidents, integrating with a [FastAPI backend](https://github.com/itsnotcoma/byron-labs-api).

## Overview

This project is Next.js web app that allows users to report cybersecurity incidents. It provides a seamless user experience with a FastAPI API and a authentication system.

## Installation


> The app uses a simple API. You should see first how to set up the [FastAPI backend](https://github.com/itsnotcoma/byron-labs-api/blob/main/README.md) to ensure the app works correctly.


First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, run the development server:

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

## Configuration

The app uses a `.env` file to configure some basic settings. You can copy the `.env.example` file to `.env` and modify the values as needed.

```env
AUTH_SECRET=secret same as the FastAPI backend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---
Node: v20.11.1
