const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./utils/db');

dotenv.config({ path: './.env' });

// 1) CONNECT DATABASE
connectDB();

// 2) SETTING PORT AND LISTEN SEVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
