const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");
const Lead = require("./models/Leads");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

//adding login api:
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
        return res.status(400).json({ message: "Invalid username" });
    }

    if (password !== admin.password) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { id: admin._id },
        "secretkey123",
        { expiresIn: "1h" }
    );

    res.json({ token });
});

// Auth Middleware
function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    try {
        jwt.verify(token, "secretkey123");
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

//connect database
console.log("ENV CHECK:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// GET all leads
app.get("/leads", auth, async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// ADD lead
app.post("/leads", async (req, res) => {
  const newLead = new Lead(req.body);
  await newLead.save();
  res.json(newLead);
});

// UPDATE status
app.put("/leads/:index", async (req, res) => {
  try{
    const Updated = await Lead.findByIdAndUpdate(
      req.params.index,
      { status: req.body.status },
      { new: true }
    );

    res.json(Updated);
  }catch(err){
    res.status(500).json({ error: err.message });
  }

});

//Adding notes
app.put("/leads/:id/note", async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        if (!lead.notes) {
            lead.notes = [];
        }

        lead.notes.push(req.body.note);

        await lead.save();

        res.json(lead);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});