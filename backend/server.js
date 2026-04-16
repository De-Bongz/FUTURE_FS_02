require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
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
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* =========================
   AUTH MIDDLEWARE
========================= */
function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "No token" });
    }

    try {
        const token = header.split(" ")[1];
        jwt.verify(token, "secretkey123");
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

/* =========================
   LOGIN
========================= */
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
/* =========================
   GET LEADS
========================= */
app.get("/leads", auth, async (req, res) => {
    const leads = await Lead.find();
    res.json(leads);
});

/* =========================
   ADD LEAD
========================= */
app.post("/leads", auth, async (req, res) => {
    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
});

/* =========================
   UPDATE STATUS
========================= */
app.put("/leads/:id", auth, async (req, res) => {
    await Lead.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    });

    res.json({ message: "Status updated" });
});

/* =========================
   ADD NOTE
========================= */
app.put("/leads/:id/note", auth, async (req, res) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.notes.push(req.body.note);
    await lead.save();

    res.json({ message: "Note added" });
});

/* =========================
   DELETE LEAD
========================= */
app.delete("/leads/:id", auth, async (req, res) => {
    try {
        const deleted = await Lead.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.json({ message: "Lead deleted" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* =========================
   SERVER
========================= */
app.listen(5000, () => {
    console.log("Server running on port 5000");
});