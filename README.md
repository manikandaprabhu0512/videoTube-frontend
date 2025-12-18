# Videogram - Modern Video Sharing Platform

![Videogram Banner](./public/App_Logo_Dark_Mode.png)

**Videogram** is a feature-rich, modern frontend application for a video sharing platform. Built with performance and user experience in mind, it leverages the power of the React ecosystem to provide a seamless interface for video streaming, management, and community interaction.

## 🚀 Features

### 🔐 Authentication & User Management

- **Secure Authentication**: Robust Sign Up and Login flows.
- **Password Management**: Forgot Password and Reset Password functionality with email verification.
- **User Profiles**: customizable user profiles with avatars and cover images.
- **Account Settings**: Manage account details and preferences.

### 📹 Video Management

- **Video Upload**: Drag-and-drop video upload interface.
- **Video Playback**: High-performance video player with custom controls.
- **Edit Details**: Update video titles, descriptions, and thumbnails.
- **Publishing Control**: Manage video visibility (Public/Private).

### 🧩 Community & Interaction

- **Playlists**: Create, manage, and share custom playlists.
- **Subscriptions**: Subscribe to creators and manage your feed.
- **History**: detailed watch history tracking.
- **Likes & Comments**: Interactive engagement with videos.

### 🎨 UI/UX

- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
- **Modern Styling**: Sleek interface built with Tailwind CSS.
- **Dynamic Theming**: Support for user-preferred visual themes.

## 🛠 Tech Stack

**Core Framework**

- [React](https://react.dev/) (v19) - UI Library
- [Vite](https://vitejs.dev/) - specialized build tool

**State Management & Data Fetching**

- [Redux Toolkit](https://redux-toolkit.js.org/) - Global state management
- [React Query](https://tanstack.com/query/latest) - Server state management and caching
- [Axios](https://axios-http.com/) - HTTP client

**Styling & UI**

- [TailwindCSS](https://tailwindcss.com/) (v4) - Utility-first CSS framework
- [Headless UI](https://headlessui.com/) - Unstyled, accessible UI components
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons

**Forms & Validation**

- [Formik](https://formik.org/) - Form management
- [Zod](https://zod.dev/) - TypeScript-first schema validation

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/manikandaprabhu0512/videotube-frontend.git
   cd videotube-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your backend API URL:

   ```env
   VITE_SERVER_LINK=https://videotube-xwsa.onrender.com/api/v1
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📜 Scripts

| Script            | Description                             |
| :---------------- | :-------------------------------------- |
| `npm run dev`     | Starts the development server with HMR. |
| `npm run build`   | Builds the application for production.  |
| `npm run preview` | Locally preview the production build.   |

## 📂 Project Structure

```bash
src/
├── Api/            # API configuration and service calls
├── assets/         # Static assets (images, icons)
├── components/     # Reusable UI components
│   ├── Cards/      # Video and profile cards
│   ├── Header/     # Navigation and app header
│   ├── Pages/      # Main application pages (Views)
│   ├── Popup/      # Modals and dialogs
│   └── SideBar/    # Navigation sidebar
├── features/       # Redux slices and feature logic
├── layouts/        # Application layout wrappers
├── store/          # Redux store configuration
└── utils/          # Helper functions and constants
```
