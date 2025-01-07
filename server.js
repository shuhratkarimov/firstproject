const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config');
const PORT = process.env.PORT || 4000
connectDB();

const app = express();
app.use(express.json());

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade: String,
});

const Student = mongoose.model('students', studentSchema);

// Create
app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
});

// Read
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.get('/students/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
});

// Update
app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
});

// Delete
app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

