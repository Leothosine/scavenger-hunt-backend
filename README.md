# Scavenger Hunt — Backend

A StarkNet-powered scavenger hunt game backend built with **NestJS** and **TypeScript**. This service handles all off-chain game logic including authentication, puzzle management, player progress, daily challenges, seasons, trivia, NFT rewards, referrals, and real-time event announcements.

## Tech Stack

- **Framework:** NestJS (TypeScript)
- **Auth:** JWT + Wallet-based authentication
- **Blockchain:** StarkNet address validation & wallet integration
- **Real-time:** WebSocket gateway for live event announcements
- **Testing:** Jest (unit & e2e)

## Modules

| Module | Description |
|--------|-------------|
| `auth` | JWT auth, wallet auth, crypto, email & wallet services |
| `user` | User management and profiles |
| `daily-challenge` | Daily challenges with auto-rotation scheduler |
| `puzzle-unlock` | Puzzle unlock logic and requirements |
| `puzzle-timers` | Timer tracking per puzzle |
| `puzzle-difficulty-stats` | Aggregated difficulty statistics |
| `progress` | Player progress tracking |
| `seasons` | Game season management |
| `game-theme` | Theming per game/season |
| `claim-history` | Reward claim history and status |
| `referral-code` | Referral code generation and tracking |
| `contribution` | Open-source contribution tracking |
| `bookmark` | User bookmark management |
| `reviews` | User-submitted reviews |
| `departments` | Department/team management |
| `starknet-news` | StarkNet ecosystem news feed |
| `starknet-quiz` | In-app StarkNet quizzes |
| `trivia` | Trivia questions and answers |
| `event-announcements` | Real-time announcements with templates & analytics |
| `error-report` | In-app error reporting |
| `validators` | StarkNet address validation |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` and fill in the required values:

```bash
cp .env.example .env.development
```

### Running the App

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run start:prod
```

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Project Structure

```
src/
├── auth/                    # Authentication (JWT, wallet, email)
├── user/                    # User management
├── daily-challenge/         # Daily challenges + rotation scheduler
├── puzzle-unlock/           # Puzzle unlock logic
├── puzzle-timers/           # Per-puzzle timers
├── puzzle-difficulty-stats/ # Difficulty statistics
├── progress/                # Player progress
├── seasons/                 # Season management
├── game-theme/              # Game themes
├── claim-history/           # Reward claims
├── referral-code/           # Referral system
├── contribution/            # Contribution tracking
├── bookmark/                # User bookmarks
├── reviews/                 # Reviews
├── departments/             # Departments
├── starknet-news/           # StarkNet news
├── starknet-quiz/           # StarkNet quizzes
├── trivia/                  # Trivia
├── event-announcements/     # Real-time event announcements
├── error-report/            # Error reporting
└── validators/              # StarkNet address validation
```

## Related Repositories

- [scavenger-hunt-frontend](https://github.com/LadderMine/scavenger-hunt-frontend) — Next.js web interface
- [scavenger-hunt-contract](https://github.com/LadderMine/scavenger-hunt-contract) — Cairo smart contracts on StarkNet

## License

MIT