const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');// Import CORS middleware
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const postRoutes = require('./routes/postRoutes');
const feedRoutes = require('./routes/feedRoutes');


dotenv.config();

// App initialization
const app = express();

const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/feed', feedRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));



// Task schema and model
const taskSchema = new mongoose.Schema({
  name: {
     type: String,
      required: true 
    },
  description: {
     type: String 
    },
  status: { 
    type: String, 
    enum: ['Pending', 'Completed', 'Done'],
     default: 'Pending',
  },
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

// Routes
app.get('/api/tasks', async (req, res) => {
  try {
      const tasks = await Task.find();
      res.json(tasks);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
      const { name, description } = req.body;
      const task = new Task({ name, description });
      await task.save();
      res.status(201).json(task);
  } catch (err) {
      res.status(500).json({ message: 'Error creating task' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
      const { status } = req.body;
      const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
      res.json(task);
  } catch (err) {
      res.status(500).json({ message: 'Error updating task status' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted' });
  } catch (err) {
      res.status(500).json({ message: 'Error deleting task' });
  }
});



  // Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
