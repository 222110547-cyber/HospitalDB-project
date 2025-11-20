console.log("patient.js loaded");

// Get logged in patient ID
const patientID = localStorage.getItem("userID");

// Load patient name into header
async function loadPatientName() {
    const { data } = await Queries.patientName(patientID);

    document.getElementById("patient-name").textContent = data.full_name;
}

window.onload = loadPatientName;



// ============================
// LOAD DOCTOR DROPDOWN
// ============================
async function loadDoctors() {
    const { data } = await Queries.doctorsList();

    const select = document.getElementById("doctor-select");

    data.forEach(doc => {
        select.innerHTML += `<option value="${doc.d_id}">${doc.full_name}</option>`;
    });
}

loadDoctors();



// ============================
// VIEW APPOINTMENTS
// ============================
document.getElementById("load").onclick = async () => {

    const { data } = await Queries.appointmentsForPatient(patientID);

    const body = document.getElementById("appt-body");
    body.innerHTML = "";

    data.forEach(row => {
        body.innerHTML += `
            <tr>
                <td>${row.doctors.full_name}</td>
                <td>${row.appointment_date}</td>
                <td>${row.appointment_time}</td>
                <td>${row.status}</td>
            </tr>
        `;
    });
};



// ============================
// VIEW BILLS
// ============================
document.getElementById("load-bills").onclick = async () => {

    const { data } = await Queries.billsForPatient(patientID);

    const body = document.getElementById("bills-body");
    body.innerHTML = "";

    data.forEach(row => {
        body.innerHTML += `
            <tr>
                <td>${row.bill_id}</td>
                <td>${row.total_amount}</td>
                <td>${row.payment_status}</td>
                <td>${row.issue_date}</td>
            </tr>
        `;
    });
};



// ============================
// VIEW PRESCRIPTIONS
// ============================
document.getElementById("load-prescriptions").onclick = async () => {

    const { data } = await Queries.prescriptionsForPatient(patientID);

    const body = document.getElementById("presc-body");
    body.innerHTML = "";

    data.forEach(row => {
        body.innerHTML += `
            <tr>
                <td>${row.medication_name}</td>
                <td>${row.dosage}</td>
                <td>${row.doctors.full_name}</td>
                <td>${row.prescription_date}</td>
            </tr>
        `;
    });
};



// ============================
// BOOK APPOINTMENT
// ============================

// simple ID generator
function generateAppointmentID() {
    const num = Math.floor(1000 + Math.random() * 9000);
    return "A" + num;
}

document.getElementById("book-form").onsubmit = async (e) => {
    e.preventDefault();

    const appointment = {
        a_id: generateAppointmentID(),
        p_id: patientID,
        d_id: document.getElementById("doctor-select").value,
        appointment_date: document.getElementById("appt-date").value,
        appointment_time: document.getElementById("appt-time").value,
        status: "Scheduled"
    };

    const { error } = await Queries.bookAppointment(appointment);

    if (!error) {
        alert("Appointment booked!");
    } else {
        alert("Error booking appointment.");
        console.log(error);
    }
};
