
<div align="center">

# A better ERP Student Portal
### Fixing the legacy broken system

![Status](https://img.shields.io/badge/status-production-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn" />
</p>

</div>

---

## Overview

This **Loyola ERP Student Portal** is a headless modernization wrapper built to interface with the legacy college management system. It acts as a secure proxy, scraping HTML data in real-time and converting it into a clean, RESTful JSON API.

This project solves the frustration of outdated, non-responsive, and table-heavy university portals by providing students with a sleek, **mobile-first PWA dashboard** featuring analytics, graphs, and instant data synchronization.

##  Key Features

###  Frontend Experience
-   **Titanium Theme UI**: A polished professional interface using `shadcn/ui` with distinct "Titanium" light mode and true dark mode.
-   **Visual Analytics**:
    -   **Attendance**: Replaces static logs with interactive Donut charts and "Classes to Attend" calculators.
    -   **Grades**: Automatic **SGPA Calculation** engine for exam results.
-   **Session Guard**: Smart idle tracking that auto-locks the UI before the legacy server timeout occurs.
-   **PWA Ready**: Fully installable as a web app on iOS and Android.

###  Backend Architecture
-   **Headless Scraper**: Uses **Cheerio** & **Axios** to parse JSP pages and extract structured data.
-   **Secure Proxying**:
    -   **Image Tunneling**: Bypasses strict referral checks to serve authenticated student photos securely to the frontend.
    -   **Cookie Management**: Handles complex session cookies (`JSESSIONID`) and simulates browser navigation flow.
-   **Live Data**: Zero database. All data is fetched real-time from the college server using the user's actual credentials.

---

  ##  Architecture
<div >
  <p>
    
```text
+---------------------+
|      Student        |
|       (User)        |
+----------+----------+
           |
           |  HTTPS
           v
+----------+-----------------------------------+
|              Frontend (Client)               |
|----------------------------------------------|
|  React + shadcn/ui                           |
|  Hosted on Vercel                            |
|                                              |
|  - UI renders student data                   |
|  - Sends authenticated API requests          |
+----------------------+-----------------------+
                       |
                       |  REST API (JSON)
                       v
+----------------------+-----------------------+
|               Backend (Server)               |
|----------------------------------------------|
|  Node.js API + Scraper                       |
|  Hosted on Oracle VPS                        |
|                                              |
|  - Manages sessions                          |
|  - Detects ERP timeout                       |
|  - Scrapes legacy HTML pages                 |
|  - Normalizes data into JSON                 |
+----------------------+-----------------------+
                       |
                       |  Authenticated
                       |  Scraping Requests
                       v
+----------------------+-----------------------+
|            College ERP System                |
|----------------------------------------------|
|  Legacy JSP / HTML                           |
|                                              |
|  - Cookie-based authentication               |
|  - Session timeout on inactivity             |
|  - Returns raw HTML pages                    |
+----------------------+-----------------------+
                       ^
                       |  HTML Responses
                       | 
                       |
+----------------------+-----------------------+
Flow Summary:
-------------
1. Student accesses the frontend via HTTPS.
2. Frontend requests data from the backend using REST (JSON).
3. Backend performs authenticated scraping against the ERP.
4. ERP responds with HTML pages.
5. Backend parses HTML and converts it into structured JSON.
6. Backend sends processed JSON back to the frontend.
```
</p>
</div>


##  Modules

| Module | Functionality |
| :--- | :--- |
| **Authentication** | Secure proxy login ensuring credentials never leave the session loop. |
| **Profile** | Bio-data display with **secure image proxying** to load protected photos. |
| **Attendance** | Detailed Subject-wise and Hour-wise logging with "Safe Zone" indicators. |
| **Internals** | Accordion-style breakdown of mid-exams and assignment scoring. |
| **Results** | Historical semester results with weighted grade point average calculation. |
| **Sidebar** | Global navigation with dynamic student details fetching. |

---

##  Local Development

The project is a Monorepo containing both Client and Server.

### 1. Prerequisites
-   Node.js (v20+)
-   Git

### 2. Setup Backend (The Scraper)
```bash
cd server
npm install
# Create .env file
echo "PORT=3000
ERP_BASE_URL=http://202.160.160.58:8080/lastudentportal
FRONTEND_URL=http://localhost:5173" > .env

# Run Server
node dist/index.js
```
> Backend runs on `http://localhost:3000`

### 3. Setup Frontend (The Dashboard)
Open a new terminal in the root directory:
```bash
npm install
# Create .env.local file
echo "VITE_API_URL=http://localhost:3000/api" > .env.local

# Run Client
npm run dev
```
> Frontend runs on `http://localhost:5173`

---

##  Deployment Strategy

This project uses a split-deployment strategy to stay within free-tier limits:

### **Frontend (Vercel)**
-   Hosting the React SPA.
-   Configured via `vercel.json` for SPA routing.
-   **Env Var**: `VITE_API_URL` points to the Backend.

### **Backend (Oracle VPS)**
-   Hosting the Node.js Scraper API.

---

##  Disclaimer

This project is an **unofficial client** developed for educational purposes and to improve the user experience for students.
-   It **does not** store any passwords or academic data.
-   It acts strictly as a passthrough interface.
-   This project is not affiliated with the university or Firstline Infotech.

---

<div align="center">
  <p>Any helpful contributions to the project are accepted ❤️</p>
</div>
