console.log("sql.js loaded");

const Queries = {

//patient ===============================================================
    // Get the patient's full name
    patientName: (p_id) =>
        supabase
        .from("patients")
        .select("full_name")
        .eq("p_id", p_id)
        .single(),

// Get appointments for a patient
    appointmentsForPatient: (p_id) =>
        supabase
            .from("appointments")
            .select(" doctors(full_name), appointment_date, appointment_time, status")
            .eq("p_id", p_id),

    // Get bills for a patient
    billsForPatient: (p_id) =>
        supabase
            .from("billing")
            .select("*")
            .eq("p_id", p_id),

    // Get prescriptions for a patient
    prescriptionsForPatient: (p_id) =>
        supabase
            .from("medications")
            .select("medication_name, dosage, prescription_date, doctors(full_name)")
            .eq("p_id", p_id),

    // List doctors for dropdown
    doctorsList: () =>
        supabase
            .from("doctors")   // lowercase table
            .select("d_id, full_name"),

    // Insert new appointment
    bookAppointment: (appointment) =>
        supabase
            .from("appointments")
            .insert([appointment]),
//patient =============================================================

//Doctor =============================================================
 
// Get the doctor's full name using d_id
    doctorName: (d_id) =>
        supabase

        //sql here

        ,

    

// Doctor schedule — appointment list using d_id
    scheduleForDoctor: (d_id) =>
        supabase
        
        //sql here

        ,

    // Delete appointment
    deleteAppointment: (a_id) =>
        supabase

        //sql here

        ,

    // Update appointment time -- 
    updateAppointmentTime: (a_id, newTime) =>
        supabase

        //sql here
            
        ,

    // Create a prescription -- Insert prespcription into medications table
    createPrescription: (prescription) =>
        supabase

        //sql here

        ,

//Doctor =============================================================


//Admin =============================================================

// Delete a user by ID (column is the ID column in each table)
deleteUser: (table, column, id) =>
    supabase

        //sql here
        
        ,

// Delete a bill 
deleteBill: (bill_id) =>
    supabase

        //sql here

        ,

// Create a bill -- insert bill into billing table
createBill: (bill) =>
    supabase
        
        //sql here

        ,

//get tables for report ----------
getPatients: () =>
    supabase
        .from("patients")
        .select("*"),

getDoctors: () =>
    supabase
        
        //sql here

        ,

getAppointments: () =>
    supabase
       
        //sql here

        ,

getMedications: () =>
    supabase
       
        //sql here

        ,

getBilling: () =>
    supabase
        
        //sql here

        ,
//---------------------------

};
//Admin =============================================================
