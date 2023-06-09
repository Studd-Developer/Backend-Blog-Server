// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Sample in-memory data storage
const users = [];
const posts = [];

// Endpoint: Create a user
app.post('/createUser', (req, res) => {
  const { name, emailId, language, interests } = req.body;

  const user = {
    id: users.length + 1,
    name,
    emailId,
    language,
    interests,
  };

  users.push(user);

  res.status(201).json({ message: 'User created successfully', user });
});

// Endpoint: Get all users
app.get('/getAllUsers', (req, res) => {
  res.json(users);
});

// Endpoint: Get a user by ID
app.get('/getUserById/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.json(user);
  }
});

// Endpoint: Create a post
app.post('/createPost', (req, res) => {
  const { title, content, interestTag, userId } = req.body;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    const post = {
      title,
      content,
      interestTag,
      likes: 0,
      dislikes: 0,
      createdBy: {
        userId: user.id,
        name: user.name,
        language: user.language,
      },
    };

    posts.push(post);

    res.status(201).json({ message: 'Post created successfully', post });
  }
});

// Endpoint: Get all posts
app.get('/getAllPosts', (req, res) => {
  res.json(posts);
});

// Endpoint: Get posts by user ID
app.get('/getPostsByUser/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    const userPosts = posts.filter((post) => post.createdBy.userId === userId);
    res.json(userPosts);
  }
});

// Endpoint: Get posts by interest tag
app.post('/getPostsByInterest', (req, res) => {
  const { interest } = req.body;

  const interestPosts = posts.filter(
    (post) => post.interestTag === interest
  );

  res.json(interestPosts);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
