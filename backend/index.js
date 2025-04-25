const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const passport = require('passport');
require('./middlewares/passportConfig');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST"]
}));

app.use(express.json());


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Google OAuth login and callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'],
     prompt: 'select_account'
   })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    console.log('✅ Authenticated session user:', req.user);
    res.redirect('http://localhost:5173/dashboard/aspirants');
  }
);

// Logout
app.get('/logout', (req, res, next) => {
  console.log('Logging out user:', req.user); // debug
  req.logout(function (err) {
    if (err) return next(err);

    req.session.destroy(function (err) {
      if (err) return next(err);

      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Logged out' });
    });
  });
});


// Auth test route
app.get("/check-auth", (req, res) => {
  res.json({ user: req.user || null, session: req.session });
});

app.use("/api/students", studentRoutes);

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
