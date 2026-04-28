# OpsFlow

**Operations Workflow Management Platform for enterprise task tracking and analytics**

OpsFlow is a full-stack enterprise dashboard designed to simulate real-world business operations management by allowing teams to create, track, manage, and analyze workflow requests across departments.

---

## Overview

OpsFlow provides a centralized platform for:
- Secure user authentication with Supabase
- Creating and managing operational requests
- Tracking request priority, status, and overdue deadlines
- Visualizing analytics through dashboard metrics
- Exporting workflow data to CSV
- Dark Mode / Light Mode UI
- Role-based enterprise workflow simulation

---

## Features

### Authentication & Security
- User Sign Up / Login
- Supabase Authentication
- Row-Level Security (RLS)
- Protected user-specific request access

### Workflow Management
- Create new requests with:
  - Title
  - Description
  - Priority
  - Category
  - Assigned Team
  - Due Date
- Update request statuses:
  - Open
  - In Progress
  - Resolved
- Delete requests

### Dashboard Analytics
- Total Requests
- Open Requests
- Resolved Requests
- Urgent Requests
- Overdue Requests
- Priority Bar Chart
- Status Breakdown Pie Chart

### UI/UX
- Dark / Light Mode Toggle
- Responsive Dashboard Layout
- Search + Category + Priority Filtering
- CSV Export for workflow reporting

---

## Tech Stack

### Frontend
- React.js
- Vite
- CSS3
- Recharts

### Backend
- Node.js
- Express.js

### Database & Auth
- Supabase
- PostgreSQL

---

## Project Structure

```bash
OpsFlow/
│
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   └── Auth.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── supabaseClient.js
│
├── server/                 # Backend Express API
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── requestController.js
│   ├── routes/
│   │   └── requestRoutes.js
│   └── server.js
│
└── Screenshots/
```

---

## Installation

### Clone the repository
```bash
git clone https://github.com/VishnuP02/OpsFlow.git
cd OpsFlow
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### Backend Setup
```bash
cd ../server
npm install
node server.js
```

---

## Environment Variables

### Client `.env`
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Server `.env`
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=5001
```

---

## Screenshots

### Login Screen
_Add your Login Screen screenshot here_

### Light Mode Dashboard
_Add your Light Mode screenshot here_

### Dark Mode Dashboard
_Add your Dark Mode screenshot here_

---

## Future Business Value
OpsFlow demonstrates:
- Enterprise software architecture
- Full-stack application development
- Secure authentication systems
- Dashboard analytics
- Workflow optimization
- Product-ready UI/UX design

---

## License
MIT License
