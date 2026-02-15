# Shopkeeper Helper - Complete Inventory & Profit Management System

A modern, full-stack shopkeeping platform designed for tracking inventory with big packet (box) containing small packets, wholesale purchases, pricing, profit insights, analytics, and export-ready reports.

## 🎯 Key Features

### 📦 Advanced Inventory Management
- **Packet-Based System**: Track items as big packets (boxes) containing small packets
- **Configurable Units**: Set number of small packets per box for each item
- **Dual Pricing**: Set selling price per small packet, automatically calculate price per box
- **Stock Tracking**: Monitor stock levels with automatic updates on purchases
- **Low Stock Alerts**: Get notified when items need restocking (≤5 boxes)
- **Full CRUD**: Add, edit, delete items with complete data management
- **Search & Filter**: Find items by name, SKU, or category

### 🛒 Purchase Tracking
- **Comprehensive Records**: Log all purchases with date, quantity, and total cost
- **Auto-Calculations**: 
  - Cost per box automatically calculated
  - Selling price per box based on small packet price
  - Profit per box computed in real-time
  - Profit margin percentage tracked
- **Time-Based Filtering**: View purchases by week, month, year, or custom date range
- **Item-Specific Reports**: Filter purchases by specific items
- **Edit & Delete**: Full control over purchase history
- **Purchase Notes**: Add optional notes for each purchase

### 💰 Selling Price Management
- **Price Per Small Packet**: Set and update prices at the smallest unit level
- **Historical Tracking**: Complete price change history with timestamps
- **Price Change Notes**: Document reasons for price updates
- **Real-Time Impact**: See immediate effect on profit margins
- **Auto-Updates**: All purchases automatically use current selling prices

### 📊 Advanced Analytics Dashboard
- **Time Period Selection**: Week, Month, 6 Months, or Year views
- **Item-Specific Analytics**: Focus on individual items or view all
- **Key Metrics**:
  - Total items count
  - Purchase value
  - Stock value
  - Estimated profit
  - Low stock alerts
- **Visual Trends**:
  - Purchase trends over time
  - Profit margin trends
  - Top performing items by margin
- **Detailed Tables**: Purchase breakdown by period with costs and profits

### 📄 Comprehensive PDF Reports
- **Profit Margin Report**: Complete overview of costs, prices, margins, and profitability
- **Inventory Report**: Stock levels, values, and item details
- **Purchase History Report**: Detailed purchase records with profit calculations
- **Customizable Filters**:
  - Filter by specific items
  - Select date ranges (for purchase reports)
  - Professional PDF formatting
  - Timestamped generation

### 🎨 Modern UI/UX
- **Mobile-First Design**: Fully responsive across all devices
- **Dark Theme**: Eye-friendly dark interface
- **Smooth Animations**: Framer Motion transitions
- **Interactive Charts**: Recharts visualization
- **Intuitive Navigation**: Easy-to-use sidebar and mobile menu
- **Real-Time Feedback**: Loading states and error handling

## 📋 Tech Stack

- **Framework**: Next.js 16 (App Router, React Server Components)
- **Language**: JavaScript
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State Management**: Zustand
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **PDF Generation**: jsPDF
- **Validation**: Joi

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 07-Shopeler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Setting Up Your Inventory

1. **Add Items**
   - Go to Inventory page
   - Click "Add New Item"
   - Enter item details:
     - Name (e.g., "Organic Rice")
     - Category (e.g., "Groceries")
     - Small Packets Per Box (e.g., 12)
     - Selling Price Per Small Packet (e.g., $2.50)
     - Initial Stock (in boxes)
   - SKU is automatically generated

2. **Recording Purchases**
   - Go to Purchases page
   - Click "Add New Purchase"
   - Select item, enter quantity (boxes) and total cost
   - System automatically calculates:
     - Cost per box
     - Selling price per box
     - Profit per box
     - Profit margin percentage
   - Stock is automatically updated

3. **Updating Selling Prices**
   - Go to Selling Price page
   - Select item and enter new price per small packet
   - Add optional notes explaining the change
   - Price history is automatically tracked
   - All future profit calculations use the new price

4. **Viewing Analytics**
   - Dashboard shows overview metrics
   - Select time period (week/month/6 months/year)
   - Filter by specific items
   - View trends and top performers

5. **Generating Reports**
   - Go to Reports page
   - Choose report type:
     - Profit Margin Report
     - Inventory Report
     - Purchase History Report
   - Apply filters (item, date range)
   - Download professional PDF

## 🔑 Key Routes

### Public Routes
- `/` - Landing page
- `/auth/login` - User login
- `/auth/register` - User registration

### Protected Routes (Dashboard)
- `/dashboard` - Analytics overview
- `/dashboard/inventory` - Inventory management
- `/dashboard/purchases` - Purchase tracking
- `/dashboard/selling-price` - Price management
- `/dashboard/reports` - Report generation
- `/dashboard/settings` - User settings

### API Routes
- `/api/auth/*` - Authentication endpoints
- `/api/items` - Item CRUD operations
- `/api/items/[id]` - Single item operations
- `/api/purchases` - Purchase CRUD operations
- `/api/purchases/[id]` - Single purchase operations
- `/api/price-history` - Price history tracking
- `/api/analytics` - Dashboard analytics
- `/api/reports` - Report data generation

## 🏗️ Project Structure

```
07-Shopeler/
├── app/
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   ├── layout.js         # Root layout
│   └── page.js           # Landing page
├── components/           # Reusable components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── models/               # MongoDB models
├── store/                # Zustand stores
├── utils/                # Helper functions
└── public/               # Static assets
```

## 🔐 Authentication

The app uses JWT-based authentication with:
- Access tokens (short-lived, stored in HTTP-only cookies)
- Refresh tokens (long-lived, for token renewal)
- Password hashing with bcrypt
- Protected routes via middleware

## 📊 Data Models

### Item
- Name, category, description, SKU
- Stock level (in big packets/boxes)
- Small packets per box
- Selling price per small packet
- Unit of measurement

### Purchase
- Item reference
- Quantity (big packets purchased)
- Total cost and per-item cost
- Snapshots of pricing at purchase time
- Calculated profit and margin
- Date and optional notes

### SellingPriceHistory
- Item reference
- Price per small packet
- Effective date
- Optional notes

## 🎨 Customization

- Colors and themes in `tailwind.config.mjs`
- API configurations in respective route files
- Validation schemas in `lib/validation.js`

## 📝 Notes

- All monetary calculations are done server-side for accuracy
- Price history is immutable once created
- Purchase records snapshot pricing at time of purchase
- Stock levels are automatically managed on purchase add/edit/delete
- Low stock threshold is set at 5 boxes

## 🤝 Contributing

Feel free to submit issues or pull requests for improvements!

## 📄 License

This project is open source and available under the MIT License.
