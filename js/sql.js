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
        .from('doctors')
        .select('full_name')
        .eq('d_id', d_id)
        .single()

        ,

    

// Doctor schedule — appointment list using d_id
    scheduleForDoctor: (d_id) =>
        supabase
            .from("appointments")
            .select("a_id, appointment_date, appointment_time, status, patients(full_name)")
            .eq("d_id", d_id)
        ,

    // Delete appointment
    deleteAppointment: (a_id) =>
        supabase
    .from("appointments")
    .delete()
    .eq("a_id",a_id)

        ,

    // Update appointment time -- 
    updateAppointmentTime: (a_id, newTime) =>
        supabase

       .from("appointments")
            .update({ appointment_time: newTime })
            .eq("a_id", a_id)
        ,

    // Create a prescription -- Insert prespcription into medications table
    createPrescription: (prescription) =>
        supabase

        .from("medications")
        .insert([prescription])

        ,

//Doctor =============================================================


//Admin =============================================================

// Delete a user by ID (column is the ID column in each table)
deleteUser: (table, column, id) =>
    supabase

        .from(table)
        .delete()
        .eq(column,id)
        
        ,

// Delete a bill 
deleteBill: (bill_id) =>
    supabase

        .from("billing")
        .delete()
        .eq("bill_id",bill_id)
        ,

// Create a bill -- insert bill into billing table
createBill: (bill) =>
    supabase
        
        .from("billing")
        .insert([bill])
        ,

//get tables for report ----------
getPatients: () =>
    supabase
        .from("patients")
        .select("*"),

getDoctors: () =>
    supabase
        
        .from("doctors")
        .select("*")

        ,

getAppointments: () =>
    supabase
       
        .from("appointments")
        .select("*")
        ,

getMedications: () =>
    supabase
       
        .from("medications")
        .select("*")

        ,


getBilling: () =>
    supabase
    .from("billing")
    .select("*"),
       
};    
//Admin =============================================================
