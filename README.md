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
## Design Decisions and Rationale

### Frontend Design

#### Technology Stack
- **React.js** was chosen due to its:
  - Component-based architecture, which simplifies the creation of reusable UI elements.
  - Strong community support and extensive ecosystem of libraries.
  - Built-in state management using `useState` and `useEffect` for dynamic interaction between components.

#### User Interface (UI) Design
- Focused on **minimalistic design** to provide a clutter-free user experience.
- Utilized **CSS Flexbox and Grid** for responsive layouts, ensuring compatibility across devices.
- Adopted **Material Design principles** for consistency and an intuitive UI.
- The video player was implemented using the `<video>` HTML tag, ensuring:
  - Cross-browser compatibility.
  - Easy customization for controls like play, pause, and volume adjustment.

---

### Backend Design

#### Technology Stack
- **Flask Framework** was selected for its:
  - Simplicity and quick setup for building RESTful APIs.
  - Lightweight nature, making it well-suited for smaller projects.
  - Easy integration with libraries like Flask-CORS for handling cross-origin requests.

#### API Design
- **RESTful API Design**:
  - A clear separation between data fetching and video streaming endpoints.
  - Example:
    - `GET /api/videos`: Provides a list of all video metadata.
    - `GET /api/video/<filename>`: Generates presigned URLs for video streaming.

#### Video Streaming Mechanism
- Implemented **presigned URLs** to:
  - Securely handle video access.
  - Reduce server load by directly serving videos from the storage backend.

#### File Structure
- Organized into modular components:
  - `app.py`: Core application logic.
  - `routes.py`: Contains endpoint definitions.
  - `utils/`: Helper functions for file handling and video metadata.

## Challenges Faced and Solutions

### 1. **Frontend and Backend Integration**
- **Problem**: The frontend was unable to fetch data from the backend due to Cross-Origin Resource Sharing (CORS) restrictions.
- **Solution**: 
  - Installed and configured the `Flask-CORS` library in the backend to allow cross-origin requests.
  - Ensured that only specific origins (e.g., the deployed frontend URL) were allowed for security.

---

### 2. **Video Streaming Implementation**
- **Problem**: Videos were taking too long to load when streamed directly from the server.
- **Solution**:
  - Integrated presigned URLs to allow video streaming directly from a cloud storage service, reducing server load and improving performance.
  - Implemented chunk-based loading to enable faster playback and buffer management.

---

### 3. **Frontend Responsiveness**
- **Problem**: The application UI broke on smaller screen sizes, affecting user experience.
- **Solution**:
  - Used **CSS Media Queries** to adjust layout styles for different screen sizes.
  - Refactored components using Flexbox and Grid for better alignment and scalability.

---

### 4. **Deployment Issues**
- **Problem**: Deployment failed due to environment-specific configurations and version mismatches.
- **Solution**:
  - Used Docker containers to create a consistent environment for deployment across systems.
  - Configured environment variables for API keys and backend URLs to keep sensitive information secure.

---

### 5. **File Handling in Backend**
- **Problem**: Managing large video files on the server caused slow response times.
- **Solution**:
  - Shifted video storage to cloud platforms (e.g., AWS S3, Google Cloud Storage) and retrieved videos using their APIs.
  - Enabled efficient metadata handling by storing details in a lightweight database.

---

### 6. **API Testing**
- **Problem**: Backend endpoints occasionally returned inconsistent responses due to missing data validation.
- **Solution**:
  - Added robust validation checks for incoming requests using Flask’s `request` module.
  - Created a Postman collection for testing all API endpoints systematically.

---

### 7. **State Management in Frontend**
- **Problem**: React components lost state after page reloads, impacting user experience.
- **Solution**:
  - Utilized React's `Context API` for global state management.
  - Stored non-sensitive data like user preferences in `localStorage` for persistence.
  - 

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

