require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const User = require('./models/UserModel');




connection();

app.use(express.json({limit:"100mb"}));
app.use(cors({
    origin : "http://localhost:3001",
    credentials: true // Allow cookies to be sent in cross-origin requests
  }));
  
  app.use(bodyParser.json());
app.use(cookieParser());


 
const products = require('./Routes/FruitsRoutes');
const user = require('./Routes/UserRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const AdminAndFarmer  = require('./Routes/Admin');
const wishlistRoutes = require('./Routes/wishlistRoutes');

app.use('/api',products);
app.use('/api',user);
app.use('/api', cartRoutes);
app.use('/api', AdminAndFarmer );
app.use('/api/wishlist', wishlistRoutes);

// app.use('/api',user);


/// summa
app.get('/api/getUserRole', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ error: 'JWT token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ role: user.roles });
  } catch (err) {
    console.error('Error verifying token or finding user:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});








///end

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
