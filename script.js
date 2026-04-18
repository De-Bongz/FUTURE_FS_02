const API = "https://future-fs-02-9a22.onrender.com";

/* =========================
   DISPLAY LEADS
========================= */
async function displayLeads() {
    const res = await fetch(`${API}/leads`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

    // 🔥 HANDLE UNAUTHORIZED
    if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
    }

    const data = await res.json();

    const container = document.getElementById("leads");
    container.innerHTML = "";

    data.forEach(lead => {
        const div = document.createElement("div");
        div.classList.add("card");

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

        // SHOW NOTES
        if (lead.notes && lead.notes.length > 0) {
            lead.notes.forEach(note => {
                div.innerHTML += `<p>📝 ${note}</p>`;
            });
        }

        // ADD NOTE
        div.innerHTML += `
            <input type="text" id="note-${lead._id}" placeholder="Add note">
            <button onclick="addNote('${lead._id}')">Add Note</button>
        `;

        // DELETE BUTTON
        div.innerHTML += `
            <button onclick="deleteLead('${lead._id}')">Delete</button>
        `;

        container.appendChild(div);
    });
}

/* =========================
   ADD LEAD
========================= */
document.getElementById("leadForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const source = document.getElementById("source").value;

    await fetch(`${API}/leads`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ name, email, source })
    });

    // ✅ Clear the form inputs
    document.getElementById("leadForm").reset();

    // Refresh the leads list
    displayLeads();
});


/* =========================
   UPDATE STATUS
========================= */
async function updateStatus(id, status) {
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
   ADD NOTE
========================= */
async function addNote(id) {
    const input = document.getElementById(`note-${id}`);
    const note = input.value;

    if(!note) return;

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
   DELETE
========================= */
async function deleteLead(id) {
    if (!confirm("Delete this lead?")) return;

    const res = await fetch(`${API}/leads/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.message || "Delete Failed");
        return;
    }

    displayLeads();
}

/* ========================
    Login
=========================*/
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(!username || !password){
        alert("Please fill in all fields");
        return;
    }

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok){
        alert(data.message || "Login failed");
        return;
    }

    localStorage.setItem("token", data.token);

    window.location.href = "index.html";
}

/* =========================
   FILTER LEADS
========================= */
async function filterLeads() {
    const name = document.getElementById("searchName").value;
    const status = document.getElementById("filterStatus").value;

    const res = await fetch(`${API}/leads?name=${name}&status=${status}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });

    const data = await res.json();
    const container = document.getElementById("leads");
    container.innerHTML = "";
    data.forEach(lead => {
        // reuse your card rendering logic here
    });
}



/* =========================
   LOAD
========================= */
if (localStorage.getItem("token")){
    displayLeads();
}
