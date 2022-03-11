const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();

// Import routes
const todosRouter = require('./src/routes/todo');
const usersRouter = require('./src/routes/user');
const authRoutes = require('./src/routes/auth');

// Import cors
const corsOptions = require('./src/middleware/cors');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));

// Routes
app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));