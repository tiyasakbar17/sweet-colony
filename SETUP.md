# Pre-Order Hub - Local Development Setup

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

## Quick Start Guide

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The `.env` file has already been created with default values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
```

**Note:** The app uses **in-memory storage** exclusively. All orders are stored in memory and will be reset when the server restarts. No database is required or supported.

### 3. Run the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

## Project Structure

```
Pre-Order-Hub/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── pages/       # Page components
│   │   │   ├── Landing.tsx        # Landing page with logo
│   │   │   ├── Welcome.tsx        # Welcome page with social icons
│   │   │   ├── MenuDisplay.tsx    # View-only menu display
│   │   │   ├── Menu.tsx           # Pre-order page (ordering)
│   │   │   ├── Cart.tsx           # Shopping cart
│   │   │   ├── Checkout.tsx       # Checkout page
│   │   │   └── Success.tsx        # Order success page
│   │   ├── components/  # Reusable components
│   │   └── hooks/       # Custom React hooks
├── server/              # Backend Express server
│   ├── index.ts        # Server entry point
│   ├── routes.ts       # API routes
│   ├── storage.ts      # In-memory storage
│   └── db.ts           # Database configuration (optional)
├── shared/             # Shared code between client and server
└── .env                # Environment variables
```

## Navigation Flow

1. **Landing Page** (`/`) - Initial page with Sweet Colony logo
2. **Welcome Page** (`/welcome`) - Shows date, school name, and social media icons
   - **Menu** button → View-only menu display
   - **Pre-order** button → Pre-order page (ordering)
3. **Menu Display** (`/menu-display`) - View-only menu with blackboard design
4. **Menu/Pre-Order** (`/menu`) - Full ordering functionality
5. **Cart** (`/cart`) - Shopping cart
6. **Checkout** (`/checkout`) - Customer information and payment
7. **Success** (`/success`) - Order confirmation

## Features

- 🍦 **Ice Cream Selection** - Vanilla Cloud, Choco Blast
- 🍟 **Fries Selection** - Golden Fries, Curly Twist
- 🎨 **Size Options** - Different sizes with price adjustments
- 🧂 **Add-ons** - Toppings and seasonings
- 🛒 **Shopping Cart** - Add, remove, and modify quantities
- 📱 **Mobile-First Design** - Optimized for mobile devices
- 💾 **In-Memory Storage** - No database required

## Troubleshooting

### Port Already in Use

If port 5000 is already in use, you can change it in the `.env` file:

```env
PORT=3000
```

### Module Not Found Errors

Make sure all dependencies are installed:

```bash
npm install
```

### Windows Compatibility Issues

The app has been configured to work on Windows:
- Removed `NODE_ENV` from package.json scripts
- Fixed server binding issues (`reusePort` removed)
- Using `dotenv` for environment variable loading

## Building for Production

```bash
npm run build
npm start
```

## Additional Commands

- **Type Checking:** `npm run check`

## Support

For issues or questions, please check:
- Make sure Node.js v18+ is installed
- All dependencies are installed (`npm install`)
- Port 5000 is available (or change in `.env`)
- `.env` file exists in the root directory

## Event Information

**Date:** 24 Februari 2026  
**Location:** SMAK 6 Penabur  
**Brand:** Sweet Colony - Where Crunch meets Creamy

Connect with us:
- 📸 Instagram: @sweetcolony
- 💬 WhatsApp: +62 812-3456-7890
