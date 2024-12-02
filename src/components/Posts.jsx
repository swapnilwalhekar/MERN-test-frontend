import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:9000/posts");
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Add a new post to the posts list
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="posts-container">
      <h1>Social Media App</h1>

      {/* Create Post Component */}
      <CreatePost onPostCreated={handlePostCreated} />

      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <h3>{post.content}</h3>
              <p>
                <strong>By:</strong> {post.userId?.name || "Anonymous"}
              </p>
              <p>
                <strong>Likes:</strong> {post.likes.length}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
