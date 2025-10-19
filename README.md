##📝 xNote Frontend
Website : [Xnote]{https://xnote-ntkq.onrender.com}
A modern and responsive React-based note-taking web app where users can create, edit, pin, archive, and organize their notes effortlessly.
xNote provides a clean interface, fast performance, and seamless synchronization with the backend.

@@🚀 Features

✍️ Create & Edit Notes — Add, update, and delete notes easily.

📌 Pin/Unpin Notes — Keep important notes on top.

🗂️ Archive Notes — Move less-used notes to the archive.

🎨 Color Customization — Choose note background colors for better organization.

📷 Image Support — Attach images to notes.

📱 Responsive Design — Fully optimized for mobile, tablet, and desktop.

⚡ Real-time Updates — Reflects pinned or archived changes instantly.

🔐 User Authentication — Integrated with backend (JWT or session-based login).

☁️ API Integration — Connected with Node.js/Express-based xNote Backend.

##🏗️ Project Structure
xnote-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
│
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
│
├── .env
├── package.json
├── README.md
└── tailwind.config.js

##⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/<your-username>/xnote-frontend.git
cd xnote-frontend

##2️⃣ Install dependencies
npm install

##3️⃣ Create an .env file
REACT_APP_API_URL=http://localhost:5000/api


(Change the URL if your backend is hosted remotely.)

##4️⃣ Run the development server
npm start


The app will start on http://localhost:3000

🔗 API Integration

All API requests are handled through axios.js using the base URL from the environment variable.


##📦 Available Scripts
Command	Description
npm start	Runs the app in development mode
npm run build	Builds the app for production
npm run lint	Lints code using ESLint
npm test	Runs the test suite (if added)
🎨 UI Components

NoteCard – Displays individual notes with pin/archive actions.

NoteComposer – Modal or inline editor to create new notes.

Navbar – Responsive navigation bar for switching between views.

PinnedNotes – Section displaying pinned notes.

ArchivedNotes – Section for archived notes.

##🌐 Backend Connection

xNote Frontend communicates with xNote Backend, a Node.js + Express + MongoDB server.

🔗 Backend Repository: [xnote-backend]{https://xnote-serverx.onrender.com}

##📱 Responsive Design

Built using Tailwind CSS with a mobile-first approach.
Supports:

Desktop (≥1024px)

Tablet (≥768px)

Mobile (≤767px)

##🧩 Tech Stack
Category	Technology
Frontend	React.js (Hooks, Context API)
Styling	Tailwind CSS
Icons	Lucide React
HTTP Client	Axios
State Management	React Context / useState
Backend API	Node.js + Express
Database	MongoDB (via backend)
##🧠 Future Enhancements

🔍 Search and filter notes

🏷️ Add tags/categories

🌙 Dark mode

📤 Note sharing

🔔 Notifications and reminders

##👨‍💻 Author

Saurabh Sharma
📧 Email: saurabhsh@ug23.cs@nitp.ac.in

##📜 License

This project is licensed under the MIT License — see the LICENSE
 file for details.
