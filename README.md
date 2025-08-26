# TanStack Start Demo

A modern, full-stack React application showcasing the power and benefits of TanStack Start. This project serves as both a comprehensive demo and a template for building type-safe, server-rendered React applications.


## Tech Stack

This project integrates with tools developers know and love:

- **[TanStack Start](https://tanstack.com/start)** - Full-stack React framework with SSR and type-safe APIs
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization for React
- **[Supabase](https://supabase.com)** - PostgreSQL database
- **[Better Auth](https://www.better-auth.com)** - Secure, type-safe authentication
- **[Base UI](https://base-ui.com)** - Accessible component primitives
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Drizzle ORM](https://orm.drizzle.team)** - Type-safe SQL toolkit
- **[TypeScript](https://www.typescriptlang.org)** - Type safety throughout the stack

## Features

- 🔐 **Authentication** - Secure user authentication with Better Auth
- 📝 **Post Management** - Create, view, and manage feedback posts
- 💬 **Comments** - Comment on feedback posts
- 👍 **Upvoting** - Community-driven content curation
- 🏆 **Leaderboard** - Gamified user engagement tracking
- 🎨 **Modern UI** - Beautiful, accessible interface with Base UI and Tailwind
- 🔒 **Type-Safe** - End-to-end type safety from database to UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (Supabase recommended)
- Package manager (npm, yarn, pnpm, or bun)

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd tanstack-demo
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL=your_database_url
DATABASE_SESSION_POOLER=your_supabase_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_URL=http://localhost:5173

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Database Setup

1. Run database migrations:
```bash
npm run db:push
```

2. (Optional) Seed the database with sample data:
```bash
npm run db:seed
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio for database management
- `npm run db:seed` - Seed database with sample data

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic builds on push


## Project Structure

```
src/
├── actions/           # Server actions and API functions
├── app/              # File-based routing structure
│   ├── __root.tsx    # Root layout component
│   ├── index/        # Home page route
│   └── post/         # Post detail routes
├── components/       # Reusable UI components
│   ├── ui/          # Base UI component implementations
│   └── icons/       # SVG icon components
├── utils/           # Utility functions and configurations
│   ├── auth/        # Authentication utilities
│   ├── db/          # Database schema and utilities
│   └── cn/          # Class name utilities
└── globals.css      # Global styles and theme tokens
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Learn More

- [TanStack Start Documentation](https://tanstack.com/start/latest)
- [TanStack Query Guide](https://tanstack.com/query/latest)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Base UI Components](https://base-ui.netlify.app/react)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
