🚀 DevFusion — Connect, Collaborate & Code


DevFusion is your one-stop social platform for developers to connect, chat, and collaborate — crafted with performance, scalability & premium design.

🌐 Live Demo: https://devfusion.co.in


🏗️ Project Architecture
mermaid
Copy
Edit
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
✅ Secure JWT & Cookie Authentication
✅ Cron Jobs for Automation
✅ Amazon SES for Transactional Emails
✅ Premium, Responsive UI with TailwindCSS
✅ Fully Deployed on AWS EC2 with Nginx

⚙️ Tech Stack
Frontend: React.js, Redux Toolkit, TailwindCSS, Vite

Backend: Node.js, Express.js, MongoDB (Mongoose), Socket.io

Deployment: AWS EC2 Ubuntu, Nginx, PM2, Let's Encrypt SSL

Others: Amazon SES, dotenv, cron, axios

🔧 Local Setup
Clone Repositories:

bash
Copy
Edit
git clone <your-backend-repo>
git clone <your-frontend-repo>
Backend Setup:

bash
Copy
Edit
cd backend
npm install
# Setup your .env with MONGODB_URI, JWT_SECRET, PORT, etc.
npm run start
Frontend Setup:

bash
Copy
Edit
cd frontend
npm install
npm run dev
Visit: http://localhost:5173

🌐 Production Setup (Quick Summary)
✅ AWS EC2 (Ubuntu) with SSH Access
✅ Nginx Reverse Proxy for domain & SSL
✅ PM2 for backend service management
✅ Frontend served via Nginx /var/www/html
✅ Domain: https://devfusion.co.in



💡 Future Improvements
Notifications System (Bell Icon)

Enhanced Chat UI with Typing Indicators

User Search & Recommendations

Group Chats & Code Sharing

🤝 Contribute & Connect
Pull Requests, Stars ⭐ & Feedback welcome! Let’s grow this dev community together.

#️⃣ #MERN #SocketIO #AWS #ReactJS #MongoDB #FullStackProject #DeveloperCommunity
