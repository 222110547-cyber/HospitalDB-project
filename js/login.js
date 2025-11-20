console.log("login.js loaded");

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("Form submitted");

        const userID = document.getElementById("login-ID").value.trim().toUpperCase();
        console.log("ID entered:", userID);

        if (!userID) {
            alert("Please enter your ID");
            return;
        }

        let table = "";
        let column = "";
        if (userID.startsWith("AD")) {
            table = "admins";
            column = "admin_id";
        } else if (userID.startsWith("D")) {
            table = "doctors";
            column = "d_id";
        } else if (userID.startsWith("P")) {
            table = "patients";
            column = "p_id";
        } else {
            alert("Invalid ID Format");
            return;
        }

        console.log("Checking table:", table);

        const { data, error } = await window.supabase
            .from(table)
            .select("*")
            .eq(column, userID)
            .single();

        console.log("Response:", data, error);

        if (error || !data) {
            alert("User not found");
            return;
        }

        localStorage.setItem("userID", userID);
        localStorage.setItem("role", table.toLowerCase());

        if (table === "admins") window.location.href = "dashboard/admin.html";
        if (table === "doctors") window.location.href = "dashboard/doctor.html";
        if (table === "patients") window.location.href = "dashboard/patient.html";
    });

});
