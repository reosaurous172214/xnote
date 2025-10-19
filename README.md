# xNote Frontend

Website: https://xnote-ntkq.onrender.com

A modern, responsive React-based note-taking web app where users can create, edit, pin, archive, and organize their notes effortlessly. xNote provides a clean interface, fast performance, and seamless synchronization with the backend.

## 🚀 Features

- ✍️ Create & edit notes — add, update, and delete notes easily.
- 📌 Pin/unpin notes — keep important notes on top.
- 🗂️ Archive notes — move less-used notes to the archive.
- 🎨 Color customization — choose note background colors for better organization.
- 📷 Image support — attach images to notes.
- 📱 Responsive design — optimized for mobile, tablet, and desktop.
- ⚡ Real-time updates — reflects pinned or archived changes instantly.
- 🔐 User authentication — integrated with backend (JWT or session-based).
- ☁️ API integration — connected with Node.js/Express-based xNote backend.

## 🏗️ Project Structure

```text
xnote-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── NoteCard.jsx
│   │   ├── NoteComposer.jsx
│   │   └── NotesList.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Archive.jsx
│   │   ├── Pinned.jsx
│   │   ├── Profile.jsx
│   │   └── Login.jsx
│   ├── App.js
│   ├── index.js
│   ├── App.css
│   └── utils/
│       └── constants.js
├── .env
├── package.json
├── README.md
└── tailwind.config.js
```

## ⚙️ Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/<your-username>/xnote-frontend.git
cd xnote-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create an `.env` file in the project root and add the API URL:
```env
REACT_APP_API_URL=http://localhost:5000/api
```
(Change the URL if your backend is hosted remotely.)

4. Run the development server
```bash
npm start
```

The app will start at http://localhost:3000

## 🔗 API Integration

All API requests are handled through `src/api/axios.js` using the base URL from the `REACT_APP_API_URL` environment variable.

Backend API / Server:
- Live server: https://xnote-serverx.onrender.com
- (If you have a GitHub repository for the backend, consider adding that link here.)

## 📦 Available Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| npm start      | Runs the app in development mode     |
| npm run build  | Builds the app for production        |
| npm run lint   | Lints code using ESLint              |
| npm test       | Runs the test suite (if configured)  |

## 🎨 UI Components

- NoteCard — displays individual notes with pin/archive actions.
- NoteComposer — modal or inline editor to create new notes.
- Navbar — responsive navigation bar for switching views.
- PinnedNotes — section displaying pinned notes.
- ArchivedNotes — section for archived notes.

## 🌐 Backend Connection

xNote Frontend communicates with the xNote Backend (Node.js + Express + MongoDB). Ensure your backend is running and reachable from the URL in `.env`.

## 📱 Responsive Design

Built using Tailwind CSS with a mobile-first approach. Supports:
- Desktop (≥1024px)
- Tablet (≥768px)
- Mobile (≤767px)

## 🧩 Tech Stack

| Category       | Technology                         |
| -------------- | ---------------------------------- |
| Frontend       | React.js (Hooks, Context API)      |
| Styling        | Tailwind CSS                       |
| Icons          | Lucide React                       |
| HTTP Client    | Axios                              |
| State Mgmt     | React Context / useState           |
| Backend API    | Node.js + Express                  |
| Database       | MongoDB (via backend)              |

## 🧠 Future Enhancements

- 🔍 Search and filter notes
- 🏷️ Tags / categories
- 🌙 Dark mode
- 📤 Note sharing
- 🔔 Notifications and reminders

## 👨‍💻 Author

Saurabh Sharma  
Email: saurabhsh@ug23.cs@nitp.ac.in (please verify this address; it looks like it may contain an extra `@`)

## 📜 License

This project is licensed under the MIT License — see the LICENSE file for details.
