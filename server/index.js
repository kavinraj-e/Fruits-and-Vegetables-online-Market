require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/UserModel");
const Product = require("./models/FruitsModels");
const axios = require("axios");

connection();

app.use(express.json({ limit: "100mb" }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://fruzoz.web.app",
      "https://fruzoz.vercel.app",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const products = require("./Routes/FruitsRoutes");
const user = require("./Routes/UserRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const AdminAndFarmer = require("./Routes/Admin");
const wishlistRoutes = require("./Routes/wishlistRoutes");

app.use("/api", products);
app.use("/api", user);
app.use("/api", cartRoutes);
app.use("/api", AdminAndFarmer);
app.use("/api/wishlist", wishlistRoutes);

app.get("/check", async (req, res) => {
  res.send("updating");
});

app.get("/api/getUserRole", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ error: "JWT token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ role: user.roles });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

async function getProductList() {
  const products = await Product.find({}, "name");
  return products.map((product) => product.name).join(", ");
}

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const productList = await getProductList();

    if (!productList) {
      return res.json({ reply: "No products found in the database." });
    }

    const prompt = `Suggest a recipe using only these products: ${productList}. The user asked: ${message}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t find any recipe using these products.";

    res.json({ reply });
  } catch (error) {
    res.status(500).send("Error fetching response from Gemini API.");
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
