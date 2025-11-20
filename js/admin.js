console.log("admin.js loaded");

// ============================
// DELETE USER
// ============================

document.getElementById("delete-user").onclick = async () => {

    const id = document.getElementById("user-id").value.trim();
    if (!id) return alert("Enter a user ID.");

    let table = "";
    let column = "";

    if (id.startsWith("P")) {
        table = "patients";
        column = "p_id";
    } else if (id.startsWith("D")) {
        table = "doctors";
        column = "d_id";
    } else if (id.startsWith("AD")) {
        table = "admins";
        column = "admin_id";
    } else {
        return alert("Invalid ID format.");
    }

    const { error } = await Queries.deleteUser(table, column, id);

    if (!error) alert("User deleted.");
    else alert("Error deleting user.");
};



// ============================
// DELETE BILL
// ============================

document.getElementById("delete-bill").onclick = async () => {

    const bill_id = document.getElementById("bill-id").value.trim();
    if (!bill_id) return alert("Enter a bill ID.");

    const { error } = await Queries.deleteBill(bill_id);

    if (!error) alert("Bill deleted.");
    else alert("Error deleting bill.");
};



// ============================
// CREATE BILL
// ============================

function generateBillID() {
    const num = Math.floor(1000 + Math.random() * 9000);
    return "B" + num;
}

document.getElementById("create-bill-form").onsubmit = async (e) => {
    e.preventDefault();

    const p_id = document.getElementById("bill-pid").value.trim();
    const amount = document.getElementById("bill-amount").value;

    const today = new Date().toISOString().split("T")[0];

    const bill = {
        bill_id: generateBillID(),
        p_id: p_id,
        total_amount: amount,
        payment_status: "Pending",
        issue_date: today
    };

    const { error } = await Queries.createBill(bill);

    if (!error) {
        alert("Bill created successfully!");
    } else {
        alert("Error creating bill.");
        console.log(error);
    }
};



// ============================
// GENERATE REPORT
// ============================

document.getElementById("generate-report").onclick = async () => {

    // Load all tables
    const patients = await Queries.getPatients();
    const doctors = await Queries.getDoctors();
    const appointments = await Queries.getAppointments();
    const medications = await Queries.getMedications();
    const billing = await Queries.getBilling();

    // Helper to convert rows→HTML table
    const toTable = (data) => {
        let html = "<table border='1'><tr>";
        const keys = Object.keys(data[0]);

        // header
        keys.forEach(k => html += `<th>${k}</th>`);
        html += "</tr>";

        // rows
        data.forEach(row => {
            html += "<tr>";
            keys.forEach(k => html += `<td>${row[k]}</td>`);
            html += "</tr>";
        });

        html += "</table>";
        return html;
    };

    // Fill report sections
    document.getElementById("report-patients").innerHTML = toTable(patients.data);
    document.getElementById("report-doctors").innerHTML = toTable(doctors.data);
    document.getElementById("report-appointments").innerHTML = toTable(appointments.data);
    document.getElementById("report-medications").innerHTML = toTable(medications.data);
    document.getElementById("report-billing").innerHTML = toTable(billing.data);

    // Show report
    document.getElementById("report").style.display = "block";

    // Trigger print dialog
    window.print();

    // Hide again after printing
    document.getElementById("report").style.display = "none";
};
