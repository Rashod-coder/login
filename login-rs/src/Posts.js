import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'; // Importing Card components from Reactstrap
import './Posts.css';


function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Function to fetch posts from the server
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8801/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // Call the fetchPosts function when the component mounts
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Current Posts</h2>
      
      <div className="posts-container">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <Card style={{ width: '18rem' }}>
              <CardBody>
                <CardTitle>{post.title}</CardTitle>
                <CardText>{post.content}</CardText>
                <p>Created by: {post.firstName} {post.lastName}</p>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
