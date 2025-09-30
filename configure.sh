#!/bin/bash

# ============================================
# STEP 2: CONFIGURE NEALY'S PROJECT
# ============================================
# Run this AFTER Next.js is initialized

set -e  # Exit on error

echo "🌸 Step 2: Configuring Nealy's Event Decor Project..."
echo ""

# ============================================
# 1. Install Additional Dependencies
# ============================================
echo "📦 Installing additional dependencies..."
npm install framer-motion lottie-react clsx tailwind-merge class-variance-authority

echo "✅ Dependencies installed"

# ============================================
# 2. Create Project Folder Structure
# ============================================
echo ""
echo "📁 Creating project structure..."

# Components
mkdir -p components/entrance
mkdir -p components/layout
mkdir -p components/home
mkdir -p components/gallery
mkdir -p components/services
mkdir -p components/about
mkdir -p components/contact
mkdir -p components/ui

# App routes
mkdir -p app/entrance
mkdir -p app/gallery
mkdir -p app/services
mkdir -p app/about
mkdir -p app/contact

# Public assets
mkdir -p public/images/logo
mkdir -p public/images/gallery
mkdir -p public/images/about
mkdir -p public/animations

# Lib
mkdir -p lib

# Styles
mkdir -p styles

echo "✅ Folder structure created"

# ============================================
# 3. Create Utility Files
# ============================================
echo ""
echo "📝 Creating utility files..."

# Create lib/utils.ts
cat > lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF

# Create lib/constants.ts
cat > lib/constants.ts << 'EOF'
export const COLORS = {
  signature: {
    gold: '#D4AF37',
  },
  pearl: {
    white: '#F8F6F0',
    light: '#FAFAFA',
  },
  charcoal: {
    black: '#1A1A1A',
  },
  meadow: {
    sage: '#9CAF88',
    lavender: '#B19CD9',
  },
  forest: {
    green: '#2C3E28',
    emerald: '#014421',
  },
  light: {
    red: '#F6C6CD',
  },
  wine: {
    burgundy: '#4A1C28',
  },
  warm: {
    terracotta: '#D2691E',
    eggshell: '#F0EAD6',
  },
} as const;

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const;
EOF

# Create styles/animations.css
cat > styles/animations.css << 'EOF'
/* Custom animations for Nealy's Event Decor */

@keyframes flower-grow {
  0% {
    transform: scaleY(0);
    transform-origin: bottom;
  }
  100% {
    transform: scaleY(1);
    transform-origin: bottom;
  }
}

@keyframes petal-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-100px) rotate(180deg);
    opacity: 0.3;
  }
}

@keyframes logo-shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Utility classes */
.animate-flower-grow {
  animation: flower-grow 2s ease-out forwards;
}

.animate-petal-float {
  animation: petal-float 8s ease-in-out infinite;
}

.animate-logo-shimmer {
  animation: logo-shimmer 1.5s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
EOF

echo "✅ Utility files created"

# ============================================
# 4. Update Tailwind Config
# ============================================
echo ""
echo "⚙️  Updating Tailwind configuration..."

cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Luxury Colors
        signature: {
          gold: '#D4AF37',
        },
        pearl: {
          white: '#F8F6F0',
          light: '#FAFAFA',
        },
        charcoal: {
          black: '#1A1A1A',
        },
        
        // Natural Meadow Accents
        meadow: {
          sage: '#9CAF88',
          lavender: '#B19CD9',
        },
        forest: {
          green: '#2C3E28',
          emerald: '#014421',
        },
        
        // Romantic Statements
        light: {
          red: '#F6C6CD',
        },
        wine: {
          burgundy: '#4A1C28',
        },
        
        // Warm Neutrals
        warm: {
          terracotta: '#D2691E',
          eggshell: '#F0EAD6',
        },
      },
      
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      
      animation: {
        'flower-grow': 'grow 2s ease-out forwards',
        'petal-float': 'float 8s ease-in-out infinite',
        'logo-shimmer': 'shimmer 1.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      
      keyframes: {
        grow: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.8' },
          '50%': { transform: 'translateY(-100px) rotate(180deg)', opacity: '0.3' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
EOF

echo "✅ Tailwind config updated with Nealy's color system"

# ============================================
# 5. Update README
# ============================================
echo ""
echo "📝 Creating README..."

cat > README.md << 'EOF'
# 🌸 Nealy's Event Decor

Premium event decor and custom fabrication website built with Next.js 15.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + Lottie
- **Deployment**: Vercel

## 🎨 Brand Colors

- **Signature Gold**: #D4AF37
- **Pearl White**: #F8F6F0
- **Meadow Sage**: #9CAF88
- **Forest Green**: #2C3E28
- **Wine Burgundy**: #4A1C28
- [See full palette in tailwind.config.ts]

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

Automatically deploys to Vercel on push to `main` branch.

## 👥 Team

Built by Sproutflow Studio for Nealy's Event Decor LLC.
EOF

echo "✅ README created"

# ============================================
# 6. Git Commit
# ============================================
echo ""
echo "📝 Creating git commit..."

git add .
git commit -m "feat: configure Nealy's brand system and project structure

- Added custom color palette (12 colors)
- Configured Tailwind with brand colors and animations
- Set up project folder structure
- Installed Framer Motion and Lottie dependencies
- Created utility functions and constants
- Professional setup complete"

echo "✅ Commit created"

# ============================================
# 7. Push to GitHub
# ============================================
echo ""
echo "🚀 Pushing to GitHub..."

git push origin main

echo ""
echo "✅ Pushed successfully!"

# ============================================
# Final Instructions
# ============================================
echo ""
echo "============================================"
echo "🎉 PROJECT CONFIGURATION COMPLETE!"
echo "============================================"
echo ""
echo "✅ Dependencies installed"
echo "✅ Folder structure created"
echo "✅ Nealy's color system configured"
echo "✅ Utilities and constants ready"
echo "✅ Committed and pushed to GitHub"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Start development server:"
echo "   npm run dev"
echo ""
echo "2. View at:"
echo "   http://localhost:3000"
echo ""
echo "3. Connect to Vercel for auto-deploy"
echo ""
echo "🌸 Ready to build components!"
echo ""
