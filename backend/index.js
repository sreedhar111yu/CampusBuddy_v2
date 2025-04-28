//index.js
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const menteesRoutes = require('./routes/menteesRoutes');
const studentAuthRoutes = require('./routes/studentAuthRoutes');
const menteesAuthRoutes = require('./routes/menteesAuthRoutes');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./middlewares/passportConfig');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', credentials: true },
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize()); // Initialize Passport without session

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/auth/student', studentAuthRoutes);
app.use('/auth/mentee', menteesAuthRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/mentees', menteesRoutes);

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('chat-message', (msg) => {
    io.emit('chat-message', msg);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));