import React, { useState } from "react";
import axios from "axios";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!content.trim()) {
      setError("Post content cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in first.");
        return;
      }

      const response = await axios.post(
        "http://localhost:9000/create-post",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      setSuccess("Post created successfully!");
      setContent("");

      onPostCreated(response.data.post);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
          rows="4"
          className="post-input"
        ></textarea>
        <button type="submit" className="submit-btn">
          Create Post
        </button>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
