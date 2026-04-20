require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const Admin = require("./models/Admin");
const Lead = require("./models/Leads");

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

/* =========================
   AUTH MIDDLEWARE
========================= */
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/* =========================
   SIGN UP (Admin only)
========================= */
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    res.json({ success: true, message: "Admin account created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

/* =========================
   LOGIN (Admin only)
========================= */
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "All fields required" });

    const account = await Admin.findOne({ username });
    if (!account) return res.status(400).json({ message: "Invalid username" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: account._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, role: "admin" });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

/* =========================
   LEADS CRUD
========================= */
app.get("/leads", auth, async (req, res) => {
  try {
    const { status, name, email } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (name) filter.name = new RegExp(name, "i");
    if (email) filter.email = new RegExp(email, "i");

    const leads = await Lead.find(filter);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/leads", auth, async (req, res) => {
  try {
    const { name, email, source } = req.body;
    if (!name || !email || !source) {
      return res.status(400).json({ message: "Name, email, and source required" });
    }
    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/leads/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: Date.now() },
      { new: true }
    );
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Status updated", lead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/leads/:id/note", auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.notes.push(req.body.note);
    lead.updatedAt = Date.now();
    await lead.save();

    res.json({ message: "Note added", lead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/leads/:id", auth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
