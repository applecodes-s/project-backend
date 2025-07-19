const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projectRoutes'); // ✅ Make sure this points to the right JS file
const authRoutes = require('./routes/authRoutes'); 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://project-frontend-ten-topaz.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));  
  // Other middleware
  app.use(express.json());
  
//   // Example POST route
// app.post('/api/projects', (req, res) => {
//   console.log('Received project:', req.body);
//   res.status(201).json({ message: 'Project created successfully!' });
// });

// Routes
app.use('/api/projects', projectRoutes); // ✅ Don't use .jsx here
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://priyakeziah:gracepeace@cluster0.k3qa6cg.mongodb.net/projectDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.log('MongoDB connection error:', err));



app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});