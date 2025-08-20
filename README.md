# 🎶 SyncStream

A **real-time collaborative music room application** built with **Next.js, TypeScript, Prisma, PostgreSQL, and WebSockets**. Users can join rooms with codes, play songs, vote, create polls, and chat — all powered by live updates.

## 🚀 Features

* 🎵 **Music Rooms**: Join rooms with unique codes and sync playback
* ⚡ **Real-time Updates**: Live voting, polls with charts, and chat via WebSockets
* 👥 **Role-based Access**: Hosts can manage polls, kick/ban users; bans enforced at the server level
* 💾 **Persistent Data**: Room state (votes, polls, chats, bans, history) stored in PostgreSQL
* 🌐 **SEO & Performance Optimized**: Next.js server components + Tailwind for fast, responsive UI

## 🛠️ Tech Stack

* **Frontend**: Next.js, TypeScript, Tailwind CSS
* **Backend**: Node.js, Express, Prisma ORM, WebSockets/Socket.IO
* **Database**: PostgreSQL (NeonDB)
* **Auth**: NextAuth.js (Google OAuth)

## 📂 Project Structure

```
syncstream/
├── prisma/             # Prisma schema and migrations
│   └── schema.prisma
├── public/             # Public assets (images, static files)
├── src/
│   ├── app/            # Next.js app router
│   ├── assets/         # Static assets (icons, images)
│   ├── axiosInstance/  # Axios configuration
│   ├── components/     # Reusable UI components
│   ├── context/        # React contexts (Auth, Theme, etc.)
│   ├── helpers/        # Utility/helper functions
│   ├── lib/            # Core logic & utilities
│   ├── providers/      # Providers (theme, session, etc.)
│   ├── public/         # Publicly available assets within src
│   ├── types/          # TypeScript type definitions
│   │   └── allTypes.ts
│   ├── index.ts        # Entry point
│   ├── middleware.ts   # Next.js middleware
│   └── strea/          # (Stream-related module, check naming)
├── .env                # Environment variables
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## ⚙️ Setup

```bash
# 1) Clone the repository
git clone https://github.com/JagdishSuthar1/syncstream.git
cd syncstream

# 2) Install dependencies
npm install
# or
yarn install

# 3) Create .env with the required values (paste & save)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
NEXT_PUBLIC_WEBSOCKET_URL="wss://your-websocket-server-url"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# 4) Prisma: run migrations & generate client
npx prisma migrate dev
npx prisma generate
```

## ▶️ Running Locally

```bash
npm run dev   # or: yarn dev
# App URL:
# http://localhost:3000
```

## 🚀 Deployment

* **Frontend + API**: Vercel
* **Database**: NeonDB  
* **WebSockets**: Railway

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

- GitHub: [@JagdishSuthar1](https://github.com/JagdishSuthar1)
- Project Link: [https://github.com/JagdishSuthar1/syncstream](https://github.com/JagdishSuthar1/syncstream)