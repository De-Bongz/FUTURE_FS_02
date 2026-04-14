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
app.get("/leads", (req, res) => {
  res.json(leads);
});

// ADD lead
app.post("/leads", (req, res) => {
  leads.push({ ...req.body, status: "new" });
  res.json({ message: "Lead added" });
});

// UPDATE status
app.put("/leads/:index", (req, res) => {
  const index = req.params.index;
  leads[index].status = "contacted";
  res.json({ message: "Updated" });
});

//Adding notes
app.put("/leads/:index/note", (req, res) => {
  const index = req.params.index;
  const { note } = req.body;

  if (!leads[index].notes){
    leads[index].notes = [];
  }

  leads[index].notes.push(note);

  res.json({ message: "Note added"});
});

app.listen(5000, () => console.log("Server running on port 5000"));