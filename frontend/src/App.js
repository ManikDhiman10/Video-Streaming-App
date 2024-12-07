import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    setError(null);  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/videos");
      if (!response.ok) throw new Error("Failed to fetch video list.");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("There was an issue loading the videos. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleVideoClick = useCallback(async (video) => {
    setSelectedVideo(video);
    setIsVideoLoading(true);
    setError(null);  
    const videoStreamUrl = await fetchVideoStream(video.filename);
    if (videoStreamUrl) {
      setVideoUrl(videoStreamUrl);
    } else {
      setError("Failed to fetch the video stream. Please try again.");
    }
    setIsVideoLoading(false);
  }, []);


  const fetchVideoStream = async (filename) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/video/${filename}`);
      if (!response.ok) throw new Error("Failed to fetch video stream.");
      const data = await response.json();
      if (data.presigned_url) {
        return data.presigned_url;
      } else {
        throw new Error("No presigned URL found.");
      }
    } catch (error) {
      console.error("Error fetching video stream:", error);
      setError("Error fetching the video stream.");
      return null;
    }
  };

  return (
    <div className="App">
      <h1 className="title">Video Streaming Platform</h1>

      {isLoading ? (
        <p className="loading-text">Loading videos...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : videos.length > 0 ? (
        <div className="video-list">
          <ul>
            {videos.map((video, index) => (
              <li key={index} className="video-item">
                <button className="video-button" onClick={() => handleVideoClick(video)}>
                  {video.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-videos">No videos available. Please try again later.</p>
      )}

      {selectedVideo && videoUrl && (
        <div className="video-player">
          <h2 className="video-title">Now Playing: {selectedVideo.title}</h2>
          {isVideoLoading ? (
            <p className="loading-video">Loading video...</p>
          ) : (
            <div className="video-container">
              <video controls width="800" height="450" src={videoUrl}>
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {selectedVideo && (
            <div className="video-metadata">
              <h3>Video Specifications:</h3>
              <ul>
                <li><strong>Description:</strong> {selectedVideo.description}</li>
                <li><strong>Filename:</strong> {selectedVideo.filename}</li>
                <li><strong>Size:</strong> {selectedVideo.size}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
