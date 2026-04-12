let leads = [];

// Display leads
function displayLeads() {
    const container = document.getElementById("leads");
    container.innerHTML = "";

    leads.forEach((lead, index) => {
        const div = document.createElement("div");
        div.classList.add("lead");

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
document.getElementById("leadForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    leads.push({
        name,
        email,
        status: "new"
    });

    displayLeads();
});

// Update status
function updateStatus(index) {
    leads[index].status = "contacted";
    displayLeads();
}