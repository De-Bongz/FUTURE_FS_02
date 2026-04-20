const API = "https://future-fs-02-9a22.onrender.com";

/* =========================
   Show Section
========================= */
function showSection(sectionId, btn){
  const cards = document.querySelectorAll(".card");
  const buttons = document.querySelectorAll(".top-nav button");

  cards.forEach(card => card.classList.remove("active"));
  buttons.forEach(button => button.classList.remove("active-btn"));

  const activeSection = document.getElementById(sectionId);
  activeSection.classList.add("active");
  btn.classList.add("active-btn");
}

/* =========================
   Render Lead Card (Reusable)
========================= */
function renderLeadCard(lead){
  const div = document.createElement("div");
  div.classList.add("lead-card");

  div.innerHTML = `
    <p><strong>${lead.name}</strong></p>
    <p>${lead.email}</p>
    <p><small>Created: ${new Date(lead.createdAt).toLocaleString()}</small></p>
    <p><small>Updated: ${new Date(lead.updatedAt).toLocaleString()}</small></p>
    <select onchange="updateStatus('${lead._id}', this.value)">
      <option value="new" ${lead.status === "new" ? "selected" : ""}>New</option>
      <option value="contacted" ${lead.status === "contacted" ? "selected" : ""}>Contacted</option>
      <option value="converted" ${lead.status === "converted" ? "selected" : ""}>Converted</option>
    </select>
  `;

  if (lead.notes?.length){
    lead.notes.forEach(note => {
      div.innerHTML += `<p>📝 ${note}</p>`;
    });
  }

  div.innerHTML += `
    <input type="text" id="note-${lead._id}" placeholder="Add note">
    <button onclick="addNote('${lead._id}')">Add Note</button>
  `;

  //  delete button
    div.innerHTML += `<button onclick="deleteLead('${lead._id}')">Delete</button>`;

  return div;
}

/* =========================
   Display Leads
========================= */
async function displayLeads() {
  const res = await fetch(`${API}/leads`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });

  if (res.status === 401) {
    alert("Session expired. Please login again.");
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  const data = await res.json();

  const container = document.getElementById("leadsContainer"); // ✅ FIXED
  container.innerHTML = "";

  data.forEach(lead => {
    container.appendChild(renderLeadCard(lead));
  });
}



/* =========================
   Add Lead
========================= */
document.getElementById("leadForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const source = document.getElementById("source").value;

  const res = await fetch(`${API}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ name, email, source })
  });

  if (!res.ok){
    const err = await res.json();
    alert(err.message || "Failed to add lead");
    return;
  }

  document.getElementById("leadForm").reset();
  displayLeads();
});

/* =========================
   Update Status
========================= */
async function updateStatus(id, status){
  await fetch(`${API}/leads/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ status })
  });
  displayLeads();
}

/* =========================
   Add Note
========================= */
async function addNote(id){
  const input = document.getElementById(`note-${id}`);
  const note = input.value;
  if (!note) return;

  await fetch(`${API}/leads/${id}/note`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ note })
  });

  input.value = "";
  displayLeads();
}

/* =========================
   Delete Lead (Admins only)
========================= */
async function deleteLead(id){
  if (!confirm("Delete this lead?")) return;

  const res = await fetch(`${API}/leads/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });

  const data = await res.json();
  if (!res.ok){
    alert(data.message || "Delete failed");
    return;
  }
  displayLeads();
}

/* =========================
   Login
========================= */
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const spinner = document.getElementById("loading");
  const errorBox = document.getElementById("error");

  if (!username || !password) {
    alert("Please fill in all fields");
    return;
  }

  // Show spinner + message
  spinner.style.display = "block";
  errorBox.textContent = "Logging in... please wait a moment.";

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  // Hide spinner after response
  spinner.style.display = "none";

  if (!res.ok) {
    errorBox.textContent = data.message || "Login failed";
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);

  // Clear message and redirect
  errorBox.textContent = "";
  window.location.href = "index.html";
}



/* =========================
   Sign Up
========================= */
async function signup() {
  const username = document.getElementById("new-username").value.trim();
  const email = document.getElementById("new-email").value.trim();
  const password = document.getElementById("new-password").value.trim();
  const errorBox = document.getElementById("error");
  const spinner = document.getElementById("signup-loading");

  if (!username || !email || !password) {
    errorBox.textContent = "Please fill in all fields";
    return;
  }

  // Show spinner
  if (spinner) spinner.style.display = "block";
  errorBox.textContent = "Creating account... please wait.";

  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    // Hide spinner
    if (spinner) spinner.style.display = "none";

    if (!res.ok) {
      errorBox.textContent = data.message || "Sign Up failed";
      return;
    }

    // Success
    errorBox.textContent = "";
    alert("Account created successfully! Please sign in.");
    document.getElementById("signup-form").reset();
    showForm("signin");
  } catch (err) {
    if (spinner) spinner.style.display = "none";
    errorBox.textContent = "Server error: " + err.message;
  }
}

/* =========================
   Filter Leads
========================= */
async function filterLeads(){
  const name = document.getElementById("searchName").value;
  const status = document.getElementById("filterStatus").value;

  const res = await fetch(`${API}/leads?name=${name}&status=${status}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });

  const data = await res.json();
  const container = document.getElementById("leadsContainer");
  container.innerHTML = "";
  data.forEach(lead => container.appendChild(renderLeadCard(lead)));
}

/* =========================
   Auto-load Leads if Logged In
========================= */
if (localStorage.getItem("token")){
  displayLeads();
}

