# WebUtils - Next.js Developer Tools Collection

A modern, privacy-first collection of 1000+ web development tools built with Next.js 16, React 19, and Material UI 9.

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![Material UI](https://img.shields.io/badge/MUI-9.1.1-007FFF)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## 🎉 Day 1 Progress: 31 Tools Completed!

### ✨ Features

- **Privacy-First**: All processing happens client-side, no data ever leaves your browser
- **Modern Stack**: Next.js 16.2.9, React 19, Material UI 9, TypeScript
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Fast Performance**: Turbopack for lightning-fast builds
- **Progressive Enhancement**: Tools work even without JavaScript
- **URL State**: Share your work via shareable URLs
- **Offline Ready**: Coming soon - PWA support

## 🛠️ Available Tools (31/1000+)

### Developer Tools (14)
- JSON Formatter & Validator
- Base64 Encoder/Decoder
- URL Encoder/Decoder
- Hash Generator (SHA-1, SHA-256, SHA-512)
- UUID Generator (v4, v7, NanoID)
- Color Converter (HEX/RGB/HSL)
- Timestamp Converter
- Regex Tester
- CSS Formatter/Minifier
- SQL Formatter/Minifier
- Markdown Preview
- HTML Entity Encoder/Decoder
- Number Base Converter
- IP Subnet Calculator

### Text Tools (10)
- Lorem Ipsum Generator
- Word Counter
- Text Diff/Compare
- Case Converter
- String Escaper/Unescaper
- Text Sorter
- Text Replacer
- Text to Speech
- Slug Generator
- Duplicate Line Remover

### Generators (3)
- Password Generator
- Random Number Generator
- QR Code Generator

### Converters (4)
- File Size Converter
- Percentage Calculator
- Temperature Converter
- Time Converter

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd webutils-nextjs

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
webutils-nextjs/
├── app/                      # Next.js App Router
│   ├── tools/               # Tool pages
│   │   ├── dev/            # Developer tools
│   │   ├── text/           # Text tools
│   │   ├── generator/      # Generator tools
│   │   └── converter/      # Converter tools
│   ├── coming-soon/        # Coming soon page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/              # Reusable components
│   ├── tools/              # Tool-specific components
│   │   ├── ToolWrapper.tsx # Universal tool wrapper
│   │   └── ToolCard.tsx    # Tool card with status
│   ├── Header.tsx          # App header
│   ├── Footer.tsx          # App footer
│   └── ThemeProvider.tsx   # Theme management
├── lib/                     # Utilities
│   ├── utils/              # Helper functions
│   │   ├── clipboard.ts    # Copy/paste operations
│   │   ├── urlState.ts     # URL state management
│   │   └── storage.ts      # LocalStorage wrapper
│   └── theme.ts            # MUI theme configuration
├── types/                   # TypeScript types
└── public/                  # Static assets
```

## 🏗️ Architecture

### Tool Development Pattern

Each tool follows a consistent pattern:

```typescript
'use client';

import ToolWrapper from '@/components/tools/ToolWrapper';

export default function MyToolPage() {
  return (
    <ToolWrapper
      title="Tool Name"
      description="Tool description"
      category="dev"
      categoryName="Developer Tools"
      onCopy={handleCopy}
      onPaste={handlePaste}
      onClear={handleClear}
    >
      {/* Your tool UI here */}
    </ToolWrapper>
  );
}
```

### Adding New Tools

1. Create tool file: `app/tools/[category]/[tool-name]/page.tsx`
2. Add to completed arrays in:
   - `components/tools/ToolCard.tsx`
   - `app/tools/[...slug]/page.tsx`

## 🎨 Tech Stack

- **Framework**: Next.js 16.2.9 (App Router, Turbopack)
- **UI Library**: Material UI 9.1.1
- **Language**: TypeScript 5.x
- **Runtime**: React 19.2.4
- **Icons**: Material Icons
- **Styling**: Emotion (CSS-in-JS)

## 📊 Migration Progress

- **Day 1**: 31/31 tools ✅
- **Days 2-30**: 975+ tools remaining
- **Total Goal**: 1000+ tools in 30 days

## 🔐 Privacy & Security

- All processing happens in your browser
- No data is sent to external servers
- No analytics or tracking
- Open source and transparent

## 📝 License

MIT License - feel free to use this project for any purpose.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🚧 Roadmap

- [ ] Add syntax highlighting for code tools
- [ ] Implement PWA features (offline support)
- [ ] Add more tools (970+ remaining)
- [ ] Add tool favorites/bookmarks
- [ ] Add tool history
- [ ] Add export/import settings

## 📮 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js 16 and Material UI 9**
