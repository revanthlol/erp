# Loyola Student Portal (ERP Modernization)

A Next-Gen College ERP dashboard that reimagines the legacy student portal experience. Built with a focus on modern UI/UX, mobile responsiveness, and visual data analytics.

## 🚀 Features

-   **Modern Dashboard UI**: A complete overhaul of the legacy interface using a strict **Neutral/Zinc** theme and Dark Mode by default.
-   **Visual Analytics**: 
    -   **Attendance**: Interactive Donut charts (Recharts) replacing static tables.
    -   **Performance**: Automatic **SGPA Calculator** for semester marks.
    -   **Finance**: Dashboard for Paid/Due fees with visual progress bars.
-   **Student Services Hub**: Unified portal for exam registrations, hall ticket downloads (with mock PDF generation), and library OPAC search.
-   **Mobile First**: Fully responsive layout with stacking cards, scrollable data tables, and a touch-friendly sidebar.
-   **PWA Support**: Installable on iOS/Android as a standalone native-like app.
-   **Smooth Animations**: System-wide page transitions using Framer Motion.

## 🛠️ Tech Stack

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
-   **Charts**: [Recharts](https://recharts.org/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Routing**: React Router Dom v6
-   **PWA**: Vite Plugin PWA

## 📸 Modules

1.  **Student Profile**: Edit contact details, change password (Simulated), and view academic bio.
2.  **Attendance**:
    -   *Subject-wise*: Safe/Detained alerts based on 75% criteria.
    -   *Hour-wise*: Detailed log view with Donut chart visualization.
3.  **Examination**:
    -   *Internals*: Accordion view for detailed component weighting.
    -   *External Marks*: Grade & SGPA calculation engine.
    -   *Hall Ticket*: Release status indicator and preview modal.
4.  **Finance**: Payment gateway simulation and receipt history.
5.  **Library**: Digital resource links (IEEE, DELNET) and overdue book alerts.

## 🏃‍♂️ Getting Started

### Prerequisites
-   Node.js (v18 or higher)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/revanthlol/erp.git
    cd erp
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

## 🔐 Authentication (Mock)

Since this is a frontend-only showcase:
-   **Username**: Any value (e.g., `111724013034`)
-   **Password**: Any value (e.g., `password`)

## 📱 Mobile & PWA

To test the mobile install feature:
1.  Deploy to Vercel/Netlify (Requires HTTPS).
2.  Open the site on a mobile device.
3.  Use **"Add to Home Screen"** to install as a standalone app.

## 📄 License

This project is for educational and UI prototyping purposes.