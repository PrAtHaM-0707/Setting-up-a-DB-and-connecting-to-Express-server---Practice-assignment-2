require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./schema');

const app = express();
const port = 3010;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database:', err.message));


app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

   
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
