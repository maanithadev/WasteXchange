# WasteXchange - Intelligent Waste Classification and Recommendation System for Industrial Waste Exchange 🌱

WasteXchange - Intelligent Waste Classification and Recommendation System is a comprehensive, full-stack MERN application designed to facilitate the trading of recyclable and reusable waste materials. It connects waste sellers with buyers, promoting a circular economy while tracking carbon footprints to ensure environmentally sustainable practices. 

The application features a dual-portal architecture with dedicated frontend and backend services for both **Users** (Buyers/Sellers) and **Administrators**.

## ✨ Key Features

### User Portal (Buyers & Sellers)
- **Waste Marketplace**: Seamlessly list waste materials for sale or browse available listings to purchase.
- **Real-Time Chat**: Integrated messaging system using Socket.io allows buyers and sellers to negotiate and communicate instantly.
- **Carbon Footprint Tracking**: Calculates and tracks carbon emissions and emission factors to measure environmental impact.
- **Secure Transactions**: Secure payment gateway integration (CyberSource) to handle transactions safely.
- **AI Integration**: Powered by Google GenAI to provide smart assistance and enhance user experience.
- **PDF Generation**: Automated generation of invoices and reports using Puppeteer.

### Admin Portal
- **Dashboard & Analytics**: Comprehensive visualization of platform metrics using Recharts.
- **User Management**: Monitor and manage user accounts, listings, and platform activities.
- **Announcements**: Broadcast important updates to all users on the platform.
- **Contact Management**: Handle user inquiries and support tickets.

## 🛠️ Tech Stack

**Frontend (Users & Admins)**
- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **State/Forms**: React Hook Form
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **API Client**: Axios
- **Real-Time**: Socket.io-client

**Backend (Users & Admins)**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens), Bcrypt.js
- **Real-Time**: Socket.io
- **AI Services**: Google GenAI SDK
- **File Handling**: Multer
- **PDF Generation**: Puppeteer
- **Security**: Helmet, Express Rate Limit, CORS

## 📂 Project Structure

```text
📦 Top Up Waste Management System
├── 📂 backend
│   ├── 📂 Admins       # Express server for Admin operations
│   └── 📂 Users        # Express server for User operations (Marketplace, Chat, etc.)
└── 📂 frontend
    ├── 📂 Admins       # React (Vite) application for the Admin dashboard
    └── 📂 Users        # React (Vite) application for the User marketplace
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Top Up Waste Management System/3_current_editing_prototype"
   ```

2. **Setup User Backend**
   ```bash
   cd backend/Users
   npm install
   ```
   Create a `.env` file based on `.env.example` and add your MongoDB URI, JWT Secret, Google Gemini API Key, etc.

3. **Setup Admin Backend**
   ```bash
   cd ../Admins
   npm install
   ```
   Create a `.env` file based on `.env.example` and configure the environment variables.

4. **Setup User Frontend**
   ```bash
   cd ../../frontend/Users
   npm install
   ```
   Create a `.env` file and set the `VITE_API_URL` to point to your User backend.

5. **Setup Admin Frontend**
   ```bash
   cd ../Admins
   npm install
   ```
   Create a `.env` file and set the `VITE_API_URL` to point to your Admin backend.

### Running the Application

You will need to run the development servers for all four parts of the application. Open four separate terminal windows:

**1. Start User Backend**
```bash
cd backend/Users
npm run dev
```

**2. Start Admin Backend**
```bash
cd backend/Admins
npm run dev
```

**3. Start User Frontend**
```bash
cd frontend/Users
npm run dev
```

**4. Start Admin Frontend**
```bash
cd frontend/Admins
npm run dev
```

## 🔒 Environment Variables

Ensure you create `.env` files in each of the four directories (`backend/Users`, `backend/Admins`, `frontend/Users`, `frontend/Admins`). 

**Important Rules (per project guidelines):**
- Every URL or connection path must live in a `.env` file.
- Never hardcode connection strings or ports.
- Keep variables scoped to their specific folder (e.g., frontend variables stay in the frontend).
- Only backend-safe secrets (API keys, DB credentials) belong in `backend/.env`.
