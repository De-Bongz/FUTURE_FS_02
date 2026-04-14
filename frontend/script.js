

// Display leads
async function displayLeads() {
    const res = await fetch("http://localhost:5000/leads");
    const data = await res.json();

    const container = document.getElementById("leads");
    container.innerHTML = "";

    data.forEach((lead, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p><strong>${lead.name}</strong></p>
            <p>${lead.email}</p>
            
            <label>Status:</label>
            <select onchange="updateStatus(${index}, this.value)">
                <option value="new" ${lead.status === "new" ? "selected" : ""}>new</option>
                <option value="contacted" ${lead.status === "contacted" ? "selected" : ""}>contacted</option>
                <option value="converted" ${lead.status === "converted" ? "selected" : ""}>converted</option>
            </select>
        `;

        // SHOW NOTES
        if (lead.notes) {
            lead.notes.forEach(note => {
            div.innerHTML += `<p>📝 ${note}</p>`;
        });
  }

        // INPUT + BUTTON
        div.innerHTML += `
            <input type="text" id="note-${index}" placeholder="Add note">
            <button onclick="addNote(${index})">Add Note</button>
        `;

        container.appendChild(div);
    });
}

// Add lead
document.getElementById("leadForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const source = document.getElementById("source").value;

    await fetch("http://localhost:5000/leads", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, source })
    });

    displayLeads();
});

// Update status
async function updateStatus(index, status) {
    await fetch(`http://localhost:5000/leads/${index}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
         },
        body: JSON.stringify({ status })
    });

    displayLeads();
}

async function addNote(index) {
    const input = document.getElementById(`note-${index}`);
    const note = input.value;

    input.value = "";
    await fetch(`http://localhost:5000/leads/${index}/note`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ note })
    });

    displayLeads();
}

//display when page is opened
displayLeads();