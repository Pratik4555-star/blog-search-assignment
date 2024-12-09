const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blogSearch')
.then(()=>console.log("succesfully connected"))
.catch((e)=>console.log("error",e))
// Schema and Model
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
});
const Blog = mongoose.model('Blog', BlogSchema);

// Routes
app.get('/api/search', async (req, res) => {
  const { query, tags } = req.query;
  const searchParams = {
    ...(query && { $text: { $search: query } }),
    ...(tags && { tags: { $in: tags.split(',') } }),
  };
  const results = await Blog.find(searchParams);
  res.json(results);
});

// Add sample data (optional)
app.post('/api/add', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json(blog);
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
