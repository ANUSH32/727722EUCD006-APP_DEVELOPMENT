import express from 'express';
import cors from 'cors';
import path from 'path';
import url, { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import ImageKit from 'imagekit';
import Chat from './models/chat.js';
import UserChats from './models/userChats.js';
import UserResponse from './models/userResponse.js'; 


const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
};

// Initialize ImageKit
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

// Route to get ImageKit authentication parameters
app.get('/api/upload', (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// Route to create a new chat
app.post('/api/chats', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

  try {
    // Create a new chat
    const newChat = new Chat({
      userId: userId,
      history: [{ role: 'user', parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // Check if the userChats exists
    const userChats = await UserChats.find({ userId: userId });

    // If it doesn't exist, create a new one and add the chat to the chats array
    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
    } else {
      // If it exists, push the chat to the existing array
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );

      res.status(201).send(newChat._id);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating chat!');
  }
});

// Route to get user chats
app.get('/api/userchats', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.find({ userId });

    res.status(200).send(userChats[0].chats);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching userchats!');
  }
});

// Route to get a specific chat by id
app.get('/api/chats/:id', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });

    res.status(200).send(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching chat!');
  }
});

// Route to update a chat with new question and answer
app.put('/api/chats/:id', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { question, answer, img } = req.body;

  const newItems = [
    ...(question
      ? [{ role: 'user', parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: 'model', parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error adding conversation!');
  }
});


// Backend Route to save user responses
app.post('/api/answers', async (req, res) => {
  const userId = req.headers['user-id']; 
  const { answers } = req.body;

  if (!answers) {
    return res.status(400).send('Missing user ID or answers');
  }

  try {
    // Save answers to the UserResponse model in MongoDB
    await UserResponse.updateOne(
      { userId },
      { $set: { responses: answers } },
      { upsert: true } // Create a new document if it doesn't exist
    );

    // Send a success response
    res.status(200).send('Answers received!');
  } catch (err) {
    console.error('Error saving answers:', err);
    res.status(500).send('Error saving answers!');
  }
});


// Route to get user responses
app.get('/api/answers', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userResponses = await UserResponse.find({ userId });
    res.status(200).send(userResponses);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching answers!');
  }
});

// Route to determine navigation based on user responses
app.get('/api/navigation', ClerkExpressRequireAuth(), async (req, res) => {
  const { answer } = req.query;

  try {
    // Determine navigation based on the answer
    if (answer && answer.includes('agricultural')) {
      res.status(200).send({ redirectTo: 'agriculture' });
    } else {
      res.status(200).send({ redirectTo: 'other' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error determining navigation!');
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send('Unauthenticated!');
});

// Serve static files and handle client-side routing
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
