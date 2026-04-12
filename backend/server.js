const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let leads = []; // temporary storage (like before)

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

app.listen(5000, () => console.log("Server running on port 5000"));