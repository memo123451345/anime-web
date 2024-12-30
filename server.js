const express = require('express');
const mongoose = require('mongoose');

const multer = require('multer');
const Content = require('./models/Content'); // النموذج الذي تم إنشاؤه
const path = require('path');
const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/animeDB');


// إعداد multer لتحميل الملفات
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// إضافة محتوى جديد
app.post('/api/content', upload.fields([{ name: 'image' }, { name: 'video' }]), async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = `/uploads/${req.files.image[0].filename}`;
    const video = `/uploads/${req.files.video[0].filename}`;
    const newContent = new Content({ name, description, image, video });
    await newContent.save();
    res.json({ message: 'Content added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding content' });
  }
});

// جلب المحتوى
app.get('/api/content', async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching content' });
  }
});

// حذف المحتوى
app.delete('/api/content/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Content.findByIdAndDelete(id);
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting content' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
