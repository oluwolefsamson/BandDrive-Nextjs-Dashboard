# Mini Business Intelligence (BI) Tool

## 🚀 Project Overview

The Mini Business Intelligence (BI) Tool is a responsive and user-friendly dashboard that provides insightful business metrics through interactive charts and data tables. It includes user authentication, protected routes, and real-time data visualization.

## Features

### ✅ User Authentication

- Secure **Login & Registration** with email and password.
- "Keep me logged in" functionality.
- Protected routes ensuring only authenticated users can access the dashboard.

### ✅ Dashboard

- **Metrics Summary**: Displays key business indicators such as:
  - **Total Users**
  - **Active Sessions**
  - **Sales Revenue**
- **Charts (Data Visualization)**:
  - 📈 **Line Chart** → Sales trends
  - 📊 **Bar Chart** → User growth
  - 🥧 **Pie/Donut Chart** → Category distribution
- **Data Table**: Sortable and filterable sample user/sales data.

-**THEME**: TO CHANGE THE THEME, NAVIGATE TO THE SETTING SECTION AT THE SIDEBAR, CLICK GENERAL AT THE DROPDOWN, GO TO THE APPEARANCE CARD AND TOGGLE THE BUTTON TO CHANGE THEME

### ✅ Security & Session Management

- **Session persistence** for users who choose to stay logged in.

## 🛠️ Technologies Used

### **Frontend**

- **Next.js** → Server-side rendering and routing
- **Tailwind CSS** → Modern styling
- **MUI (Material UI)** → UI components
- **Recharts/Chart.js/ApexCharts** → Data visualization
- **React Context API** → State management

### **API & Mocking**

- **Mock Service Worker (MSW)** → Simulated API calls

### **Deployment**

- **Frontend Hosted on**: [Vercel](https://band-drive-nextjs-dashboard-sdmm.vercel.app/)
- **Source Code Hosted on**: [GitHub](https://github.com/oluwolefsamson/BandDrive-Nextjs-Dashboard)

## 📌 Setup Instructions

### **1️⃣ Clone the Repository**

```sh
 git clone https://github.com/oluwolefsamson/BandDrive-Nextjs-Dashboard
 cd your-repo
```

### **2️⃣ Install Dependencies**

```sh
 pnpm install  # If using pnpm
```

### **3️⃣ Start the Development Server**

```sh
 pnpm run dev
```

- Open `http://localhost:3000` in your browser.

### **4️⃣ Environment Variables**

Create a `.env.local` file and configure your API keys (if needed):

```sh
NEXTAUTH_SECRET= your secret key
NEXTAUTH_URL= http://localhost:3000
```

## 🔒 Authentication Flow

1. **Users register/login** email : admin@email.com
   password : password123.

2. **JWT-based authentication** ensures secure access.
3. **Protected Routes** prevent unauthorized access to `/dashboard`.

## 🚀 Deployment

This project is deployed on **Vercel**. Access the live version: [Live App](https://band-drive-nextjs-dashboard-sdmm.vercel.app/)

```sh
git checkout -b feature-branch
git commit -m "Add a new feature"
git push origin feature-branch
```
