import React, { useState } from 'react';
import axios from 'axios';
import './Post.css'; // Import CSS file for component-specific styling
import useAuthentication from './auth'; // Import the custom authentication hook

function Post() {
  const [content, setContent] = useState('');
  const { auth } = useAuthentication(); // Use the useAuthentication hook to get authentication status

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if user is authenticated before allowing post submission
      if (!auth) {
        console.error('User is not authenticated. Please log in.');
        return;
      }

      // Send a POST request to create a new post
      const response = await axios.post('http://localhost:8801/create-post', { content }, { withCredentials: true });

      // Handle success
      console.log('Post created successfully:', response.data);
      
      // Clear the input field after successful submission
      setContent('');
    } catch (error) {
      // Handle error
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content">Post Content:</label>
          <textarea
            id="content"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Post</button>
      </form>
    </div>
  );
}

export default Post;
