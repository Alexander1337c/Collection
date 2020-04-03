const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const app = express();


connectDB();

app.use(express.json({ extended: false }))
app.use(fileUpload());

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/collections', require('./routes/api/collections'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));