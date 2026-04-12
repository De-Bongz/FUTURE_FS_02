let leads = [];

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
        <p>Status: ${lead.status}</p>
        <button onclick="updateStatus(${index})">Mark Contacted</button>
        `;

        container.appendChild(div);
    });
}

// Add lead
document.getElementById("leadForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch("http://localhost:5000/leads", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
    });

    displayLeads();
});

// Update status
async function updateStatus(index) {
    await fetch(`http://localhost:5000/leads/${index}`, {
        method: "PUT"
    });

    displayLeads();
}

//display when page is opened
displayLeads();