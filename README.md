# Pocket Justice - Base Mini App

Your rights, right in your pocket. A mobile-first legal rights assistance app built on Base.

## Features

- **State-Specific Legal Scripts**: Get tailored legal guidance based on your location
- **Emergency Recording & Alerts**: One-tap recording with automatic trusted contact notifications
- **Shareable Rights Cards**: Create and share legal rights information
- **AI-Powered Content**: Dynamic legal script generation using OpenAI
- **Base Integration**: Built as a Base Mini App with OnchainKit

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit & MiniKit)
- **Styling**: Tailwind CSS with custom design system
- **AI**: OpenAI/OpenRouter for content generation
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd pocket-justice
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY` or `OPENROUTER_API_KEY`: For AI content generation

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

## Core Components

### Legal Scripts
- State-specific legal guidance
- AI-generated content with fallbacks
- Common scenarios: traffic stops, questioning, searches

### Emergency Features
- One-tap recording activation
- Automatic trusted contact alerts
- Discreet operation for safety

### Rights Cards
- Create shareable legal rights content
- Social media optimized
- Community education focus

## Base Mini App Integration

This app is built as a Base Mini App using:
- **MiniKitProvider**: Handles all Web3 configuration
- **OnchainKit Components**: Wallet connection and identity
- **Base Chain**: Native Base blockchain integration

## API Integration

- **OpenAI/OpenRouter**: Dynamic legal content generation
- **Geolocation**: State detection for relevant laws
- **Web Share API**: Native sharing capabilities

## Design System

Custom design system with:
- Mobile-first responsive design
- Dark gradient theme (blue to purple)
- Glass morphism effects
- Accessible color contrast
- Consistent spacing and typography

## Development

### File Structure
```
app/                 # Next.js App Router
├── layout.tsx      # Root layout with providers
├── page.tsx        # Main application
├── providers.tsx   # MiniKit provider setup
└── globals.css     # Global styles

components/
├── ui/             # Reusable UI components
├── features/       # Feature-specific components
└── layout/         # Layout components

lib/
├── types.ts        # TypeScript definitions
├── constants.ts    # App constants
├── utils.ts        # Utility functions
└── openai.ts       # AI integration
```

### Key Technologies
- **Next.js 15**: Latest App Router features
- **MiniKitProvider**: Simplified Base integration
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon system

## Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (recommended)
   ```bash
   vercel deploy
   ```

3. **Environment Variables**
   Set all required environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.

---

**Pocket Justice** - Empowering citizens with accessible legal rights information and emergency response tools.
