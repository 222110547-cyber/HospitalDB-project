console.log("doctor.js loaded");

const doctorID = localStorage.getItem("userID");

// ============================
// LOAD DOCTOR NAME
// ============================
async function loadDoctorName() {
    const { data } = await Queries.doctorName(doctorID);

    document.getElementById("doctor-name").textContent = data.full_name;
}

window.onload = loadDoctorName;



// ============================
// VIEW SCHEDULE
// ============================
document.getElementById("load-schedule").onclick = async () => {

    const { data } = await Queries.scheduleForDoctor(doctorID);

    const tableBody = document.getElementById("schedule-body");
    const dropdown = document.getElementById("appt-select");

    tableBody.innerHTML = "";
    dropdown.innerHTML = "<option value=''>-- select appointment --</option>";

    data.forEach(row => {

        // Fill schedule table
        tableBody.innerHTML += `
            <tr>
                <td>${row.a_id}</td>
                <td>${row.patients.full_name}</td>
                <td>${row.appointment_date}</td>
                <td>${row.appointment_time}</td>
                <td>${row.status}</td>
            </tr>
        `;

        // Fill appointment dropdown
        dropdown.innerHTML += `
            <option value="${row.a_id}">
                ${row.a_id} — ${row.appointment_date} ${row.appointment_time}
            </option>`;
    });
};



// ============================
// DELETE APPOINTMENT
// ============================
document.getElementById("delete-appt").onclick = async () => {

    const a_id = document.getElementById("appt-select").value;

    if (!a_id) {
        alert("Select an appointment");
        return;
    }

    const { error } = await Queries.deleteAppointment(a_id);

    if (!error) {
        alert("Appointment deleted.");
    } else {
        alert("Error deleting appointment.");
        console.log(error);
    }
};



// ============================
// UPDATE APPOINTMENT TIME
// ============================
document.getElementById("update-time").onclick = async () => {

    const a_id = document.getElementById("appt-select").value;
    const newTime = document.getElementById("new-time").value;

    if (!a_id) {
        alert("Select an appointment");
        return;
    }

    if (!newTime) {
        alert("Choose a new time");
        return;
    }

    const { error } = await Queries.updateAppointmentTime(a_id, newTime);

    if (!error) {
        alert("Appointment time updated.");
    } else {
        alert("Error updating time.");
        console.log(error);
    }
};
// ============================
// CREATE PRESCRIPTION
// ============================

function generateMedID() {
    const num = Math.floor(1000 + Math.random() * 9000);
    return "M" + num;
}

document.getElementById("prescription-form").onsubmit = async (e) => {
    e.preventDefault();

    const p_id = document.getElementById("presc-pid").value.trim();
    const medication_name = document.getElementById("presc-med").value.trim();
    const dosage = document.getElementById("presc-dose").value.trim();
    const today = new Date().toISOString().split("T")[0];

    const prescription = {
        m_id: generateMedID(),
        p_id: p_id,
        d_id: doctorID,
        medication_name: medication_name,
        dosage: dosage,
        prescription_date: today
    };

    const { error } = await Queries.createPrescription(prescription);

    if (!error) {
        alert("Prescription created!");
    } else {
        alert("Error creating prescription.");
        console.log(error);
    }
};


