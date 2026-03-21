import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import session from 'express-session';
import passport from './config/passport';
import authRoutes from './routes/auth.routes';
import ticketRoutes from './routes/ticket.routes';
import kbRoutes from './routes/kb.routes';
import { tenantMiddleware } from './middleware/tenant.middleware';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const prisma = new PrismaClient();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'session_secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', tenantMiddleware, ticketRoutes);
app.use('/api/kb', tenantMiddleware, kbRoutes);

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_ticket', (ticketId) => {
    socket.join(ticketId);
    console.log(`User ${socket.id} joined ticket ${ticketId}`);
  });

  socket.on('send_message', async (data) => {
    const { ticketId, content, senderId, isBot } = data;
    
    // Save to database
    const message = await prisma.message.create({
      data: {
        content,
        ticketId,
        senderId,
        isBot
      }
    });

    // Broadcast to ticket room
    io.to(ticketId).emit('new_message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Basic Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io, prisma };
