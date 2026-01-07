<div align="center">

# 🌱 LifeOS — Personal Growth & Mindfulness System
### *Focus on the relationship between vision, habits, and well-being.*

[![Framework](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Styling](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[**Live Demo →**](https://life-os-cyan-delta.vercel.app/)

</div>

---

### 📖 Overview
**LifeOS** is a high-performance, calm-design productivity platform. Unlike generic task managers, LifeOS focuses on the critical relationship between long-term goals, daily habits, and emotional health. It is built to turn small, daily actions into measurable personal growth.

---

### 🎯 Key Features

* **Goal-Habit Architecture:** A relational data structure that links specific daily actions directly to your long-term vision.
* **Daily Check-ins:** High-speed habit tracking using **Optimistic UI** for seamless streak maintenance.
* **Mindfulness Journaling:** Integrated daily reflections with mood tagging to monitor mental health trends.
* **Visual Insights:** Interactive data visualization using **Recharts** to correlate mood scores with habit productivity.
* **Server Actions:** Fully modern data mutation handled securely on the server side with Next.js 15.
* **Responsive Focus UI:** A fluid, minimalist interface designed to eliminate distractions and promote clarity.

---

### 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Styling** | Tailwind CSS + Shadcn/UI |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Token Verification** | JWT |
| **Authentication** | Next Auth |
| **Password protection** | Hashed |

---

### 📐 Database Schema
The system utilizes a **relational NoSQL architecture**. This ensures strict data integrity for habit-goal relationships while maintaining the horizontal scalability and flexibility of MongoDB.



---

### 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/habib-web-dev1/life-os.git](https://github.com/habib-web-dev1/life-os.git)
    ```

2.  **Install dependencies:**
    ```bash
    cd life-os
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

### 🧠 Engineering Challenges & Solutions

#### 1. Latency Compensation (Optimistic UI)
To achieve a "snappy" feel, I implemented **Optimistic UI** for habit tracking. When a user checks a habit, the UI updates instantly via React state. The **Server Action** then handles the MongoDB communication in the background. If the database update fails, the UI gracefully rolls back to its previous state, ensuring zero perception of lag.

#### 2. Complex Data Aggregation
The **Insights Page** requires real-time calculation of weekly trends. I developed a server-side aggregation utility that performs mathematical mapping between habit completion arrays and reflection mood scores. This allows the system to provide users with a unique **"Correlation Score"** between their consistency and their happiness.

---

### 📬 Contact
**Md Ahsan Habib**
- **LinkedIn:** [md-ahsan-habib](https://www.linkedin.com/in/ahsan-habib-coder/)
- **GitHub:** [@habib-web-dev1](https://github.com/habib-web-dev1)
