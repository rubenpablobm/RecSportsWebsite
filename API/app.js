const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const edificioRoutes = require('./routes/edificio');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', edificioRoutes);

const port = process.env.PORT || 5040;
app.listen(port, () => console.log(`Server running on port ${port}`));