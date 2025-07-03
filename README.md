# 🚀 DevFusion — Connect, Collaborate & Code

<div align="center">
  <img src="https://devfusion.co.in/preview.jpg" alt="DevFusion Preview" width="800">
</div>

**DevFusion** is a premium social platform for developers to connect, chat, and collaborate — built with performance, scalability & beautiful design in mind.

🌐 **Live Demo:** [https://devfusion.co.in](https://devfusion.co.in)

---



---

## 🏗️ Project Architecture

graph TD
  subgraph Frontend [React + Vite + Tailwind]
    A[User Interface] --> B[API Calls via Axios]
  end

  subgraph Backend [Node.js + Express + MongoDB]
    B --> C[Express Server]
    C --> D[MongoDB - User, Chats, Connections]
    C --> E[Socket.io - Real-time Chat]
    C --> F[Cron Jobs - Automation]
    C --> G[Amazon SES - Email Service]
  end

  subgraph Deployment [AWS EC2 + Nginx]
    A --> H[Nginx Reverse Proxy]
    C --> H
    H --> Internet
  end

✨ Key Features
✅ Developer Profiles & Connections
✅ Realtime Chat via Socket.io
✅ Secure Authentication (JWT & Cookies)
✅ Cron Jobs for Automation
✅ Amazon SES for Transactional Emails
✅ Premium UI with TailwindCSS
✅ Fully Deployed on AWS EC2 with Nginx

⚙️ Tech Stack
Frontend:React.js, Redux Toolkit, TailwindCSS, Vite, Lucide Icons
Backend: Node.js, Express.js
MongoDB (Mongoose)
Socket.io
JWT Authentication
Node.js
Express.js
MongoDB (Mongoose)
Socket.io
JWT Authentication

Deployment:

AWS EC2 (Ubuntu)

Nginx Reverse Proxy

PM2 Process Manager

Let's Encrypt SSL

Services:

Amazon SES (Emails)

Cron Jobs (Automation)

🔧 Local Setup
Prerequisites
Node.js (v16+)

MongoDB Atlas URI

Git

Installation
Clone repositories:

bash
Copy
Edit
git clone https://github.com/yourusername/devfusion-frontend.git
git clone https://github.com/yourusername/devfusion-backend.git
Backend Setup:

bash
Copy
Edit
cd devfusion-backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
Frontend Setup:

bash
Copy
Edit
cd devfusion-frontend
npm install
npm run dev
Visit: http://localhost:5173



💸 And yeah, bought my first domain ever for this project — feels like official dev business now!

💡 Future Improvements

🔔 Notifications System (Real-time Alerts)
✍️ Enhanced Chat UI with Typing Indicators
🔍 User Search & Recommendations
👥 Group Chats & Code Sharing


