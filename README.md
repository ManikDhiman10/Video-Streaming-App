# my-video-streaming-app
Video Streaming Platform using React.js, AWS S3 and Flask, MongoDB
# Video Streaming Application

This repository hosts the **Video Streaming Application**, a full-stack web application that allows users to browse and stream videos directly through their browser. It is built with a **React.js** frontend and a **Flask, AWS S3, MongoDB** backend.

---

## Features

- **Video Listing**: Displays a list of available videos with metadata (title, description, duration, and size).
- **Streaming Support**: Plays videos seamlessly via a pre-signed streaming URL.
- **Scalable Backend**: API endpoints to serve video metadata and stream video files.
- **Responsive Design**: Optimized for both desktop and mobile users.

---

## Setup Instructions

### Prerequisites
- **Node.js** and **npm** installed for the frontend.
- **Python** installed (preferably 3.8+) for the backend.
- **Virtual Environment** for Python dependencies.
- **Git** for version control.

### Step 1: Clone the Repository
```bash
git clone https://github.com/ManikDhiman10/my-video-streaming-app.git
cd my-video-streaming-app
```

### Step 2: Set Up the Backend
``` bash
cd backend
python3 -m venv venv
```

- **for Mac/Linux**
- source venv/bin/activate
- - **for Windows**
- venv\Scripts\activate
- pip install -r requirements.txt
- python app.py


### Step 3: Set Up the Frontend
- cd ../frontend
- npm install
- npm start

