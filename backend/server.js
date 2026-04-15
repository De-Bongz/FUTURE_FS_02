const Lead = require("./models/Leads");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

//connect database
console.log("ENV CHECK:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// GET all leads
app.get("/leads", async (req, res) => {
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
  const Updated = await Lead.findByIdAndUpdate(
    req.params.index,
    { status: req.body.status },
    { new: true }
  );
  res.json(Updated);
});

//Adding notes
app.put("/leads/:index/note", async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id);

  lead.notes.push(req.body.note);
  await lead.save();
  res.json(lead);
});

app.listen(5000, () => console.log("Server running on port 5000"));