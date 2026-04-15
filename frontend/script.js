

// Display leads
async function displayLeads() {
    const res = await fetch("http://localhost:5000/leads");
    const data = await res.json();

    const container = document.getElementById("leads");
    container.innerHTML = "";

    data.forEach((lead, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p><strong>Name:</strong> ${lead.name}</p>
            <p><strong>Email:</strong> ${lead.email}</p>
            <p><strong>Source:</strong> ${lead.source}</p>
            
            <label>Status:</label>
            <select onchange="updateStatus('${lead._id}', this.value)">
                <option value="new" ${lead.status === "new" ? "selected" : ""}>new</option>
                <option value="contacted" ${lead.status === "contacted" ? "selected" : ""}>contacted</option>
                <option value="converted" ${lead.status === "converted" ? "selected" : ""}>converted</option>
            </select>
        `;

        // SHOW NOTES
        if (lead.notes && lead.notes.length > 0) {
            const notesDiv = document.createElement("div");

            lead.notes.forEach(note => {
                const p = document.createElement("p");
                p.innerText = "📝 " + note;
                notesDiv.appendChild(p);
            });

            div.appendChild(notesDiv);
        }

        // INPUT + BUTTON
        div.innerHTML += `
            <input type="text" id="note-${lead._id}" placeholder="Add note">
            <button onclick="addNote('${lead._id}')">Add Note</button>
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
async function updateStatus(id, status) {
    await fetch(`http://localhost:5000/leads/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
         },
        body: JSON.stringify({ status })
    });

    displayLeads();
}

async function addNote(id) {
    const input = document.getElementById(`note-${id}`);
    const note = input.value;

    if (!note) return;
    
    await fetch(`http://localhost:5000/leads/${id}/note`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ note })
    });

    input.value = "";
    displayLeads();
}

//display when page is opened
displayLeads();